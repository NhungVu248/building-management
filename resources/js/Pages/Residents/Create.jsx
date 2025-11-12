import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    cccd: '',
    phone: '',
    email: '',
    apartment_id: '',
    status: 'dang_o',
    note: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('residents.store'));
  };

  return (
    <>
      <Head title="Thêm cư dân" />

      {/* HERO giống banner đầu trang trong ảnh */}
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
              Add New Resident
            </h1>
            <p className="mt-1 text-white/80 max-w-xl text-sm">
              Điền thông tin cư dân và lưu lại để quản lý cư trú trong toà nhà.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="bg-slate-50 min-h-[calc(100vh-12rem)]">
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Card form trắng bo góc */}
          <div className="mx-auto max-w-3xl rounded-2xl border bg-white shadow-sm p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Thêm cư dân mới</h2>
              <Link
                href={route('residents.index')}
                className="text-sm text-slate-500 hover:text-indigo-600"
              >
                ← Quay lại danh sách
              </Link>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 gap-4">
              <Field
                label="Họ tên"
                value={data.name}
                onChange={(v) => setData('name', v)}
                error={errors.name}
              />
              <Field
                label="CCCD"
                value={data.cccd}
                onChange={(v) => setData('cccd', v)}
                error={errors.cccd}
              />
              <Field
                label="Điện thoại"
                value={data.phone}
                onChange={(v) => setData('phone', v)}
                error={errors.phone}
              />
              <Field
                label="Email"
                type="email"
                value={data.email}
                onChange={(v) => setData('email', v)}
                error={errors.email}
              />

              {/* Nếu đã có danh sách căn hộ, thay input này bằng <select> options */}
              <Field
                label="Căn hộ (apartment_id)"
                value={data.apartment_id}
                onChange={(v) => setData('apartment_id', v)}
                error={errors.apartment_id}
                placeholder="VD: 101 hoặc ID căn hộ"
              />

              <div>
                <label className="block text-sm text-slate-700">Trạng thái</label>
                <select
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  className="mt-1 w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="dang_o">Đang ở</option>
                  <option value="tam_vang">Tạm vắng</option>
                  <option value="chuyen_di">Chuyển đi</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-slate-700">Ghi chú</label>
                <textarea
                  rows="3"
                  value={data.note}
                  onChange={(e) => setData('note', e.target.value)}
                  className="mt-1 w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.note && (
                  <p className="mt-1 text-sm text-red-600">{errors.note}</p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Link
                  href={route('residents.index')}
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
        className="mt-1 w-full rounded-lg border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
