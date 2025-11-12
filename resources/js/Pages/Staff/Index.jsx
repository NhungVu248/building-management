import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Index({ staff, filters = {}, positions = [] }) {
  const [q, setQ] = useState(filters?.q ?? '');
  const [status, setStatus] = useState(filters?.status ?? '');
  const [position, setPosition] = useState(filters?.position ?? '');

  // Debounce cho tìm kiếm theo q
  useEffect(() => {
    const t = setTimeout(() => {
      router.get(
        route('staff.index'),
        { q, status, position },
        { preserveState: true, replace: true }
      );
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const applyFilter = (next) => {
    router.get(route('staff.index'), next, { preserveState: true, replace: true });
  };

  const Badge = ({ s }) => (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
      ${s === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'}`}
    >
      {s === 'active' ? 'Đang làm' : 'Nghỉ'}
    </span>
  );

  return (
    <>
      <Head title="Nhân viên" />

      {/* HERO */}
      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2400&auto=format&fit=crop"
          alt=""
          className="h-48 w-full object-cover md:h-60"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-6xl px-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-white">Operations Team</h1>
            <p className="mt-1 text-white/80 max-w-xl text-sm">
              Quản lý nhân sự vận hành tòa nhà: trạng thái làm việc, chức vụ, liên hệ.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="min-h-[calc(100vh-12rem)] bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl space-y-4">
          {/* Action bar + Filters */}
          <div className="rounded-2xl border bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-5">
              <div className="sm:col-span-2">
                <label className="block text-sm text-slate-600">Tìm kiếm</label>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Tên, email hoặc số điện thoại…"
                  className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm text-slate-600">Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => {
                    const v = e.target.value;
                    setStatus(v);
                    applyFilter({ q, status: v, position });
                  }}
                  className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Tất cả</option>
                  <option value="active">Đang làm</option>
                  <option value="inactive">Nghỉ</option>
                </select>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm text-slate-600">Chức vụ</label>
                <select
                  value={position}
                  onChange={(e) => {
                    const v = e.target.value;
                    setPosition(v);
                    applyFilter({ q, status, position: v });
                  }}
                  className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Tất cả</option>
                  {positions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-1 flex items-end justify-end">
                <Link
                  href={route('staff.create')}
                  className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                >
                  + Thêm nhân viên
                </Link>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl bg-white shadow overflow-hidden">
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
                      <td className="px-4 py-3">
                        <Badge s={s.status} />
                      </td>
                      <td className="px-4 py-3 text-right space-x-3">
                        <Link
                          href={route('staff.edit', s.id)}
                          className="text-indigo-600 hover:underline"
                        >
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
