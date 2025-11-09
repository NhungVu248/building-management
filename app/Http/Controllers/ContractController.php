<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Apartment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContractController extends Controller
{
    public function index()
    {
        $contracts = Contract::with('apartment')->get();
        return Inertia::render('Contracts/Index', ['contracts' => $contracts]);
    }

    public function create()
    {
        $apartments = Apartment::all();
        return Inertia::render('Contracts/Create', ['apartments' => $apartments]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'apartment_id' => 'required|exists:apartments,id',
            'contract_code' => 'required|unique:contracts',
            'type' => 'required|string',
            'tenant_name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'value' => 'required|numeric',
            'status' => 'required|string'
        ]);
        Contract::create($data);
        return redirect()->route('contracts.index');
    }

    public function edit(Contract $contract)
    {
        $apartments = Apartment::all();
        return Inertia::render('Contracts/Edit', ['contract' => $contract, 'apartments' => $apartments]);
    }

    public function update(Request $request, Contract $contract)
    {
        $data = $request->validate([
            'apartment_id' => 'required|exists:apartments,id',
            'contract_code' => 'required|unique:contracts,contract_code,' . $contract->id,
            'type' => 'required|string',
            'tenant_name' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'value' => 'required|numeric',
            'status' => 'required|string'
        ]);
        $contract->update($data);
        return redirect()->route('contracts.index');
    }

    public function destroy(Contract $contract)
    {
        $contract->delete();
        return redirect()->route('contracts.index');
    }
}
