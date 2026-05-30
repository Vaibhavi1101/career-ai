"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { supabase } from "@/lib/supabase";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import { tests } from "@/data/tests";

import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function TestPage() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const type =
    searchParams.get("type") || "personality";

  const test =
    tests[type as keyof typeof tests];

  const questions =
    test.questions;

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedOption, setSelectedOption] =
    useState<any>(null);

  const [answers, setAnswers] =
    useState<any>({});

  const [traits, setTraits] =
    useState<string[]>([]);

  const question =
    questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;


  const handleNext = () => {

    if (!selectedOption) return;

    const updatedAnswers = {

      ...answers,

      [question.id]: {

        question: question.question,

        answer: selectedOption.text,

        traits: selectedOption.traits,

      },

    };

    setAnswers(updatedAnswers);

    setTraits((prev) => [
      ...prev,
      ...selectedOption.traits,
    ]);

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );

      setSelectedOption(null);

    }

  };


  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const previousQuestion =
        questions[currentQuestion - 1];

      const previousAnswer =
        answers[previousQuestion.id];

      setCurrentQuestion(
        currentQuestion - 1
      );

      if (previousAnswer) {
        const matchedOption =
          previousQuestion.options.find(
            (option: any) =>
              option.text ===
              previousAnswer.answer
          );

        setSelectedOption(
          matchedOption || null
        );
      }
    }
  };


  const handleSubmit = async () => {

    if (!selectedOption) return;

    const updatedAnswers = {
      ...answers,

      [question.id]: {
        question:
          question.question,

        answer:
          selectedOption.text,

        traits:
          selectedOption.traits,
      },

    };
    const updatedTraits = Array.from(

      new Set([
        ...traits,
        ...selectedOption.traits,
      ])
    );

    try {
      const { data: authData } =
        await supabase.auth.getUser();

      const user =
        authData.user;

      if (!user) {

        localStorage.setItem(
          "pendingAssessment",

          JSON.stringify({
            answers: updatedAnswers,
            traits: updatedTraits,
            domain: test.title,
            testType: type,

          })
        );
        router.push("/login");
        return;
      }

      const { error } =
        await supabase
          .from("assessments")
          .insert([
            {
              user_id: user.id,

              domain: test.title,

              test_type: type,

              answers:
                updatedAnswers,

              traits:
                updatedTraits,
            },
          ]);

      if (error) {

        console.log(error);
        alert(error.message);
        return;
      }

      router.push("/results");

    } catch (err) {
      console.log(err);
    }
  };


  return (

    <>

      <Navbar />

      <main className="min-h-screen bg-[#f5f5f7] px-6 py-16">

        <div className="max-w-5xl mx-auto">


          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <div className="flex items-center gap-3 text-blue-600 font-semibold">

                <Brain className="w-5 h-5" />

                <span>{test.title || "CareerAI Assessment"}</span>

              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mt-4 leading-tight">
                Discover Your Strengths & Career Fit
              </h1>

            </div>

            {/* QUESTION COUNT */}
            <div className="bg-white rounded-2xl border border-zinc-200 px-6 py-4 shadow-sm">

              <p className="text-zinc-500 text-sm">
                Question
              </p>

              <h2 className="text-2xl font-bold text-zinc-900">
                {currentQuestion + 1}
                <span className="text-zinc-400">
                  /{questions.length}
                </span>
              </h2>

            </div>

          </div>

          {/* PROGRESS */}
          <div className="mt-12">

            <div className="w-full h-4 bg-zinc-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />

            </div>

          </div>


          {/* QUESTION CARD */}

          <div className="mt-12 bg-white rounded-[40px] border border-zinc-200 shadow-2xl p-8 md:p-12">

            <div className="flex items-center gap-3 text-indigo-600 font-semibold">

              <Sparkles className="w-5 h-5" />

              <span>
                Question {currentQuestion + 1}
              </span>

            </div>


            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-8 leading-snug">

              {question.question}

            </h2>


            <div className="grid gap-5 mt-10">

              {question.options.map(
                (option: any) => (

                  <button
                    key={option.id}
                    onClick={() =>
                      setSelectedOption(option)
                    }
                    className={`text-left rounded-3xl border px-6 py-6 transition duration-300 ${
                      selectedOption?.id === option.id
                        ? "border-blue-600 bg-blue-50 shadow-lg"
                        : "border-zinc-200 bg-white hover:border-blue-300 hover:shadow-md"
                    }`}
                  >

                    <p className="text-lg font-medium text-zinc-800 leading-relaxed">

                      {option.text}

                    </p>

                  </button>

                )
              )}

            </div>


            {/* NAVIGATION */}

            <div className="flex items-center justify-between mt-14">

              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-zinc-300 text-zinc-700 font-semibold hover:bg-zinc-100 transition disabled:opacity-40"
              >

                <ChevronLeft className="w-5 h-5" />

                Previous

              </button>


              {currentQuestion ===
              questions.length - 1 ? (

                <button
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
                >

                  Generate Report

                  <ChevronRight className="w-5 h-5" />

                </button>

              ) : (

                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
                >

                  Next Question

                  <ChevronRight className="w-5 h-5" />

                </button>

              )}

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </>

  );

}