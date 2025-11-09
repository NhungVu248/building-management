<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApartmentController extends Controller
{
    public function index()
    {
        $apartments = Apartment::all();
        return Inertia::render('Apartments/Index', ['apartments' => $apartments]);
    }

    public function create()
    {
        return Inertia::render('Apartments/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'code' => 'required|unique:apartments',
            'owner_name' => 'nullable|string',
            'floor' => 'required|integer',
            'area' => 'required|numeric',
            'status' => 'required|string',
            'note' => 'nullable|string'
        ]);
        Apartment::create($data);
        return redirect()->route('apartments.index');
    }

    public function edit(Apartment $apartment)
    {
        return Inertia::render('Apartments/Edit', ['apartment' => $apartment]);
    }

    public function update(Request $request, Apartment $apartment)
    {
        $data = $request->validate([
            'code' => 'required|unique:apartments,code,' . $apartment->id,
            'owner_name' => 'nullable|string',
            'floor' => 'required|integer',
            'area' => 'required|numeric',
            'status' => 'required|string',
            'note' => 'nullable|string'
        ]);
        $apartment->update($data);
        return redirect()->route('apartments.index');
    }

    public function destroy(Apartment $apartment)
    {
        $apartment->delete();
        return redirect()->route('apartments.index');
    }
}
