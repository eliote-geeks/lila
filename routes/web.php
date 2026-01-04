<?php

use App\Http\Controllers\CreditController;
use App\Http\Controllers\ProfileController;
use App\Services\JobflowCandidateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/chat', function (Request $request, JobflowCandidateService $jobflow) {
        $missingFields = [];
        $profileComplete = true;

        try {
            $candidate = $jobflow->getByEmail($request->user()->email);
            $missingFields = $jobflow->missingRequiredFields($candidate);
            $profileComplete = $missingFields === [];
        } catch (\Throwable $exception) {
            report($exception);
            $profileComplete = false;
            $missingFields = array_values($jobflow->requiredFieldLabels());
        }

        return view('chat', [
            'profileComplete' => $profileComplete,
            'missingFields' => $missingFields,
            'requiredFields' => $jobflow->requiredFieldLabels(),
        ]);
    });
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/credits', [CreditController::class, 'show'])->name('credits.show');
    Route::get('/credits/transactions', [CreditController::class, 'transactions'])->name('credits.transactions');
    Route::post('/credits/consume', [CreditController::class, 'consume'])->name('credits.consume');
    Route::post('/credits/purchase', [CreditController::class, 'purchase'])->name('credits.purchase');
});

require __DIR__.'/auth.php';
