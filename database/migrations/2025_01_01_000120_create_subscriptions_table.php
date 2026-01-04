<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('status', 24)->default('inactive');
            $table->unsignedInteger('price_fcfa')->default(0);
            $table->unsignedInteger('monthly_credits')->default(0);
            $table->timestamp('started_at')->nullable();
            $table->timestamp('last_renewed_at')->nullable();
            $table->timestamp('next_renewal_at')->nullable();
            $table->timestamp('canceled_at')->nullable();
            $table->timestamps();

            $table->unique('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
