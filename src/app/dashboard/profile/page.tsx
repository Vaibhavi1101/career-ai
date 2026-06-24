"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  User,
  GraduationCap,
  Briefcase,
  Pencil,
  Save,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [email, setEmail] = useState("");

  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("");
  const [stream, setStream] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setEmail(user.email || "");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setFullName(data.full_name || "");
        setGrade(data.grade || "");
        setStream(data.stream || "");
        setCareerGoal(data.career_goal || "");
        setSelectedCareer(data.selected_career || "");
        setBio(data.bio || "");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile() {
    try {
      setSaving(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          grade,
          stream,
          career_goal: careerGoal,
          selected_career: selectedCareer,
          bio,
        })
        .eq("id", user.id);

      if (error) {
        console.error(error);
        return;
      }

      setIsEditing(false);
      await fetchProfile();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  const initials =
    fullName
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CA";

  const fields = [
    fullName,
    grade,
    stream,
    careerGoal,
    selectedCareer,
    bio,
  ];

  const completion = Math.round(
    (fields.filter(Boolean).length / fields.length) * 100
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-zinc-500 text-lg">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* HEADER */}

      <div className="bg-white rounded-[32px] border border-zinc-200 shadow-sm p-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {initials}
            </div>

            <div>

              {isEditing ? (
                <input
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  className="text-3xl font-bold border text-zinc-700 border-zinc-200 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              ) : (
                <h1 className="text-3xl font-bold text-zinc-900">
                  {fullName || "Your Name"}
                </h1>
              )}

              <p className="text-zinc-500 mt-2">
                {email}
              </p>

            </div>

          </div>

          {!isEditing ? (

            <button
              onClick={() =>
                setIsEditing(true)
              }
              className="w-12 h-12 rounded-xl bg-zinc-100 hover:bg-zinc-200 transition flex items-center justify-center"
            >
              <Pencil className="w-5 h-5 text-zinc-400" />
            </button>

          ) : (

            <div className="flex gap-3">

              <button
                onClick={() =>
                  setIsEditing(false)
                }
                className="w-12 h-12 rounded-xl border border-zinc-200 hover:bg-zinc-100 transition flex items-center justify-center"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="w-12 h-12 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center justify-center"
              >
                <Save className="w-5 h-5" />
              </button>

            </div>

          )}

        </div>

      </div>

      {/* PROFILE COMPLETION */}

      <div className="mt-6 bg-white rounded-[32px] border border-zinc-200 shadow-sm p-8">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-lg text-zinc-600 font-semibold">
            Profile Completion
          </h2>

          <span className="text-indigo-600 font-bold text-lg">
            {completion}%
          </span>

        </div>

        <div className="w-full h-3 bg-zinc-200 rounded-full overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-500"
            style={{
              width: `${completion}%`,
            }}
          />

        </div>

      </div>

      {/* BIO */}

      <div className="mt-6 bg-white rounded-[32px] border border-zinc-200 shadow-sm p-8">

        <div className="flex items-center gap-3 mb-5">

          <User className="w-5 h-5 text-indigo-600" />

          <h2 className="text-lg text-gray-600 font-semibold">
            About Me
          </h2>

        </div>

        {isEditing ? (

          <textarea
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
            rows={5}
            className="w-full text-zinc-800 border border-zinc-200 rounded-2xl p-4 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />

        ) : (

          <p className="text-zinc-600 leading-relaxed">
            {bio ||
              "Tell CareerAI a little about yourself."}
          </p>

        )}

      </div>

      {/* ACADEMIC INFO */}

      <div className="mt-6 bg-white rounded-[32px] border border-zinc-200 shadow-sm p-8">

        <div className="flex items-center gap-3 mb-6">

          <GraduationCap className="w-5 h-5 text-indigo-600" />

          <h2 className="text-lg text-zinc-600 font-semibold">
            Academic Information
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div>

            <p className="text-sm text-zinc-500 mb-2">
              Grade
            </p>

            {isEditing ? (

              <input
                value={grade}
                onChange={(e) =>
                  setGrade(e.target.value)
                }
                className="w-full text-zinc-800 border border-zinc-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />

            ) : (

              <p className="font-medium text-zinc-800">
                {grade || "Not specified"}
              </p>

            )}

          </div>

          <div>

            <p className="text-sm text-zinc-500 mb-2">
              Stream
            </p>

            {isEditing ? (

              <input
                value={stream}
                onChange={(e) =>
                  setStream(e.target.value)
                }
                className="w-full text-zinc-800 border border-zinc-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />

            ) : (

              <p className="font-medium text-zinc-800">
                {stream || "Not specified"}
              </p>

            )}

          </div>

        </div>

      </div>

      {/* CAREER INFO */}

      <div className="mt-6 bg-white rounded-[32px] border border-zinc-200 shadow-sm p-8">

        <div className="flex items-center gap-3 mb-6">

          <Briefcase className="w-5 h-5 text-indigo-600" />

          <h2 className="text-lg text-zinc-600 font-semibold">
            Career Information
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div>

            <p className="text-sm text-zinc-500 mb-2">
              Career Goal
            </p>

            {isEditing ? (

              <input
                value={careerGoal}
                onChange={(e) =>
                  setCareerGoal(e.target.value)
                }
                className="w-full text-zinc-800 border border-zinc-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />

            ) : (

              <p className="font-medium text-zinc-800">
                {careerGoal || "Not specified"}
              </p>

            )}

          </div>

          <div>

            <p className="text-sm text-zinc-500 mb-2">
              Selected Career
            </p>

            {isEditing ? (

              <input
                value={selectedCareer}
                onChange={(e) =>
                  setSelectedCareer(
                    e.target.value
                  )
                }
                className="w-full border border-zinc-200 text-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />

            ) : (

              <p className="font-medium text-zinc-800">
                {selectedCareer ||
                  "Not specified"}
              </p>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}