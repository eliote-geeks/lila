<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Services\JobflowCandidateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request, JobflowCandidateService $jobflow): View
    {
        $candidate = null;
        $user = $request->user();

        try {
            $candidate = $jobflow->getByEmail($user->email);
        } catch (\Throwable $exception) {
            report($exception);
        }

        $nameParts = preg_split('/\s+/', trim($user->name), 2);
        $candidateDefaults = [
            'first_name' => $candidate['first_name'] ?? ($nameParts[0] ?? ''),
            'last_name' => $candidate['last_name'] ?? ($nameParts[1] ?? ''),
            'email' => $candidate['email'] ?? $user->email,
            'phone' => $candidate['phone'] ?? '',
            'location' => $candidate['location'] ?? '',
            'current_title' => $candidate['current_title'] ?? '',
            'years_experience' => $candidate['years_experience'] ?? '',
            'education_level' => $candidate['education_level'] ?? '',
            'skills' => $candidate['skills'] ?? '',
            'languages' => $candidate['languages'] ?? '',
            'desired_positions' => $candidate['desired_positions'] ?? '',
            'desired_sectors' => $candidate['desired_sectors'] ?? '',
            'desired_locations' => $candidate['desired_locations'] ?? '',
            'min_salary' => $candidate['min_salary'] ?? '',
            'contract_types' => $candidate['contract_types'] ?? '',
            'linkedin_url' => $candidate['linkedin_url'] ?? '',
            'portfolio_url' => $candidate['portfolio_url'] ?? '',
        ];

        return view('profile.edit', [
            'user' => $user,
            'candidate' => $candidateDefaults,
            'requiredFields' => $jobflow->requiredFieldLabels(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request, JobflowCandidateService $jobflow): RedirectResponse
    {
        $user = $request->user();
        $previousEmail = $user->email;
        $validated = $request->validated();

        try {
            $jobflow->upsertByEmail($previousEmail, $validated);
        } catch (\Throwable $exception) {
            report($exception);

            return Redirect::route('profile.edit')->withErrors([
                'jobflow' => __('Impossible de synchroniser votre profil pour le moment. Réessayez plus tard.'),
            ]);
        }

        $fullName = trim($validated['first_name'].' '.$validated['last_name']);
        $user->name = $fullName === '' ? $user->name : $fullName;
        $user->email = $validated['email'];

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        if ($request->session()->has('url.intended')) {
            $intended = $request->session()->pull('url.intended');

            return Redirect::to($intended)->with('status', 'profile-updated');
        }

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
