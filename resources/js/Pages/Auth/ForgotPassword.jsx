import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-10">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                        Forgot Your Password?
                    </h2>
                    <p className="text-gray-500 text-center text-sm mb-6">
                        No worries! Enter your email address below, and we’ll send you a link to reset your password.
                    </p>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center bg-green-50 rounded-lg p-3">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email Address
                            </label>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="you@example.com"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-6">
                            <PrimaryButton
                                className="w-full justify-center py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition duration-200"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Sending...'
                                    : 'Send Password Reset Link'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>

                <div className="text-center mt-6 text-gray-500 text-sm">
                    Remembered your password?{' '}
                    <a
                        href={route('login')}
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Back to Login
                    </a>
                </div>
            </div>
        </GuestLayout>
    );
}
