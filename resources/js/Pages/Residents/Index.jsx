import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Index({ residents, filters = {}, stats }) {
  const { flash } = usePage().props;
  const [q, setQ] = useState(filters.q ?? '');

  // Nếu controller có truyền filters.q thì bật tìm kiếm (debounce)
  useEffect(() => {
    if (filters.q === undefined) return;
    const t = setTimeout(() => {
      router.get(route('residents.index'), { q }, { preserveState: true, replace: true });
    }, 350);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <>
      <Head title="Quản lý cư dân" />

      {/* HERO */}
      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1465804575741-338df8554e0b?q=80&w=2400&auto=format&fit=crop"
          alt=""
          className="h-48 w-full object-cover md:h-60"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-white">
              Residents
            </h1>
            <p className="mt-1 text-white/80 max-w-xl text-sm">
              Quản lý thông tin cư dân, trạng thái lưu trú và liên hệ.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="bg-slate-50 min-h-[calc(100vh-12rem)]">
        <div className="mx-auto max-w-7xl px-4 py-6 space-y-4">

          {/* Flash */}
          {flash?.success && (
            <div className="rounded-lg bg-green-100 px-4 py-2 text-green-700">
              {flash.success}
            </div>
          )}

          {/* Thanh hành động + (tuỳ) ô tìm kiếm */}
          <div className="rounded-2xl border bg-white p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Link
              href={route('residents.create')}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              + Thêm cư dân
            </Link>

            {/* Chỉ hiển thị khi controller có truyền filters.q */}
            {filters.q !== undefined && (
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm tên, email hoặc SĐT…"
                className="w-full md:w-80 rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            )}
          </div>

          {/* Bảng */}
          <div className="rounded-2xl bg-white shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-left text-slate-600">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Tên</th>
                    <th className="px-4 py-3">CCCD</th>
                    <th className="px-4 py-3">Điện thoại</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3">Ghi chú</th>
                    <th className="px-4 py-3 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {residents.data.length === 0 && (
                    <tr>
                      <td colSpan="8" className="px-4 py-6 text-center text-slate-500">
                        Chưa có cư dân nào.
                      </td>
                    </tr>
                  )}

                  {residents.data.map((r) => (
                    <tr key={r.id} className="border-t">
                      <td className="px-4 py-3">{r.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{r.name}</td>
                      <td className="px-4 py-3">{r.cccd}</td>
                      <td className="px-4 py-3">{r.phone || '—'}</td>
                      <td className="px-4 py-3">{r.email || '—'}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium
                          ${r.status === 'dang_o'
                            ? 'bg-green-100 text-green-700'
                            : r.status === 'tam_vang'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-200 text-slate-700'}`}
                        >
                          {r.status === 'dang_o'
                            ? 'Đang ở'
                            : r.status === 'tam_vang'
                            ? 'Tạm vắng'
                            : 'Chuyển đi'}
                        </span>
                      </td>
                      <td className="px-4 py-3">{r.note || '—'}</td>
                      <td className="px-4 py-3 text-right space-x-3">
                        <Link
                          href={route('residents.edit', r.id)}
                          className="text-indigo-600 hover:underline"
                        >
                          Sửa
                        </Link>
                        <Link
                          as="button"
                          method="delete"
                          href={route('residents.destroy', r.id)}
                          className="text-red-600 hover:underline"
                          onBefore={() => confirm('Xóa cư dân này?')}
                        >
                          Xóa
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination (dùng residents.links của Laravel paginator) */}
            {residents.links && (
              <nav className="flex justify-center border-t bg-white px-4 py-3">
                <ul className="inline-flex items-center gap-1">
                  {residents.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.url || '#'}
                        className={`min-w-9 px-3 py-1.5 rounded-lg border text-sm
                          ${!link.url ? 'pointer-events-none opacity-50' : ''}
                          ${link.active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700'}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
