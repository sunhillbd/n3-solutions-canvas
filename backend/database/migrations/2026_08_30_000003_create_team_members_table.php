<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->string('category')->default('executive'); // executive, functional_lead, advisor
            $table->string('credential')->nullable();
            $table->text('bio')->nullable();
            $table->string('initials', 10)->nullable();
            $table->string('photo')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('show_on_home')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};
