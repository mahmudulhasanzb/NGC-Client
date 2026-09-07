'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    const toastId = toast.loading('Verifying credentials...');
    try {
      const { data: response, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe ?? true,
        callbackURL: '/dashboard',
      });

      if (error) {
        toast.error(
          error.message ||
            'Login failed. Please check your email and password.',
          {
            id: toastId,
          },
        );
        return;
      }

      toast.success('Login successful!', {
        id: toastId,
      });
      router.push('/dashboard');
      router.refresh();
    } catch {
      toast.error('An unexpected login error occurred. Please try again.', {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      {/* Return to Home Link */}
      <div className="mx-auto mb-6 w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary sm:text-sm cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="mx-auto w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-xl shadow-primary/5 sm:p-10">
        {/* College Brand Logo & Title */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center">
            <img
              src="https://i.ibb.co.com/k64hgYN2/school-removebg-preview.png"
              alt="Nabiganj Government College Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <h1 className="mt-3 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome Back
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Sign in to access your Nabiganj Govt. College account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-foreground sm:text-sm"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
                className={`h-11 w-full rounded-xl border bg-[#f8fcff] pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground shadow-2xs focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-destructive focus:ring-destructive/20'
                    : 'border-border focus:border-primary focus:ring-primary/20'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] font-medium text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-foreground sm:text-sm"
              >
                Password
              </label>
             
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className={`h-11 w-full rounded-xl border bg-[#f8fcff] pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground shadow-2xs focus:outline-none focus:ring-2 transition-all ${
                  errors.password
                    ? 'border-destructive focus:ring-destructive/20'
                    : 'border-border focus:border-primary focus:ring-primary/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] font-medium text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center pt-1">
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer sm:text-sm">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
              />
              <span>Remember me on this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-60 cursor-pointer active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
