"use client";

import Link from "next/link";
import { useState } from "react";

import {Navbar} from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import {
  Rocket,
  Brain,
  BookOpen,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SignupPage() {

  const [accepted, setAccepted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {

    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
    ) {
      newErrors.password =
        "Must contain 8 characters, 1 uppercase letter and 1 number";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6 py-20">

        <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-2xl border border-zinc-200">

          {/* LEFT SIDE */}
          <div className="relative hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-700 p-16 text-white overflow-hidden">

            <div className="absolute inset-0 opacity-20 bg-[url('/career-bg.png')] bg-cover bg-center" />

            <div className="relative z-10">

              <h1 className="text-6xl font-extrabold leading-tight">
                Start Your
                <br />
                Journey
              </h1>

              <p className="mt-8 text-xl leading-relaxed text-green-50">
                Create your account and unlock AI-powered career guidance,
                assessments, and personalized roadmaps.
              </p>

              <div className="mt-12 space-y-5 text-lg">

                <div className="flex items-center gap-3">
                  <Rocket className="w-5 h-5 text-green-200" />
                  <p>Discover Career Paths</p>
                </div>

                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-green-200" />
                  <p>AI-Powered Assessments</p>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-green-200" />
                  <p>Personalized Learning Roadmaps</p>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 md:p-14 flex flex-col justify-center">

            <div className="max-w-md w-full mx-auto">

              <h2 className="text-5xl font-extrabold text-zinc-900">
                Create Account
              </h2>

              <p className="mt-4 text-zinc-600 text-lg">
                Join CareerAI and start exploring your future.
              </p>

              {/* FORM */}
              <form
                className="mt-10 space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();

                  if (validateForm()) {
                    console.log("Form valid");
                  }
                }}
              >

                {/* NAME */}
                <div>

                  <label className="block text-sm font-semibold text-zinc-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-zinc-300 px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 transition text-zinc-900 placeholder:text-zinc-400"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.name}
                    </p>
                  )}

                </div>

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
                    className="w-full rounded-2xl border border-zinc-300 px-5 py-4 outline-none focus:ring-2 focus:ring-green-500 transition text-zinc-900 placeholder:text-zinc-400"
                  />

                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.email}
                    </p>
                  )}

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
                      placeholder="Create a password"
                      className="w-full rounded-2xl border border-zinc-300 px-5 py-4 pr-14 outline-none focus:ring-2 focus:ring-green-500 transition text-zinc-900 placeholder:text-zinc-400"
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

                  {errors.password && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.password}
                    </p>
                  )}

                </div>

                {/* CONFIRM PASSWORD */}
                <div>

                  <label className="block text-sm font-semibold text-zinc-700 mb-2">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Confirm your password"
                      className="w-full rounded-2xl border border-zinc-300 px-5 py-4 pr-14 outline-none focus:ring-2 focus:ring-green-500 transition text-zinc-900 placeholder:text-zinc-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500"
                    >

                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}

                    </button>

                  </div>

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.confirmPassword}
                    </p>
                  )}

                </div>

                {/* TERMS */}
                <label className="flex items-start gap-3 text-sm text-zinc-600">

                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                  />

                  <span>
                    I agree to the{" "}
                    <span className="text-green-600 font-medium">
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-green-600 font-medium">
                      Privacy Policy
                    </span>
                  </span>

                </label>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={!accepted}
                  className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition duration-300
                  ${
                    accepted
                      ? "bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-700 hover:scale-[1.02]"
                      : "bg-zinc-400 cursor-not-allowed"
                  }`}
                >
                  Create Account
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
              <button className="w-full py-4 rounded-2xl border border-zinc-300 bg-white hover:bg-zinc-50 transition font-semibold text-zinc-900">
                Continue with Google
              </button>

              {/* LOGIN */}
              <p className="mt-8 text-center text-zinc-600">

                Already have an account?{" "}

                <Link
                  href="/login"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Login
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