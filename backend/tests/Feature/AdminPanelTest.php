<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_admin_login_screen_is_accessible(): void
    {
        $response = $this->get('/admin/login');
        $response->assertStatus(200);
    }

    public function test_admin_user_can_access_dashboard(): void
    {
        $user = User::where('email', 'admin@n3solutions.com')->first();
        $this->assertNotNull($user);

        $response = $this->actingAs($user)->get('/admin');
        $response->assertStatus(200);
    }

    public function test_admin_can_access_all_resources(): void
    {
        $user = User::where('email', 'admin@n3solutions.com')->first();

        $routes = [
            '/admin/pages',
            '/admin/services',
            '/admin/team-members',
            '/admin/partners',
            '/admin/news-posts',
            '/admin/faqs',
            '/admin/contact-inquiries',
            '/admin/site-settings',
        ];

        foreach ($routes as $route) {
            $response = $this->actingAs($user)->get($route);
            $response->assertStatus(200);
        }
    }
}
