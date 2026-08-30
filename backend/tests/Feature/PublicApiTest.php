<?php

namespace Tests\Feature;

use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_can_list_services(): void
    {
        $response = $this->getJson('/api/v1/services');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'slug',
                        'eyebrow',
                        'badge',
                        'tagline',
                        'short_description',
                        'icon',
                        'metrics',
                        'sort_order',
                    ],
                ],
            ]);

        $this->assertCount(4, $response->json('data'));
    }

    public function test_can_get_single_service_by_slug(): void
    {
        $response = $this->getJson('/api/v1/services/smart-water-metering');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'slug' => 'smart-water-metering',
                    'title' => 'Smart Water Metering',
                ],
            ])
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'title',
                    'slug',
                    'eyebrow',
                    'badge',
                    'tagline',
                    'short_description',
                    'description',
                    'icon',
                    'metrics',
                    'pillars',
                    'lifecycle_phases',
                    'faqs',
                    'section_toggles',
                    'seo',
                    'aeo',
                ],
            ]);
    }

    public function test_returns_404_for_non_existent_service(): void
    {
        $response = $this->getJson('/api/v1/services/unknown-service');
        $response->assertStatus(404)
            ->assertJson(['success' => false]);
    }

    public function test_can_list_team_members(): void
    {
        $response = $this->getJson('/api/v1/team-members');

        $response->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'role',
                        'category',
                        'credential',
                        'bio',
                        'initials',
                        'photo_url',
                        'show_on_home',
                        'sort_order',
                    ],
                ],
            ]);

        $this->assertCount(7, $response->json('data'));
    }

    public function test_can_list_partners(): void
    {
        $response = $this->getJson('/api/v1/partners');

        $response->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'category',
                        'collaboration_detail',
                        'logo_url',
                        'website_url',
                        'is_featured',
                        'sort_order',
                    ],
                ],
            ]);

        $this->assertCount(16, $response->json('data'));
    }

    public function test_can_list_news_posts(): void
    {
        $response = $this->getJson('/api/v1/news');

        $response->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'slug',
                        'published_date_text',
                        'summary',
                        'external_link',
                        'published_at',
                    ],
                ],
            ]);

        $this->assertCount(3, $response->json('data'));
    }

    public function test_can_list_faqs(): void
    {
        $response = $this->getJson('/api/v1/faqs?placement=homepage');

        $response->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'question',
                        'answer',
                        'placement',
                        'sort_order',
                    ],
                ],
            ]);

        $this->assertCount(6, $response->json('data'));
    }

    public function test_can_get_page_content_by_slug(): void
    {
        $response = $this->getJson('/api/v1/pages/about');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'title' => 'About Us',
                    'template' => 'about',
                ],
            ])
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id',
                    'title',
                    'slug',
                    'template',
                    'section_toggles',
                    'content',
                    'seo',
                    'aeo',
                ],
            ]);
    }

    public function test_can_get_header_and_footer_settings(): void
    {
        $generalResponse = $this->getJson('/api/v1/settings/general');
        $generalResponse->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonStructure([
                'success',
                'data' => [
                    'site_name',
                    'contact_email',
                    'contact_phone',
                    'office_address',
                    'social_links' => ['linkedin', 'twitter'],
                    'default_seo' => ['meta_title', 'meta_description'],
                ],
            ]);

        $headerResponse = $this->getJson('/api/v1/settings/header');
        $headerResponse->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonStructure([
                'success',
                'data' => [
                    'logo_text',
                    'show_cta_button',
                    'cta_button_text',
                    'cta_button_link',
                    'menu_items',
                ],
            ]);

        $footerResponse = $this->getJson('/api/v1/settings/footer');
        $footerResponse->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonStructure([
                'success',
                'data' => [
                    'tagline',
                    'contact_email',
                    'contact_phone',
                    'office_address',
                    'copyright_text',
                    'columns',
                ],
            ]);
    }

    public function test_can_submit_contact_inquiry(): void
    {
        $payload = [
            'name' => 'Eng. Tariq Ahmed',
            'email' => 'tariq@utility.gov.bd',
            'organisation' => 'Rajshahi WASA',
            'phone' => '+880 17 0000 0000',
            'message' => 'We would like to scope a pilot for ultrasonic metering in DMA 4.',
        ];

        $response = $this->postJson('/api/v1/contact', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Thank you. Your inquiry has been received by our engineering team.',
            ]);

        $this->assertDatabaseHas('contact_inquiries', [
            'name' => 'Eng. Tariq Ahmed',
            'email' => 'tariq@utility.gov.bd',
            'organisation' => 'Rajshahi WASA',
            'status' => 'new',
        ]);
    }

    public function test_contact_form_validates_required_fields(): void
    {
        $response = $this->postJson('/api/v1/contact', []);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Validation error',
            ])
            ->assertJsonValidationErrors(['name', 'email', 'message']);
    }
}
