<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ParkingCTest extends TestCase
{

    public function test_ホーム画面を表示できる()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_C駐車場画面を表示できる()
    {
        $response = $this->get('/parking-c');

        $response->assertStatus(200);
    }
}
