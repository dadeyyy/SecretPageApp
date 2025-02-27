import { logout, deleteAccount } from './logout/actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-50">
      <div className="text-black flex justify-center items-center gap-5 mb-10">
        <Link
          className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          href={'/secret/secret-page-1'}
        >
          Secret Page 1
        </Link>
        <Link
          className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          href={'/secret/secret-page-2'}
        >
          Secret Page 2
        </Link>
        <Link
          className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          href={'/secret/secret-page-3'}
        >
          Secret Page 3
        </Link>
      </div>
      <div className="w-full max-w-sm bg-white rounded-md shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-700 text-center mb-4">Welcome</h2>
        <form className="space-y-4">
          <button
            formAction={deleteAccount}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300"
          >
            Delete Account
          </button>
          <button
            formAction={logout}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          >
            Logout
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Hello, <span className="font-semibold">{data.user.email}</span>
        </p>
      </div>
    </div>
  );
}
