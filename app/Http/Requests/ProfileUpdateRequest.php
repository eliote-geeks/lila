<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'phone' => ['required', 'string', 'max:20'],
            'location' => ['required', 'string', 'max:255'],
            'current_title' => ['required', 'string', 'max:255'],
            'years_experience' => ['required', 'integer', 'min:0', 'max:80'],
            'education_level' => ['nullable', 'string', 'max:100'],
            'skills' => ['required', 'string', 'max:2000'],
            'languages' => ['nullable', 'string', 'max:1000'],
            'desired_positions' => ['required', 'string', 'max:2000'],
            'desired_sectors' => ['required', 'string', 'max:2000'],
            'desired_locations' => ['required', 'string', 'max:2000'],
            'min_salary' => ['required', 'integer', 'min:0', 'max:100000000'],
            'contract_types' => ['nullable', 'string', 'max:500'],
            'linkedin_url' => ['nullable', 'url', 'max:2048'],
            'portfolio_url' => ['nullable', 'url', 'max:2048'],
        ];
    }
}
