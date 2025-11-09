<?php

// app/Listeners/LogAuthEvents.php
namespace App\Listeners;

use App\Models\AuditLog;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Auth\Events\Failed;

class LogAuthEvents
{
    public function handle($event): void
    {
        if ($event instanceof Login) {
            AuditLog::create([
                'user_id'   => $event->user->id ?? null,
                'action'    => 'login_success',
                'ip'        => request()->ip(),
                'user_agent'=> request()->userAgent(),
                'meta'      => ['email' => $event->user->email ?? null],
            ]);
        } elseif ($event instanceof Logout) {
            AuditLog::create([
                'user_id'   => $event->user->id ?? null,
                'action'    => 'logout',
                'ip'        => request()->ip(),
                'user_agent'=> request()->userAgent(),
            ]);
        } elseif ($event instanceof Failed) {
            AuditLog::create([
                'user_id'   => null,
                'action'    => 'login_failed',
                'ip'        => request()->ip(),
                'user_agent'=> request()->userAgent(),
                'meta'      => ['email' => $event->credentials['email'] ?? null],
            ]);
        }
    }
}
