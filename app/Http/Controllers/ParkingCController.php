<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreparkingCRequest;
use App\Http\Requests\UpdateparkingCRequest;
use App\Models\ParkingC;

class ParkingCController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('parking-c', ['parkingC' => ParkingC::all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreparkingCRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreparkingCRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\parkingC  $parkingC
     * @return \Illuminate\Http\Response
     */
    public function show(parkingC $parkingC)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\parkingC  $parkingC
     * @return \Illuminate\Http\Response
     */
    public function edit(parkingC $parkingC)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateparkingCRequest  $request
     * @param  \App\Models\parkingC  $parkingC
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateparkingCRequest $request, parkingC $parkingC)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\parkingC  $parkingC
     * @return \Illuminate\Http\Response
     */
    public function destroy(parkingC $parkingC)
    {
        //
    }
}
