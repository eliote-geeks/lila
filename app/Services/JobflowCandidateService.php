<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class JobflowCandidateService
{
    public const REQUIRED_FIELDS = [
        'first_name' => 'Prénom',
        'last_name' => 'Nom',
        'email' => 'Email',
        'phone' => 'Téléphone WhatsApp',
        'location' => 'Ville / Localisation',
        'current_title' => 'Poste actuel',
        'years_experience' => 'Années d’expérience',
        'skills' => 'Compétences clés',
        'desired_positions' => 'Postes visés',
        'desired_sectors' => 'Secteurs visés',
        'desired_locations' => 'Villes recherchées',
        'min_salary' => 'Salaire souhaité minimum',
    ];

    private const ARRAY_FIELDS = [
        'skills',
        'languages',
        'desired_positions',
        'desired_sectors',
        'desired_locations',
        'contract_types',
    ];

    public function getByEmail(string $email): ?array
    {
        if ($this->webhookUrl()) {
            $response = $this->callWebhook('get_candidate', ['email' => $email]);
            $candidate = $response['candidate'] ?? $response['data'] ?? $response;

            if (! is_array($candidate)) {
                return null;
            }

            foreach (self::ARRAY_FIELDS as $field) {
                $candidate[$field] = $this->pgArrayToCsv($candidate[$field] ?? null);
            }

            return $candidate;
        }

        $row = DB::connection('jobflow')
            ->table('candidates')
            ->where('email', $email)
            ->first();

        if (! $row) {
            return null;
        }

        $data = (array) $row;

        foreach (self::ARRAY_FIELDS as $field) {
            $data[$field] = $this->pgArrayToCsv($data[$field] ?? null);
        }

        return $data;
    }

    public function requiredFieldLabels(): array
    {
        return self::REQUIRED_FIELDS;
    }

    public function missingRequiredFields(?array $candidate): array
    {
        if (! $candidate) {
            return array_values(self::REQUIRED_FIELDS);
        }

        $missing = [];
        $numericFields = ['years_experience', 'min_salary'];

        foreach (self::REQUIRED_FIELDS as $field => $label) {
            $value = $candidate[$field] ?? null;

            if (in_array($field, $numericFields, true)) {
                if ($value === null || $value === '') {
                    $missing[] = $label;
                }
                continue;
            }

            if ($value === null || trim((string) $value) === '') {
                $missing[] = $label;
            }
        }

        return $missing;
    }

    public function upsertByEmail(string $matchEmail, array $input): void
    {
        $data = $this->normalizeInput($input);

        if ($this->webhookUrl()) {
            $response = $this->callWebhook('upsert_candidate', [
                'match_email' => $matchEmail,
                'candidate' => $data,
            ]);

            if (isset($response['ok']) && $response['ok'] === false) {
                throw new \RuntimeException($response['message'] ?? 'Webhook error');
            }

            return;
        }

        if ($matchEmail !== $data['email']) {
            $updated = DB::connection('jobflow')->affectingStatement(
                $this->updateSql(),
                $this->updateBindings($data, $matchEmail)
            );

            if ($updated > 0) {
                return;
            }
        }

        DB::connection('jobflow')->statement($this->upsertSql(), $this->upsertBindings($data));
    }

    private function upsertSql(): string
    {
        return <<<SQL
INSERT INTO candidates (
  first_name,
  last_name,
  email,
  phone,
  location,
  current_title,
  years_experience,
  education_level,
  skills,
  languages,
  desired_positions,
  desired_sectors,
  desired_locations,
  min_salary,
  contract_types,
  linkedin_url,
  portfolio_url
) VALUES (
  :first_name,
  :last_name,
  :email,
  :phone,
  :location,
  :current_title,
  :years_experience,
  :education_level,
  string_to_array(:skills, ','),
  string_to_array(:languages, ','),
  string_to_array(:desired_positions, ','),
  string_to_array(:desired_sectors, ','),
  string_to_array(:desired_locations, ','),
  :min_salary,
  string_to_array(:contract_types, ','),
  :linkedin_url,
  :portfolio_url
)
ON CONFLICT (email) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  phone = EXCLUDED.phone,
  location = EXCLUDED.location,
  current_title = EXCLUDED.current_title,
  years_experience = EXCLUDED.years_experience,
  education_level = EXCLUDED.education_level,
  skills = EXCLUDED.skills,
  languages = EXCLUDED.languages,
  desired_positions = EXCLUDED.desired_positions,
  desired_sectors = EXCLUDED.desired_sectors,
  desired_locations = EXCLUDED.desired_locations,
  min_salary = EXCLUDED.min_salary,
  contract_types = EXCLUDED.contract_types,
  linkedin_url = EXCLUDED.linkedin_url,
  portfolio_url = EXCLUDED.portfolio_url;
SQL;
    }

    private function updateSql(): string
    {
        return <<<SQL
UPDATE candidates
SET
  first_name = :first_name,
  last_name = :last_name,
  email = :email,
  phone = :phone,
  location = :location,
  current_title = :current_title,
  years_experience = :years_experience,
  education_level = :education_level,
  skills = string_to_array(:skills, ','),
  languages = string_to_array(:languages, ','),
  desired_positions = string_to_array(:desired_positions, ','),
  desired_sectors = string_to_array(:desired_sectors, ','),
  desired_locations = string_to_array(:desired_locations, ','),
  min_salary = :min_salary,
  contract_types = string_to_array(:contract_types, ','),
  linkedin_url = :linkedin_url,
  portfolio_url = :portfolio_url
WHERE email = :match_email;
SQL;
    }

    private function upsertBindings(array $data): array
    {
        return $data;
    }

    private function updateBindings(array $data, string $matchEmail): array
    {
        $data['match_email'] = $matchEmail;

        return $data;
    }

    private function normalizeInput(array $input): array
    {
        return [
            'first_name' => $this->normalizeText($input['first_name'] ?? ''),
            'last_name' => $this->normalizeText($input['last_name'] ?? ''),
            'email' => $this->normalizeText($input['email'] ?? ''),
            'phone' => $this->normalizePhone($input['phone'] ?? null),
            'location' => $this->normalizeText($input['location'] ?? null),
            'current_title' => $this->normalizeText($input['current_title'] ?? null),
            'years_experience' => $this->normalizeInt($input['years_experience'] ?? null),
            'education_level' => $this->normalizeText($input['education_level'] ?? null),
            'skills' => $this->normalizeCsv($input['skills'] ?? null),
            'languages' => $this->normalizeCsv($input['languages'] ?? null),
            'desired_positions' => $this->normalizeCsv($input['desired_positions'] ?? null),
            'desired_sectors' => $this->normalizeCsv($input['desired_sectors'] ?? null),
            'desired_locations' => $this->normalizeCsv($input['desired_locations'] ?? null),
            'min_salary' => $this->normalizeInt($input['min_salary'] ?? null),
            'contract_types' => $this->normalizeCsv($input['contract_types'] ?? null),
            'linkedin_url' => $this->normalizeText($input['linkedin_url'] ?? null),
            'portfolio_url' => $this->normalizeText($input['portfolio_url'] ?? null),
        ];
    }

    private function normalizeText(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $trimmed = trim($value);

        return $trimmed === '' ? null : $trimmed;
    }

    private function normalizeInt(mixed $value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (int) $value;
    }

    private function normalizeCsv(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $clean = str_replace(["\r\n", "\n", "\r", ";"], ',', $value);
        $parts = array_filter(array_map('trim', explode(',', $clean)));

        if ($parts === []) {
            return null;
        }

        $unique = array_values(array_unique($parts));

        return implode(',', $unique);
    }

    private function normalizePhone(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $digits = preg_replace('/\D+/', '', $value);

        if ($digits === '') {
            return null;
        }

        if (strlen($digits) <= 9 && ! str_starts_with($digits, '237')) {
            if (str_starts_with($digits, '0')) {
                $digits = '237' . substr($digits, 1);
            } elseif (str_starts_with($digits, '6')) {
                $digits = '237' . $digits;
            }
        }

        return $digits;
    }

    private function pgArrayToCsv(mixed $value): string
    {
        if ($value === null || $value === '') {
            return '';
        }

        if (is_array($value)) {
            return implode(', ', array_filter($value, fn ($item) => $item !== null && $item !== ''));
        }

        $trimmed = trim((string) $value, '{}');

        if ($trimmed === '') {
            return '';
        }

        $parts = array_map(static function ($item) {
            $item = trim($item);
            $item = trim($item, '"');

            return $item;
        }, explode(',', $trimmed));

        $parts = array_filter($parts, fn ($item) => $item !== '');

        return implode(', ', $parts);
    }

    private function webhookUrl(): ?string
    {
        return env('N8N_CONTACT_WEBHOOK')
            ?: env('N8N_CHAT_WEBHOOK')
            ?: null;
    }

    private function callWebhook(string $action, array $payload): array
    {
        $url = $this->webhookUrl();

        if (! $url) {
            throw new \RuntimeException('Webhook not configured.');
        }

        $body = array_merge(['action' => $action, 'source' => 'camerhub'], $payload);
        $request = Http::acceptJson()->timeout(12);

        $secret = env('N8N_WEBHOOK_SECRET');
        if ($secret) {
            $json = json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            $timestamp = (string) time();
            $signature = hash_hmac('sha256', $timestamp . '.' . $json, $secret);
            $request = $request->withHeaders([
                'X-Timestamp' => $timestamp,
                'X-Signature' => $signature,
            ]);
        }

        $response = $request->post($url, $body)->throw()->json();

        return is_array($response) ? $response : [];
    }
}
