<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique()->index();
            $table->string('template')->default('custom');
            $table->boolean('is_published')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->json('section_toggles')->nullable();
            $table->json('content')->nullable();
            $table->json('seo')->nullable();
            $table->json('aeo')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
