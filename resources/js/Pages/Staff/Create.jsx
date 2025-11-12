import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Create() {
  const [preview, setPreview] = useState(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    avatar: null,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('staff.store'), {
      forceFormData: true,
      onSuccess: () => {
        setPreview(null);
        reset('avatar');
      },
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    setData('avatar', file ?? null);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <>
      <Head title="Thêm nhân viên" />

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
            <h1 className="text-2xl md:text-3xl font-semibold text-white">Add Staff</h1>
            <p className="mt-1 text-white/80 max-w-xl text-sm">
              Nhập thông tin nhân sự và tải ảnh đại diện.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="bg-slate-50 min-h-[calc(100vh-12rem)]">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-white shadow-sm p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Thêm nhân sự mới</h2>
              <Link
                href={route('staff.index')}
                className="text-sm text-slate-500 hover:text-indigo-600"
              >
                ← Quay lại danh sách
              </Link>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 gap-4">
              {/* Họ tên */}
              <Field
                label="Họ tên"
                value={data.name}
                onChange={(v) => setData('name', v)}
                error={errors.name}
              />

              {/* Email */}
              <Field
                label="Email"
                type="email"
                value={data.email}
                onChange={(v) => setData('email', v)}
                error={errors.email}
                placeholder="email@company.com"
              />

              {/* Số điện thoại */}
              <Field
                label="Số điện thoại"
                value={data.phone}
                onChange={(v) => setData('phone', v)}
                error={errors.phone}
              />

              {/* Chức vụ */}
              <Field
                label="Chức vụ"
                value={data.position}
                onChange={(v) => setData('position', v)}
                error={errors.position}
                placeholder="VD: Kế toán, Bảo vệ, Kỹ thuật…"
              />

              {/* Phòng ban */}
              <Field
                label="Phòng ban"
                value={data.department}
                onChange={(v) => setData('department', v)}
                error={errors.department}
                placeholder="VD: Hành chính, Tài chính, Bảo trì…"
              />

              {/* Avatar upload */}
              <div>
                <label className="block text-sm text-slate-700">Ảnh đại diện</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="mt-1 block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
                />
                {errors.avatar && (
                  <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>
                )}

                {preview && (
                  <div className="mt-3 flex flex-col items-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-[120px] w-[120px] rounded-full border-2 border-slate-200 object-cover"
                    />
                    <p className="mt-1 text-xs text-slate-500">Ảnh xem trước</p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Link
                  href={route('staff.index')}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Hủy
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-70"
                >
                  {processing ? 'Đang lưu…' : 'Lưu'}
                </button>
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
