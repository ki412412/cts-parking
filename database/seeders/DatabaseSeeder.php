<?php

namespace Database\Seeders;

use App\Models\ParkingC;
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
        for ($d=0; $d<14; $d++) {
            for ($i=0; $i<24; $i++) {
                $date = date('Y-m-d', strtotime("+{$d} day"));
                ParkingC::factory()->create(['scraped_at' => "{$date} {$i}:00"]);
            }
        }


    }
}
