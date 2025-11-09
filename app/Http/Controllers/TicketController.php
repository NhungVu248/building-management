<?php

namespace App\Http\Controllers;

use App\Models\{Ticket, Resident};
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
  public function index() {
    $tickets = Ticket::with('resident')->orderByDesc('id')->paginate(10);
    return Inertia::render('Tickets/Index', ['tickets'=>$tickets]);
  }

  public function create() {
    return Inertia::render('Tickets/Create', [
      'residents'=> Resident::orderBy('name')->get()
    ]);
  }

  public function store(Request $request) {
    $data = $request->validate([
      'subject' => 'required|string|max:255',
      'description' => 'nullable|string',
      'priority' => 'required|in:low,medium,high',
      'resident_id' => 'nullable|exists:residents,id',
    ]);
    Ticket::create($data + ['status'=>'open']);
    return redirect()->route('tickets.index')->with('success','Đã tạo ticket');
  }

  public function edit(Ticket $ticket) {
    return Inertia::render('Tickets/Edit', [
      'ticket'=>$ticket,
      'residents'=> Resident::orderBy('name')->get()
    ]);
  }

  public function update(Request $request, Ticket $ticket) {
    $data = $request->validate([
      'subject' => 'required|string|max:255',
      'description' => 'nullable|string',
      'priority' => 'required|in:low,medium,high',
      'status' => 'required|in:open,in_progress,resolved,closed',
      'resident_id' => 'nullable|exists:residents,id',
    ]);
    $ticket->update($data);
    return redirect()->route('tickets.index')->with('success','Đã cập nhật ticket');
  }

  public function updateStatus(Request $request, Ticket $ticket) {
    $request->validate(['status'=>'required|in:open,in_progress,resolved,closed']);
    $ticket->update(['status'=>$request->status]);
    return back()->with('success','Đã đổi trạng thái');
  }

  public function destroy(Ticket $ticket) {
    $ticket->delete();
    return redirect()->route('tickets.index')->with('success','Đã xóa ticket');
  }
}
