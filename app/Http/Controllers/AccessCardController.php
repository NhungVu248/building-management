<?php

// AccessCardController (rút gọn)
namespace App\Http\Controllers;

use App\Models\AccessCard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccessCardController extends Controller
{
    public function index() {
        return Inertia::render('AccessCards/Index', [
            'items' => AccessCard::latest()->paginate(15)
        ]);
    }
    public function create() { return Inertia::render('AccessCards/Form'); }
    public function store(Request $r) {
        $data = $r->validate([
            'code'=>'required|unique:access_cards,code',
            'holder_name'=>'required',
            'type'=>'required|in:resident,guest,staff',
            'status'=>'in:active,suspended,expired',
            'valid_from'=>'nullable|date','valid_to'=>'nullable|date'
        ]);
        AccessCard::create($data);
        return redirect()->route('access-cards.index');
    }
    public function edit(AccessCard $access_card) {
        return Inertia::render('AccessCards/Form', ['item'=>$access_card]);
    }
    public function update(Request $r, AccessCard $access_card) {
        $data = $r->validate([
            'code'=>'required|unique:access_cards,code,'.$access_card->id,
            'holder_name'=>'required',
            'type'=>'required|in:resident,guest,staff',
            'status'=>'required|in:active,suspended,expired',
            'valid_from'=>'nullable|date','valid_to'=>'nullable|date'
        ]);
        $access_card->update($data);
        return redirect()->route('access-cards.index');
    }
    public function destroy(AccessCard $access_card) {
        $access_card->delete();
        return redirect()->route('access-cards.index');
    }
    public function show(AccessCard $access_card)
    {
        return Inertia::render('AccessCards/Show', [
            'card' => $access_card,
            'logs' => $access_card->logs()->latest()->get(),
        ]);
    }
}
