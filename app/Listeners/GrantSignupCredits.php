<?php

namespace App\Listeners;

use App\Services\CreditService;
use Illuminate\Auth\Events\Registered;

class GrantSignupCredits
{
    public function handle(Registered $event, CreditService $credits): void
    {
        $user = $event->user;

        if (!$user) {
            return;
        }

        $credits->grantSignupCredits($user);
    }
}
