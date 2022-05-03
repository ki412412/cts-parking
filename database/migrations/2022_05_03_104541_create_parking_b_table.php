<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParkingBTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parking_b', function (Blueprint $table) {
            $table->id();
            $table->integer('status')->comment('{0:不明,1:空,2:混,3:満}');
            $table->text('description')->nullable();
            $table->dateTime('scraped_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('parking_b');
    }
}
