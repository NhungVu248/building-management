<?php

namespace App\Http\Controllers;

use App\Http\Requests\SecurityIncidentRequest;
use App\Models\SecurityIncident;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SecurityIncidentController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'q'        => $request->string('q')->toString(),
            'status'   => $request->string('status')->toString(),
            'severity' => $request->string('severity')->toString(),
        ];

        $query = SecurityIncident::query()
            ->when($filters['q'], function ($q) use ($filters) {
                $q->where(function ($sub) use ($filters) {
                    $sub->where('title', 'like', '%'.$filters['q'].'%')
                        ->orWhere('description', 'like', '%'.$filters['q'].'%')
                        ->orWhere('reported_by', 'like', '%'.$filters['q'].'%')
                        ->orWhere('location', 'like', '%'.$filters['q'].'%');
                });
            })
            ->when($filters['status'], fn($q) => $q->where('status', $filters['status']))
            ->when($filters['severity'], fn($q) => $q->where('severity', $filters['severity']))
            ->latest();

        $incidents = $query->paginate(10)->withQueryString();

        return Inertia::render('Security/Index', [
            'incidents' => $incidents,
            'filters'   => $filters,
            'meta'      => [
                'STATUSES'   => SecurityIncident::STATUSES,
                'SEVERITIES' => SecurityIncident::SEVERITIES,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Security/Create', [
            'meta' => [
                'STATUSES'   => SecurityIncident::STATUSES,
                'SEVERITIES' => SecurityIncident::SEVERITIES,
            ],
        ]);
    }

    public function store(SecurityIncidentRequest $request)
    {
        SecurityIncident::create($request->validated());

        return redirect()
            ->route('security.index')
            ->with('success', 'Đã tạo sự cố an ninh.');
    }

    public function show(SecurityIncident $security)
    {
        return Inertia::render('Security/Show', [
            'incident' => $security,
        ]);
    }

    public function edit(SecurityIncident $security)
    {
        return Inertia::render('Security/Edit', [
            'incident' => $security,
            'meta'     => [
                'STATUSES'   => SecurityIncident::STATUSES,
                'SEVERITIES' => SecurityIncident::SEVERITIES,
            ],
        ]);
    }

    public function update(SecurityIncidentRequest $request, SecurityIncident $security)
    {
        $security->update($request->validated());

        return redirect()
            ->route('security.index')
            ->with('success', 'Đã cập nhật sự cố.');
    }

    public function destroy(SecurityIncident $security)
    {
        $security->delete();

        return redirect()
            ->route('security.index')
            ->with('success', 'Đã xóa (soft delete) sự cố.');
    }
}
