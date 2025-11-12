import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verify Email" />

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-10">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Verify Your Email Address
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Thanks for signing up! Before getting started, please verify your email 
                        by clicking on the link we’ve just sent to your inbox.
                        <br />
                        If you didn’t receive it, you can request another one below.
                    </p>

                    {status === 'verification-link-sent' && (
                        <div className="mb-6 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg">
                            A new verification link has been sent to the email address
                            you provided during registration.
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4">
                            <PrimaryButton
                                className="w-full justify-center py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition duration-200"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Sending...'
                                    : 'Resend Verification Email'}
                            </PrimaryButton>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full py-3 rounded-lg text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition font-medium"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>

                <div className="text-center mt-6 text-gray-500 text-sm">
                    Need help?{' '}
                    <a
                        href="mailto:support@yourcompany.com"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </GuestLayout>
    );
}
