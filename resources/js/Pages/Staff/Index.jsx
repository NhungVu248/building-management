import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

export default function Index({ staff, filters, positions }) {
  const [q, setQ] = useState(filters?.q ?? '');
  const [status, setStatus] = useState(filters?.status ?? '');
  const [position, setPosition] = useState(filters?.position ?? '');

  // debounce tìm kiếm
  useEffect(() => {
    const t = setTimeout(() => {
      router.get(route('staff.index'), { q, status, position }, { preserveState: true, replace: true });
    }, 400);
    return () => clearTimeout(t);
  }, [q]);

  // thay filter select gọi ngay
  const applyFilter = (next) => {
    router.get(route('staff.index'), next, { preserveState: true, replace: true });
  };

  const badge = (s) => (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
      ${s === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'}`}>
      {s === 'active' ? 'Đang làm' : 'Nghỉ'}
    </span>
  );

  return (
    <>
      <Head title="Nhân viên" />
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl space-y-4">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-800">Nhân viên</h1>
            <Link
              href={route('staff.create')}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              + Thêm nhân viên
            </Link>
          </div>

          {/* Filters */}
          <div className="rounded-2xl border bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <label className="block text-sm text-slate-600">Tìm kiếm</label>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Tên, email hoặc số điện thoại…"
                  className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600">Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    applyFilter({ q, status: e.target.value, position });
                  }}
                  className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Tất cả</option>
                  <option value="active">Đang làm</option>
                  <option value="inactive">Nghỉ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-600">Chức vụ</label>
                <select
                  value={position}
                  onChange={(e) => {
                    setPosition(e.target.value);
                    applyFilter({ q, status, position: e.target.value });
                  }}
                  className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Tất cả</option>
                  {positions?.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl bg-white shadow p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-left text-slate-600">
                    <th className="px-4 py-3">Tên</th>
                    <th className="px-4 py-3">Chức vụ</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Điện thoại</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.data.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-4 py-6 text-center text-slate-500">
                        Không có dữ liệu.
                      </td>
                    </tr>
                  )}

                  {staff.data.map((s) => (
                    <tr key={s.id} className="border-t">
                      <td className="px-4 py-3 font-medium text-slate-800">{s.name}</td>
                      <td className="px-4 py-3">{s.position ?? '-'}</td>
                      <td className="px-4 py-3">{s.email ?? '-'}</td>
                      <td className="px-4 py-3">{s.phone ?? '-'}</td>
                      <td className="px-4 py-3">{badge(s.status)}</td>
                      <td className="px-4 py-3 text-right space-x-3">
                        <Link href={route('staff.edit', s.id)} className="text-indigo-600 hover:underline">
                          Sửa
                        </Link>
                        <Link
                          href={route('staff.destroy', s.id)}
                          method="delete"
                          as="button"
                          className="text-red-600 hover:underline"
                          onBefore={() => confirm('Xóa nhân viên này?')}
                        >
                          Xóa
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination meta={staff} />
          </div>
        </div>
      </div>
    </>
  );
}

function Pagination({ meta }) {
  const canPrev = meta.prev_page_url !== null;
  const canNext = meta.next_page_url !== null;

  const goto = (url) => {
    if (!url) return;
    router.visit(url, { preserveState: true, replace: true });
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
      <div className="text-sm text-slate-600">
        Trang {meta.current_page}/{meta.last_page} • Tổng {meta.total}
      </div>
      <div className="space-x-2">
        <button
          onClick={() => goto(meta.prev_page_url)}
          disabled={!canPrev}
          className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50"
        >
          ← Trước
        </button>
        <button
          onClick={() => goto(meta.next_page_url)}
          disabled={!canNext}
          className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50"
        >
          Sau →
        </button>
      </div>
    </div>
  );
}
