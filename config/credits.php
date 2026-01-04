<?php

return [
    'signup_credits' => 30,
    'monthly_credits' => 100,
    'monthly_price_fcfa' => 500,
    'resets_monthly' => true,
    'actions' => [
        'analysis' => 1,
        'cv' => 5,
        'letter' => 3,
        'apply' => 10,
    ],
    'admin_emails' => array_filter(array_map('trim', explode(',', env('CREDITS_ADMIN_EMAILS', '')))),
];
