<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credit_purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('type', 24)->default('topup');
            $table->unsignedInteger('amount_fcfa');
            $table->unsignedInteger('credits');
            $table->string('status', 24)->default('pending');
            $table->string('payment_method', 24)->nullable();
            $table->string('reference')->nullable();
            $table->string('proof_path')->nullable();
            $table->text('note')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_purchases');
    }
};
