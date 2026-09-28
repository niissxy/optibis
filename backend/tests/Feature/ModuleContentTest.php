<?php

namespace Tests\Feature;

use App\Models\ApiToken;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ModuleContentTest extends TestCase
{
    use RefreshDatabase;

    private function authenticateUser(): string
    {
        $user = User::factory()->create();
        $plainToken = 'test-token-12345';
        ApiToken::create([
            'user_id' => $user->id,
            'token_hash' => hash('sha256', $plainToken),
            'last_used_at' => now(),
        ]);
        return $plainToken;
    }

    public function test_can_read_modules_publicly(): void
    {
        $response = $this->getJson('/api/modules/services');
        $response->assertStatus(200);

        $responseV1 = $this->getJson('/api/v1/modules/services');
        $responseV1->assertStatus(200);
    }

    public function test_can_create_update_and_delete_module_item(): void
    {
        $token = $this->authenticateUser();

        // Create
        $createResponse = $this->withHeader('Authorization', "Bearer $token")
            ->postJson('/api/modules/services', [
                'title' => 'Layanan Testing',
                'slug' => 'layanan-testing',
                'summary' => 'Deskripsi testing',
                'image_url' => 'https://example.com/image.jpg',
                'data' => ['features' => ['Fitur 1', 'Fitur 2']],
                'is_published' => true,
            ]);

        $createResponse->assertStatus(201);
        $itemId = $createResponse->json('id');

        // Update
        $updateResponse = $this->withHeader('Authorization', "Bearer $token")
            ->putJson("/api/modules/services/{$itemId}", [
                'title' => 'Layanan Testing Updated',
                'slug' => 'layanan-testing-updated',
                'summary' => 'Deskripsi updated',
                'data' => ['features' => ['Fitur 1']],
                'is_published' => true,
            ]);

        $updateResponse->assertStatus(200);
        $this->assertEquals('Layanan Testing Updated', $updateResponse->json('title'));

        // Delete
        $deleteResponse = $this->withHeader('Authorization', "Bearer $token")
            ->deleteJson("/api/modules/services/{$itemId}");

        $deleteResponse->assertStatus(200);
        $deleteResponse->assertJson(['message' => 'Konten dihapus.']);
    }
}
