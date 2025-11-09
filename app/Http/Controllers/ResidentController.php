<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ResidentController extends Controller
{
    public function index()
    {
        $residents = Resident::with('apartment')->latest()->paginate(20);
        return Inertia::render('Residents/Index', ['residents' => $residents]);
    }

    public function create()
    {
        $apartments = Apartment::select('id','code')->orderBy('code')->get();
        return Inertia::render('Residents/Create', ['apartments' => $apartments]);
    }

    public function store(Request $r)
    {
        $data = $r->validate([
            'apartment_id'=>'required|exists:apartments,id',
            'name'=>'required|string|max:255',
            'phone'=>'nullable|string|max:50',
            'email'=>'nullable|email|max:255',
            'status'=>'required|in:Đang ở,Tạm vắng,Chuyển đi'
        ]);
        Resident::create($data);
        return redirect()->route('residents.index');
    }

    public function edit(Resident $resident)
    {
        $apartments = Apartment::select('id','code')->orderBy('code')->get();
        return Inertia::render('Residents/Edit', compact('resident','apartments'));
    }

    public function update(Request $r, Resident $resident)
    {
        $data = $r->validate([
            'apartment_id'=>'required|exists:apartments,id',
            'name'=>'required|string|max:255',
            'phone'=>'nullable|string|max:50',
            'email'=>'nullable|email|max:255',
            'status'=>'required|in:Đang ở,Tạm vắng,Chuyển đi'
        ]);
        $resident->update($data);
        return redirect()->route('residents.index');
    }

    public function destroy(Resident $resident)
    {
        $resident->delete();
        return redirect()->route('residents.index');
    }
}