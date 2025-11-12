import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ staff }) {
  const [preview, setPreview] = useState(
    staff?.avatar_path ? `/storage/${staff.avatar_path}` : null
  );

  const { data, setData, post, processing, errors, progress } = useForm({
    _method: 'put',
    name: staff?.name ?? '',
    email: staff?.email ?? '',
    phone: staff?.phone ?? '',
    position: staff?.position ?? '',
    department: staff?.department ?? '',
    note: staff?.note ?? '',
    avatar: null, // file mới (nếu chọn)
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    setData('avatar', file ?? null);
    setPreview(file ? URL.createObjectURL(file) : preview);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('staff.update', staff.id), {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  return (
    <>
      <Head title={`Sửa nhân sự: ${staff?.name ?? ''}`} />

      {/* HERO */}
      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2400&auto=format&fit=crop"
          alt=""
          className="h-48 w-full object-cover md:h-60"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-white">Edit Staff</h1>
            <p className="mt-1 text-white/80 max-w-xl text-sm">
              Cập nhật thông tin nhân sự và ảnh đại diện.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="bg-slate-50 min-h-[calc(100vh-12rem)]">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="mx-auto max-w-4xl rounded-2xl border bg-white shadow-sm p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Chỉnh sửa thông tin nhân sự
              </h2>
              <Link
                href={route('staff.index')}
                className="text-sm text-slate-500 hover:text-indigo-600"
              >
                ← Quay lại danh sách
              </Link>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Avatar */}
              <div className="md:col-span-1">
                <div className="rounded-xl border bg-slate-50 p-4 text-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Avatar preview"
                      className="mx-auto h-36 w-36 rounded-full border-2 border-slate-200 object-cover"
                    />
                  ) : (
                    <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-2 border-dashed border-slate-300 text-slate-400">
                      No Avatar
                    </div>
                  )}

                  <label className="mt-4 inline-block cursor-pointer rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    Chọn ảnh
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>

                  {progress && (
                    <p className="mt-2 text-xs text-slate-500">
                      Uploading: {progress.percentage}%
                    </p>
                  )}

                  {errors.avatar && (
                    <p className="mt-2 text-sm text-red-600">{errors.avatar}</p>
                  )}
                </div>
              </div>

              {/* Fields */}
              <div className="md:col-span-2 grid grid-cols-1 gap-4">
                <Field
                  label="Họ và tên"
                  value={data.name}
                  onChange={(v) => setData('name', v)}
                  error={errors.name}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={(v) => setData('email', v)}
                    error={errors.email}
                    placeholder="email@company.com"
                  />
                  <Field
                    label="Số điện thoại"
                    value={data.phone}
                    onChange={(v) => setData('phone', v)}
                    error={errors.phone}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    label="Chức vụ"
                    value={data.position}
                    onChange={(v) => setData('position', v)}
                    error={errors.position}
                    placeholder="VD: Kế toán, Bảo vệ…"
                  />
                  <Field
                    label="Phòng ban"
                    value={data.department}
                    onChange={(v) => setData('department', v)}
                    error={errors.department}
                    placeholder="VD: Hành chính, Tài chính…"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-700">Ghi chú</label>
                  <textarea
                    rows={3}
                    value={data.note}
                    onChange={(e) => setData('note', e.target.value)}
                    className="mt-1 w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Ghi chú thêm"
                  />
                  {errors.note && (
                    <p className="mt-1 text-sm text-red-600">{errors.note}</p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <Link
                    href={route('staff.index')}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Trở lại
                  </Link>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-70"
                  >
                    {processing ? 'Đang lưu…' : 'Cập nhật'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ label, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div>
      <label className="block text-sm text-slate-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
