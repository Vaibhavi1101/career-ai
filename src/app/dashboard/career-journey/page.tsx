"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  Briefcase,
  CheckCircle2,
  Circle,
  Clock3,
  Trophy,
} from "lucide-react";

type RoadmapStep = {
  title: string;
  description: string;
  duration: string;
  resources: string[];
  completed: boolean;
};

export default function CareerJourneyPage() {

  const [loading, setLoading] =
    useState(true);

  const [journey, setJourney] =
  useState<any>(null);

  const [roadmap, setRoadmap] =
    useState<RoadmapStep[]>([]);

  useEffect(() => {
    fetchJourney();
  }, []);

  async function fetchJourney() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("journeys")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (data) {

      setJourney(data);

      setRoadmap(data.roadmap || []);

    }

    setLoading(false);

  }

  async function completeStep(index: number) {

    const updatedRoadmap = [...roadmap];

    if (
      updatedRoadmap[index].completed
    )
      return;

    updatedRoadmap[index].completed = true;

    const completedSteps =
      updatedRoadmap.filter(
        (step) => step.completed
      ).length;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("journeys")
      .update({
        roadmap: updatedRoadmap,

        completed_steps:
          completedSteps,
      })
      .eq("user_id", user.id)
      .eq("status", "active");

    setRoadmap(updatedRoadmap);

    setJourney({
      ...journey,

      completed_steps:
        completedSteps,
    });

  }

  const progress =
    journey
      ? Math.round(
          (journey.completed_steps /
            journey.total_steps) *
            100
        )
      : 0;

  if (loading) {

    return (

      <div className="flex items-center justify-center min-h-[70vh]">

        <p className="text-zinc-500">

          Loading your career journey...

        </p>

      </div>

    );

  }

  if (!journey) {

    return (

      <div className="max-w-4xl mx-auto py-16 text-center">

        <Briefcase className="mx-auto w-14 h-14 text-zinc-400" />

        <h1 className="text-3xl font-bold mt-6">

          No Journey Yet

        </h1>

        <p className="text-zinc-500 mt-4">

          Choose a career from Career Explorer to
          generate your personalized roadmap.

        </p>

      </div>

    );

  }

  return (

    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold">

          Career Journey

        </h1>

        <p className="text-zinc-500 mt-3">

          Your personalized roadmap towards becoming a

          <span className="font-semibold text-zinc-900">

            {" "}{journey.career}

          </span>

        </p>

      </div>

      {/* PROGRESS */}

      <div className="mt-10 bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold">

              Overall Progress

            </h2>

            <p className="text-zinc-500 mt-2">

              {journey.completed_steps} of{" "}

              {journey.total_steps} steps completed

            </p>

          </div>

          <div className="flex items-center gap-2 text-indigo-600 font-bold text-3xl">

            <Trophy className="w-8 h-8" />

            {progress}%

          </div>

        </div>

        <div className="mt-8 h-4 bg-zinc-200 rounded-full overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-violet-600"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* ROADMAP */}

      <div className="mt-10 space-y-6">

        {roadmap.map((step, index) => (

          <div
            key={index}
            className={`rounded-3xl border p-7 transition shadow-sm ${
              step.completed
                ? "bg-green-50 border-green-200"
                : "bg-white border-zinc-200"
            }`}
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-4">

                {step.completed ? (

                  <CheckCircle2 className="text-green-600 mt-1 w-6 h-6" />

                ) : (

                  <Circle className="text-zinc-400 mt-1 w-6 h-6" />

                )}

                <div>

                  <h2 className="text-xl font-semibold">

                    {step.title}

                  </h2>

                  <p className="text-zinc-600 mt-3 leading-7">

                    {step.description}

                  </p>

                  <div className="flex items-center gap-2 mt-5 text-zinc-500">

                    <Clock3 className="w-4 h-4" />

                    {step.duration}

                  </div>
                  
                  {/* RESOURCES */}

                  {step.resources &&
                    step.resources.length > 0 && (

                    <div className="mt-6">

                      <h3 className="font-semibold text-zinc-900">

                        Resources

                      </h3>

                      <ul className="list-disc pl-6 mt-3 space-y-2 text-zinc-600">

                        {step.resources.map(
                          (resource, resourceIndex) => (

                            <li key={resourceIndex}>

                              {resource}

                            </li>

                          )
                        )}

                      </ul>

                    </div>

                  )}

                </div>

              </div>

              {!step.completed ? (

                <button
                  onClick={() =>
                    completeStep(index)
                  }
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >

                  Mark Complete

                </button>

              ) : (

                <div className="flex items-center gap-2 text-green-700 font-semibold bg-green-100 px-4 py-2 rounded-xl">

                  <CheckCircle2 className="w-5 h-5" />

                  Completed

                </div>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}