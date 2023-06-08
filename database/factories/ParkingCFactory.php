<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ParkingCFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'status' => $this->faker->randomElement([0, 1, 2, 3]),
            'description' => null,
            'scraped_at' => date('YYYY-mm-dd')
        ];
    }
}
