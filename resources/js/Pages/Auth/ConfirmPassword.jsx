import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-10">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                        Confirm Your Password
                    </h2>
                    <p className="text-gray-500 text-center text-sm mb-6">
                        This is a secure area of the application. Please confirm your
                        password before continuing.
                    </p>

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your password"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-6">
                            <PrimaryButton
                                className="w-full justify-center py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition duration-200"
                                disabled={processing}
                            >
                                {processing ? 'Confirming...' : 'Confirm Password'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>

                <div className="text-center mt-6 text-gray-500 text-sm">
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
