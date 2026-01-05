<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class N8nChatService
{
    public function sendMessage(array $payload): array
    {
        $url = config('n8n.chat_webhook');

        if (! $url) {
            throw new \RuntimeException('Chat webhook not configured.');
        }

        $request = Http::acceptJson()->timeout(12);
        $secret = config('n8n.webhook_secret');

        if ($secret) {
            $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            $timestamp = (string) time();
            $signature = hash_hmac('sha256', $timestamp . '.' . $json, $secret);

            $request = $request->withHeaders([
                'X-Timestamp' => $timestamp,
                'X-Signature' => $signature,
            ]);
        }

        $response = $request->post($url, $payload)->throw()->json();

        return is_array($response) ? $response : [];
    }

    public function extractReply(array $response): ?string
    {
        $candidates = [
            $response['responseText'] ?? null,
            $response['message'] ?? null,
            $response['text'] ?? null,
            $response['output'] ?? null,
            $response['data']['responseText'] ?? null,
            $response['data']['message'] ?? null,
            $response['data']['text'] ?? null,
        ];

        foreach ($candidates as $candidate) {
            if (is_string($candidate) && trim($candidate) !== '') {
                return trim($candidate);
            }
        }

        return null;
    }
}
