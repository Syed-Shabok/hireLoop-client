"use client";

import Link from "next/link";
import { useState } from "react";
import { Person, Envelope, Lock, ArrowRight } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    const plan = role === "seeker" ? "seeker_free" : "recruiter_free";

    try {
      const result = await signUp.email({
        name,
        email,
        password,
        role,
        plan,
      });

      console.log("Signup Success:", result);

      // Example:
      router.push(redirectUrl);
    } catch (error) {
      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_60%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-10 flex justify-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500">
                <span className="text-xl font-bold text-white">H</span>
              </div>

              <div>
                <h1 className="text-xl font-bold">Hiring</h1>
                <h1 className="text-xl font-bold">Loop</h1>
              </div>
            </Link>
          </div>

          {/* Signup Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold">Create Account</h2>

              <p className="text-gray-400">
                Join thousands of professionals finding their dream jobs.
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Full Name
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4">
                  <Person className="h-5 w-5 text-gray-500" />

                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent py-4 outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4">
                  <Envelope className="h-5 w-5 text-gray-500" />

                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent py-4 outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4">
                  <Lock className="h-5 w-5 text-gray-500" />

                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent py-4 outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* User Type */}
              <div className="py-2 ">
                <RadioGroup
                  defaultValue="seeker"
                  name="plan-orientation"
                  orientation="horizontal"
                  onChange={(value) => setRole(value)}
                >
                  <Radio className="flex items-center" value="seeker">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label className="text-lg">Job Seeker</Label>
                    </Radio.Content>
                  </Radio>
                  <Radio className="flex items-center" value="recruiter">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label className="text-lg">Recruiter</Label>
                    </Radio.Content>
                  </Radio>
                </RadioGroup>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition-all duration-300 hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Create Account"}

                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="h-px flex-1 bg-white/10" />

              <span className="px-4 text-sm text-gray-500">OR</span>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google Signup */}
            <button
              type="button"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 font-medium transition-all duration-300 hover:bg-white/10"
            >
              Continue with Google
            </button>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                href={`/auth/signin?redirect=${redirectUrl}`}
                className="font-medium text-violet-400 hover:text-violet-300"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs leading-relaxed text-gray-500">
            By creating an account, you agree to our{" "}
            <Link
              href="/terms"
              className="text-violet-400 hover:text-violet-300"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-violet-400 hover:text-violet-300"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
