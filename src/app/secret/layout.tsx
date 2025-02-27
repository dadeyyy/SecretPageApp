import Link from 'next/link';
import { logout, deleteAccount } from '../logout/actions';

export default function SecretLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link className="text-lg font-semibold text-gray-800" href={'/'}>
            Secret App
          </Link>
          <div className="flex space-x-4">
            <Link href={'/login'} className="text-white font-medium px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600">
              Login
            </Link>
            <Link
              href={'/signup'}
              className="text-white font-medium px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
            >
              Signup
            </Link>
            <form className="flex space-x-2">
              <button
                formAction={logout}
                className="text-white bg-blue-500 font-medium px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
              >
                Logout
              </button>
              <button
                formAction={deleteAccount}
                className="text-white bg-red-500 font-medium px-4 py-2 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300"
              >
                Delete Account
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">{children}</div>
    </div>
  );
}
