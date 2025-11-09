<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
  public function index() {
    return Inertia::render('Announcements/Index', [
      'announcements'=> Announcement::orderByDesc('id')->paginate(10)
    ]);
  }

  public function create() {
    return Inertia::render('Announcements/Create');
  }

  public function store(Request $request) {
    $data = $request->validate([
      'title' => 'required|string|max:255',
      'content' => 'required|string',
      'channel' => 'required|in:app,email,sms,all',
      'scheduled_at' => 'nullable|date'
    ]);
    Announcement::create($data);

    // GĐ4: mock “gửi” ngay trong hệ thống (ghi bản ghi). Tích hợp Email/SMS sẽ làm ở nâng cao.
    return redirect()->route('announcements.index')->with('success','Đã tạo thông báo');
  }

  public function destroy(Announcement $announcement) {
    $announcement->delete();
    return redirect()->route('announcements.index')->with('success','Đã xóa thông báo');
  }
}
