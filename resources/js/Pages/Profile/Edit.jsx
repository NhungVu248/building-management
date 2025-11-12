import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Profile
          </h2>
        </div>
      }
    >
      <Head title="Profile" />

      {/* Hero cover */}
      <div className="h-40 w-full bg-[url('https://images.unsplash.com/photo-1465804575741-338df8554e0b?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />

      <div className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Card: Profile info */}
          <div className="rounded-2xl border bg-white shadow-sm">
            <div className="px-6 py-5 border-b">
              <h3 className="text-lg font-semibold text-slate-800">
                Profile Information
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Update your account&apos;s profile information and email address.
              </p>
            </div>
            <div className="p-6">
              <UpdateProfileInformationForm
                mustVerifyEmail={mustVerifyEmail}
                status={status}
                className="max-w-xl"
              />
            </div>
          </div>

          {/* 2-column: Password + Danger zone */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border bg-white shadow-sm">
              <div className="px-6 py-5 border-b">
                <h3 className="text-lg font-semibold text-slate-800">
                  Update Password
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Ensure your account is using a long, random password to stay secure.
                </p>
              </div>
              <div className="p-6">
                <UpdatePasswordForm className="max-w-xl" />
              </div>
            </div>

            <div className="rounded-2xl border bg-white shadow-sm">
              <div className="px-6 py-5 border-b">
                <h3 className="text-lg font-semibold text-red-600">
                  Delete Account
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Once your account is deleted, all of its resources and data will be permanently deleted.
                </p>
              </div>
              <div className="p-6">
                <DeleteUserForm className="max-w-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
