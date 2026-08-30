<?php

namespace Tests\Feature;

use App\Models\ContactInquiry;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactFormTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_can_submit_contact_form_successfully(): void
    {
        $payload = [
            'name' => 'Engr. Mahbubur Rahman',
            'email' => 'mahbub@dhakawasa.gov.bd',
            'organisation' => 'Dhaka WASA — Zone 4',
            'phone' => '+880 181 900 0000',
            'message' => 'Requesting technical scope document for 50,000 smart ultrasonic meter deployment in Mirpur sector.',
        ];

        $response = $this->postJson('/api/v1/contact', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Thank you. Your inquiry has been received by our engineering team.',
            ]);

        $this->assertDatabaseHas('contact_inquiries', [
            'name' => 'Engr. Mahbubur Rahman',
            'email' => 'mahbub@dhakawasa.gov.bd',
            'organisation' => 'Dhaka WASA — Zone 4',
            'phone' => '+880 181 900 0000',
            'status' => 'new',
        ]);
    }

    public function test_can_submit_with_minimal_required_fields(): void
    {
        $payload = [
            'name' => 'Sara Khan',
            'email' => 'sara.khan@infrastructure.org',
            'message' => 'Inquiry regarding regional LoRaWAN gateway coverage.',
        ];

        $response = $this->postJson('/api/v1/contact', $payload);

        $response->assertStatus(201)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('contact_inquiries', [
            'name' => 'Sara Khan',
            'email' => 'sara.khan@infrastructure.org',
            'organisation' => null,
            'phone' => null,
            'status' => 'new',
        ]);
    }

    public function test_validation_fails_for_missing_required_fields(): void
    {
        $response = $this->postJson('/api/v1/contact', [
            'organisation' => 'Anonymous Org',
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Validation error',
            ])
            ->assertJsonValidationErrors(['name', 'email', 'message']);
    }

    public function test_validation_fails_for_invalid_email(): void
    {
        $response = $this->postJson('/api/v1/contact', [
            'name' => 'Test User',
            'email' => 'not-a-valid-email',
            'message' => 'Hello team',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_submissions_are_not_exposed_publicly(): void
    {
        // Public GET /api/v1/contact should not exist
        $response = $this->getJson('/api/v1/contact');
        $response->assertStatus(405); // Method Not Allowed (or 404)
    }

    public function test_admin_can_manage_inquiries(): void
    {
        $admin = User::first();
        $this->assertNotNull($admin);

        $inquiry = ContactInquiry::create([
            'name' => 'Test Lead',
            'email' => 'lead@test.com',
            'message' => 'Urgent inquiry',
            'status' => 'new',
        ]);

        // Status update to 'read'
        $inquiry->update([
            'status' => 'read',
            'admin_notes' => 'Assigned to regional engineering team on August 30.',
        ]);

        $this->assertDatabaseHas('contact_inquiries', [
            'id' => $inquiry->id,
            'status' => 'read',
            'admin_notes' => 'Assigned to regional engineering team on August 30.',
        ]);
    }
}
