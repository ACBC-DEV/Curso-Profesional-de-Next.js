import { useRef } from 'react';
import { useRouter } from 'next/router';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useAuth } from '@hooks/useAuth';
export default function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const auth = useAuth();
  const router = useRouter();
  const submitHanlder = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    auth.signIn(email, password).then(
      () => {
        auth.setError(false);
        router.push('/dashboard');
      },
      (reason) => {
        console.log('Login Failed');
        console.error(reason);
        auth.setError('Invalid Username or Password');
      }
    );
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="w-auto h-12 mx-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitHanlder}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  ref={emailRef}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
          {auth.error ? (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
              <span className="font-medium">Login Failed!</span> {auth.error}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
