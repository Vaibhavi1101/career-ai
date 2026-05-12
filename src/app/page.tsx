import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Brain, Map, Target, Wallet,} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "College Freshman",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "CareerAI helped me discover my passion for data science. The roadmap was so clear and actionable!",
  },
  {
    name: "Arjun Patel",
    role: "10th Grade Student",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "I was confused between Engineering & Medicine. The AI test gave me clarity I never had before.",
  },
  {
    name: "Sneha Reddy",
    role: "12th Grade Student",
    image: "https://i.pravatar.cc/150?img=5",
    review:
      "The interface is so easy to use & the results are surprisingly accurate. Highly recommended!",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-black">

      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[520px] flex items-center justify-center text-center overflow-hidden"
      >

        {/* BACKGROUND */}
        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
            alt="career ai"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-blue-900/40" />

        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-5xl px-6">

          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">

            Discover your Career Path with AI

          </h1>

          <p className="mt-8 text-2xl text-white font-medium leading-relaxed">

            Take our intelligent assessments to uncover your strengths,
            interests, and ideal career paths. Get personalized roadmaps
            designed just for you.

          </p>

          <button className="mt-10 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-700 text-white text-xl font-semibold shadow-2xl hover:scale-105 transition-all duration-300">

            Take Free Career Test →

          </button>

        </div>

      </section>

      {/* FEATURES */}
      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-6xl font-extrabold text-center">

            Why Choose{" "}

            <span className="text-blue-700">
              Career
            </span>

            <span className="text-green-500">
              AI
            </span>

            ?

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

            {[
              {
                icon: Brain,
                title: "AI Career & Interests Tests",
                desc: "Advanced AI algorithms analyze your interests, skills and personality.",
              },
              {
                icon: Map,
                title: "Personalized Roadmap",
                desc: "Customized step-by-step roadmap tailored to your goals.",
              },
              {
                icon: Target,
                title: "Action Plans & Tracking",
                desc: "Track milestones with AI-powered recommendations.",
              },
              {
                icon: Wallet,
                title: "Student-Friendly Cost",
                desc: "Affordable plans designed specifically for students.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >

                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-indigo-600" />
                </div>

                <h3 className="text-2xl font-bold leading-snug">
                  {item.title}
                </h3>

                <p className="text-zinc-600 mt-5 text-lg leading-relaxed">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

            {/* TESTIMONIALS */}
      <section className="py-24 bg-[#ececf4]">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-6xl font-extrabold text-center">
            What Students Say
          </h2>

          <p className="text-center text-zinc-600 text-xl mt-6">
            Hear from students who found their career path with our platform
          </p>

          <div className="grid lg:grid-cols-3 gap-8 mt-20">

            {testimonials.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-3xl border border-zinc-200 shadow-md p-8"
              >
                <div className="flex items-center gap-1 text-indigo-500 mb-5 text-xl">
                  ★ ★ ★ ★ ★
                </div>

                <p className="text-zinc-700 text-lg leading-relaxed">
                  “{item.review}”
                </p>

                <div className="flex items-center gap-4 mt-8">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={item.image} />
                    <AvatarFallback>
                      {item.name[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-semibold text-lg text-black">
                      {item.name}
                    </h4>

                    <p className="text-zinc-500 text-sm">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

            {/* CTA SECTION */}
      <section className="bg-[#ececf4] py-24 px-6">

        <div className="max-w-6xl mx-auto rounded-[40px] bg-gradient-to-r from-[#4f67d8] via-[#67b2f5] to-[#5d7df0] p-16 text-center shadow-xl">

          <h2 className="text-5xl lg:text-6xl font-bold text-white drop-shadow-md">
            Ready to Discover Your Future?
          </h2>

          <p className="text-2xl text-blue-100 italic mt-6 max-w-4xl mx-auto leading-relaxed">
            Take the first step towards your Dream Career.
            Our AI-powered tests are free to get started
          </p>

          <button className="mt-10 bg-white border border-zinc-400 px-12 py-4 rounded-2xl font-bold text-xl shadow-md hover:scale-105 transition duration-300">
            Start your Journey →
          </button>

        </div>

      </section>

      {/* FOOTER */}
      
        <Footer />

    </main>
  );
}