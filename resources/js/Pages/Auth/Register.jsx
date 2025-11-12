import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <>
      <Head title="Register" />

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
          <div className="w-full max-w-md space-y-4">
            <h1 className="text-center text-white text-3xl md:text-4xl font-semibold tracking-wide">
              Create account
            </h1>

            <form onSubmit={submit} className="space-y-3">
              {/* Name */}
              <label className="block">
                <div className="flex items-center border border-white/60 rounded-md bg-white/10">
                  <input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="FULL NAME"
                    autoComplete="name"
                    className="w-full bg-transparent px-4 py-3 text-white placeholder-white/80 outline-none"
                    required
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-200">{errors.name}</p>
                )}
              </label>

              {/* Email */}
              <label className="block">
                <div className="flex items-center border border-white/60 rounded-md bg-white/10">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="EMAIL"
                    autoComplete="username"
                    className="w-full bg-transparent px-4 py-3 text-white placeholder-white/80 outline-none"
                    required
                  />
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
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="PASSWORD"
                    autoComplete="new-password"
                    className="w-full bg-transparent px-4 py-3 text-white placeholder-white/80 outline-none"
                    required
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-200">{errors.password}</p>
                )}
              </label>

              {/* Confirm Password */}
              <label className="block">
                <div className="flex items-center border border-white/60 rounded-md bg-white/10">
                  <input
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) =>
                      setData('password_confirmation', e.target.value)
                    }
                    placeholder="CONFIRM PASSWORD"
                    autoComplete="new-password"
                    className="w-full bg-transparent px-4 py-3 text-white placeholder-white/80 outline-none"
                    required
                  />
                </div>
                {errors.password_confirmation && (
                  <p className="mt-1 text-sm text-red-200">
                    {errors.password_confirmation}
                  </p>
                )}
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-white text-slate-900 font-semibold py-3 rounded-md hover:shadow-md transition disabled:opacity-70"
              >
                {processing ? 'Creating…' : 'Sign up'}
              </button>
            </form>

            <p className="text-center text-white/90">
              Already registered?{' '}
              <Link href={route('login')} className="underline hover:text-white">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
