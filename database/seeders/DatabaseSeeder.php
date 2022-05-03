<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        for ($d=0; $d<3; $d++) {
            for ($i=0; $i<24; $i++) {
                $date = date('Y-m-d', strtotime("+{$d} day"));
                \App\Models\ParkingC::factory()->create(['scraped_at' => "{$date} {$i}:00"]);
            }
        }
        

    }
}
