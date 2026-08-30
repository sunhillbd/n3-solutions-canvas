<?php

namespace Tests\Feature;

use App\Models\NewsPost;
use App\Models\Partner;
use App\Models\TeamMember;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImageUploadTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
        Storage::fake('public');
    }

    public function test_team_member_photo_stores_file_and_exposes_public_url(): void
    {
        $file = UploadedFile::fake()->image('avatar.jpg', 300, 300);
        $path = $file->store('team', 'public');

        $member = TeamMember::create([
            'name' => 'Dr. Arif Hossain',
            'role' => 'Principal Systems Architect',
            'category' => 'functional_lead',
            'initials' => 'AH',
            'photo' => $path,
            'is_active' => true,
            'sort_order' => 1,
        ]);

        Storage::disk('public')->assertExists($path);

        $response = $this->getJson('/api/v1/team-members');
        $response->assertStatus(200);

        $memberData = collect($response->json('data'))->firstWhere('name', 'Dr. Arif Hossain');
        $this->assertNotNull($memberData);
        $this->assertStringContainsString('storage/team/', $memberData['photo_url']);
    }

    public function test_partner_logo_stores_file_and_exposes_public_url(): void
    {
        $file = UploadedFile::fake()->image('partner_logo.png', 240, 80);
        $path = $file->store('partners', 'public');

        $partner = Partner::create([
            'name' => 'Global Metrology AG',
            'category' => 'metrology_oem',
            'collaboration_detail' => 'Static ultrasonic transducers and calibration',
            'logo' => $path,
            'is_featured' => true,
            'is_active' => true,
            'sort_order' => 1,
        ]);

        Storage::disk('public')->assertExists($path);

        $response = $this->getJson('/api/v1/partners');
        $response->assertStatus(200);

        $partnerData = collect($response->json('data'))->firstWhere('name', 'Global Metrology AG');
        $this->assertNotNull($partnerData);
        $this->assertStringContainsString('storage/partners/', $partnerData['logo_url']);
    }

    public function test_news_featured_image_stores_file_and_exposes_public_url(): void
    {
        $file = UploadedFile::fake()->image('news_hero.jpg', 1200, 630);
        $path = $file->store('news', 'public');

        $post = NewsPost::create([
            'title' => 'N3 Solutions Expands Field Operations Hub',
            'slug' => 'n3-solutions-expands-field-operations-hub',
            'published_date_text' => '20 August 2026',
            'summary' => 'New field engineering center established in Chittagong.',
            'content' => '<p>Full engineering announcement text here...</p>',
            'featured_image' => $path,
            'is_published' => true,
            'published_at' => now(),
        ]);

        Storage::disk('public')->assertExists($path);

        $response = $this->getJson('/api/v1/news/n3-solutions-expands-field-operations-hub');
        $response->assertStatus(200);
        $this->assertStringContainsString('storage/news/', $response->json('data.featured_image_url'));
    }
}
