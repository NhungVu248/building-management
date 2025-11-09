<?php

namespace App\Http\Controllers;

use App\Models\Amenity;
use Illuminate\Http\Request;
use Inertia\Inertia;
class AmenityController extends Controller
{
    public function index()
    {
        $amenities = Amenity::latest()->paginate(20);
        return Inertia::render('Amenities/Index', ['amenities' => $amenities]);
    }

    public function create()
    {
        return Inertia::render('Amenities/Create');
    }

    public function store(Request $r)
    {
        $data = $r->validate([
            'name'=>'required|string|max:255|unique:amenities,name',
            'description'=>'nullable|string',
            'capacity'=>'required|integer|min:1',
            'is_active'=>'required|boolean',
        ]);
        Amenity::create($data);
        return redirect()->route('amenities.index');
    }

    public function edit(Amenity $amenity)
    {
        return Inertia::render('Amenities/Edit', ['amenity'=>$amenity]);
    }

    public function update(Request $r, Amenity $amenity)
    {
        $data = $r->validate([
            'name'=>'required|string|max:255|unique:amenities,name,'.$amenity->id,
            'description'=>'nullable|string',
            'capacity'=>'required|integer|min:1',
            'is_active'=>'required|boolean',
        ]);
        $amenity->update($data);
        return redirect()->route('amenities.index');
    }

    public function destroy(Amenity $amenity)
    {
        $amenity->delete();
        return redirect()->route('amenities.index');
    }
}
