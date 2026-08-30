<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique()->index();
            $table->string('eyebrow')->nullable();
            $table->string('badge')->nullable();
            $table->text('tagline')->nullable();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->string('icon')->nullable();
            $table->string('featured_image')->nullable();
            $table->json('metrics')->nullable();
            $table->json('pillars')->nullable();
            $table->json('lifecycle_phases')->nullable();
            $table->json('faqs')->nullable();
            $table->json('section_toggles')->nullable();
            $table->json('seo')->nullable();
            $table->json('aeo')->nullable();
            $table->boolean('is_published')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
