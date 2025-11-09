<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class ResidentController extends Controller
{
  public function index() {
    $residents = Resident::with('apartment')->orderByDesc('id')->paginate(10);
    return Inertia::render('Residents/Index', [
      'residents' => $residents
    ]);
  }

  public function create() {
    return Inertia::render('Residents/Create');
  }

  public function store(Request $request) {
    $data = $request->validate([
      'name' => ['required','string','max:255'],
      'cccd' => ['required','string','max:50','unique:residents,cccd'],
      'phone'=> ['nullable','string','max:30'],
      'email'=> ['nullable','email'],
      'apartment_id'=> ['nullable','integer'],
      'status'=> ['required', Rule::in(['dang_o','tam_vang','chuyen_di'])],
      'note'  => ['nullable','string']
    ]);

    Resident::create($data);
    return redirect()->route('residents.index')->with('success','Đã thêm cư dân');
  }

  public function edit(Resident $resident) {
    return Inertia::render('Residents/Edit', ['resident'=>$resident]);
  }

  public function update(Request $request, Resident $resident) {
    $data = $request->validate([
      'name' => ['required','string','max:255'],
      'cccd' => ['required','string','max:50', Rule::unique('residents','cccd')->ignore($resident->id)],
      'phone'=> ['nullable','string','max:30'],
      'email'=> ['nullable','email'],
      'apartment_id'=> ['nullable','integer'],
      'status'=> ['required', Rule::in(['dang_o','tam_vang','chuyen_di'])],
      'note'  => ['nullable','string']
    ]);

    // Nếu chuyển sang "chuyen_di" kiểm tra điều kiện (simplified)
    if (($resident->status !== 'chuyen_di') && $data['status']==='chuyen_di' && !$resident->canMoveOut()) {
      return back()->withErrors(['status'=>'Không thể chuyển đi do còn ràng buộc.']);
    }

    $resident->update($data);
    return redirect()->route('residents.index')->with('success','Đã cập nhật cư dân');
  }

  public function destroy(Resident $resident) {
    $resident->delete();
    return redirect()->route('residents.index')->with('success','Đã xóa cư dân');
  }
}
