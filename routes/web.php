<?php

use App\Http\Controllers\ParkingCController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [ParkingCController::class, 'index'])->name('home');

// C駐車場
Route::prefix('parking-c')->name('parking-c.')->group(function () {
    Route::get('/', [ParkingCController::class, 'index'])->name('index');
    Route::get('/search', [ParkingCController::class, 'search'])->name('search');
});