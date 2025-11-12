import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = '',
}) {
  const { auth } = usePage().props;
  const user = auth.user;

  const [preview, setPreview] = useState(
    user.avatar ? `/storage/${user.avatar}` : null
  );

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name || '',
    email: user.email || '',
    avatar: null,
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData('avatar', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    patch(route('profile.update'), { forceFormData: true });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
        <p className="mt-1 text-sm text-gray-600">
          Update your account's profile information, email, and avatar.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        {/* Avatar upload */}
        <div>
          <InputLabel htmlFor="avatar" value="Avatar" />
          <div className="mt-2 flex items-center gap-4">
            <img
              src={
                preview ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=random`
              }
              alt="avatar"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-indigo-300"
            />
            <label
              htmlFor="avatar"
              className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Choose Image
              <input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <InputError className="mt-2" message={errors.avatar} />
        </div>

        {/* Name */}
        <div>
          <InputLabel htmlFor="name" value="Full Name" />
          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            autoComplete="name"
          />
          <InputError className="mt-2" message={errors.name} />
        </div>

        {/* Email */}
        <div>
          <InputLabel htmlFor="email" value="Email Address" />
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
            autoComplete="username"
          />
          <InputError className="mt-2" message={errors.email} />
        </div>

        {/* Verify email */}
        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-gray-800">
              Your email address is unverified.{' '}
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Click here to re-send verification email.
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <div className="mt-2 text-sm font-medium text-green-600">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-green-600">Saved successfully.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
