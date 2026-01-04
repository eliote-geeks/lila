<?php

namespace App\Listeners;

use App\Services\CreditService;
use Illuminate\Auth\Events\Registered;

class GrantSignupCredits
{
    public function __construct(private readonly CreditService $credits)
    {
    }

    public function handle(Registered $event): void
    {
        $user = $event->user;

        if (!$user) {
            return;
        }

        $this->credits->grantSignupCredits($user);
    }
}
