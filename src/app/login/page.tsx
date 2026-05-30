"use client";

import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  Sparkles,
  TrendingUp,
  Target,
} from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {

      setError("");

      if (!email || !password) {
        setError("Please fill all fields.");
        return;
      }

      try {

        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({

          email,
          password,

        });

        if (error) {
          setError(error.message);
          return;
        }

        const pendingAssessment =
          localStorage.getItem(
            "pendingAssessment"
          );

        if (pendingAssessment) {
          router.push("/results");

        } else {
          router.push("/dashboard");
        }

      } catch (err) {

        setError("Something went wrong.");

      } finally {

        setLoading(false);

      }

    };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6 py-20">

        <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-2xl border border-zinc-200">

          {/* LEFT SIDE */}
          <div className="relative hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-16 text-white overflow-hidden">

            <div className="absolute inset-0 opacity-20 bg-[url('/career-bg.png')] bg-cover bg-center" />

            <div className="relative z-10">

              <h1 className="text-6xl font-extrabold leading-tight">
                Welcome
                <br />
                Back
              </h1>

              <p className="mt-8 text-xl leading-relaxed text-zinc-100">
                Continue your AI-powered career journey with
                personalized insights, assessments, and guidance.
              </p>

              <div className="mt-12 space-y-5 text-lg">

                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-blue-200" />
                  <p>AI Career Recommendations</p>
                </div>

                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-200" />
                  <p>Track Your Growth & Progress</p>
                </div>

                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-blue-200" />
                  <p>Personalized Career Roadmaps</p>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 md:p-14 flex flex-col justify-center">

            <div className="max-w-md w-full mx-auto">

              <h2 className="text-5xl font-extrabold text-zinc-900">
                Login
              </h2>

              <p className="mt-4 text-zinc-600 text-lg">
                Sign in to continue exploring your future.
              </p>

              {/* FORM */}
              <form className="mt-10 space-y-6">

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-zinc-300 px-5 py-4 pr-14 outline-none focus:ring-2 focus:ring-blue-500 transition text-zinc-900 placeholder:text-zinc-400"></input>
                </div>

                {/* PASSWORD */}
                <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-2">
                        Password
                    </label>

                    <div className="relative">

                        <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full rounded-2xl border border-zinc-300 px-5 py-4 pr-14 outline-none focus:ring-2 focus:ring-blue-500 transition text-zinc-900 placeholder:text-zinc-400"
                        />

                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500"
                        >

                        {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}

                        </button>

                    </div>
                </div>

                {/* OPTIONS */}
                <div className="flex items-center justify-between text-sm">

                  <label className="flex items-center gap-2 text-zinc-600">
                    <input type="checkbox" />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </button>

                </div>

                {error && (

                  <p className="text-red-500 text-sm">

                    {error}

                  </p>

                )}

                {/* BUTTON */}
                <button
                  type="submit"
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition duration-300"
                >
                  {loading ? "Logging In..." : "Login"}
                </button>

              </form>

              {/* DIVIDER */}
              <div className="flex items-center gap-4 my-8">

                <div className="flex-1 h-px bg-zinc-300" />

                <span className="text-zinc-500 text-sm">
                  OR
                </span>

                <div className="flex-1 h-px bg-zinc-300" />

              </div>

              {/* GOOGLE */}
              <button className="w-full py-4 rounded-2xl border border-zinc-300 bg-white hover:bg-zinc-50 transition font-semibold">
                Continue with Google
              </button>

              {/* SIGNUP */}
              <p className="mt-8 text-center text-zinc-600">

                Don&apos;t have an account?{" "}

                <Link
                  href="/signup"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Create Account
                </Link>

              </p>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}