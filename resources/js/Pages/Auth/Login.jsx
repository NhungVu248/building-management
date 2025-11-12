import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('login'), { onFinish: () => reset('password') });
  };

  return (
    <>
      <Head title="Log in" />

      <div className="min-h-screen relative">
        {/* Background */}
        <img
          src="https://images.unsplash.com/photo-1465804575741-338df8554e0b?q=80&w=2400&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md">
            {/* App title */}
            <div className="text-center mb-6">
              <h1 className="text-white text-4xl font-semibold tracking-[0.3em]">INNOPPL</h1>
            </div>

            {/* Status */}
            {status && (
              <div className="mb-4 text-sm font-medium text-emerald-200 text-center">
                {status}
              </div>
            )}

            {/* Form */}
            <form onSubmit={submit} className="space-y-4">
              {/* Email */}
              <label className="block">
                <div className="flex items-center border border-white/60 rounded-md bg-white/10">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    autoComplete="username"
                    placeholder="USERNAME / EMAIL"
                    className="w-full bg-transparent px-4 py-3 text-white placeholder-white/80 outline-none"
                    onChange={(e) => setData('email', e.target.value)}
                    autoFocus
                  />
                  <span className="px-3 text-white/90">👤</span>
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-200">{errors.email}</p>
                )}
              </label>

              {/* Password */}
              <label className="block">
                <div className="flex items-center border border-white/60 rounded-md bg-white/10">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    autoComplete="current-password"
                    placeholder="PASSWORD"
                    className="w-full bg-transparent px-4 py-3 text-white placeholder-white/80 outline-none"
                    onChange={(e) => setData('password', e.target.value)}
                  />
                  <span className="px-3 text-white/90">🔑</span>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-200">{errors.password}</p>
                )}
              </label>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-white/90 text-sm">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                    className="rounded border-white/60 bg-transparent"
                  />
                  <span>Remember me</span>
                </label>

                {canResetPassword && route().has('password.request') && (
                  <Link
                    href={route('password.request')}
                    className="underline hover:text-white"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-white text-slate-900 font-semibold py-3 rounded-md hover:shadow-md transition disabled:opacity-70"
              >
                {processing ? 'Signing in…' : 'SIGN IN'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
