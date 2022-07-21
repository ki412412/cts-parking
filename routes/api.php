<?php

use App\Http\Controllers\Api\ParkingCController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// C駐車場
Route::prefix('parking-c')->name('parking_c.')->group(function () {
    Route::get('/', [ParkingCController::class, 'index'])->name('index');
    Route::get('/statistics', [ParkingCController::class, 'statistics'])->name('statistics');
});
