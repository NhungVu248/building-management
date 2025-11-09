<?php

// VehicleController (rút gọn)
namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\AccessCard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index() {
        return Inertia::render('Vehicles/Index', [
            'items' => Vehicle::with('card')->latest()->paginate(15),
            'cards' => AccessCard::select('id','code','holder_name')->orderBy('code')->get()
        ]);
    }
    public function create() {
        return Inertia::render('Vehicles/Form', [
            'cards' => AccessCard::select('id','code','holder_name')->orderBy('code')->get()
        ]);
    }
    public function store(Request $r) {
        $data = $r->validate([
            'plate'=>'required|unique:vehicles,plate',
            'owner_name'=>'required',
            'access_card_id'=>'nullable|exists:access_cards,id',
            'slot'=>'nullable|string',
            'status'=>'in:active,inactive'
        ]);
        Vehicle::create($data);
        return redirect()->route('vehicles.index');
    }
    public function edit(Vehicle $vehicle) {
        return Inertia::render('Vehicles/Form', [
            'item'=>$vehicle->load('card'),
            'cards'=> AccessCard::select('id','code','holder_name')->get()
        ]);
    }
    public function update(Request $r, Vehicle $vehicle) {
        $data = $r->validate([
            'plate'=>'required|unique:vehicles,plate,'.$vehicle->id,
            'owner_name'=>'required',
            'access_card_id'=>'nullable|exists:access_cards,id',
            'slot'=>'nullable|string',
            'status'=>'required|in:active,inactive'
        ]);
        $vehicle->update($data);
        return redirect()->route('vehicles.index');
    }
    public function destroy(Vehicle $vehicle) {
        $vehicle->delete();
        return redirect()->route('vehicles.index');
    }
}
