<?php

namespace App\Exceptions;

use RuntimeException;

class InsufficientCreditsException extends RuntimeException
{
    public int $required;
    public int $balance;

    public function __construct(int $required, int $balance)
    {
        parent::__construct('Insufficient credits.');

        $this->required = $required;
        $this->balance = $balance;
    }
}
