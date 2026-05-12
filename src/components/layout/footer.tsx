import Link from "next/link"
import Image from "next/image"

import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] border-t border-zinc-300">

      <div className="max-w-7xl mx-auto px-8 py-16 grid lg:grid-cols-4 gap-14">

        {/* LOGO + ABOUT */}
        <div>

          <Image
            src="/logo.png"
            alt="CareerAI Logo"
            width={180}
            height={60}
            className="object-contain"
          />

          <p className="text-zinc-600 mt-6 leading-relaxed text-lg">
            AI-powered career guidance for students.
            Discover your perfect path with personalized assessments.
          </p>

          {/* SOCIALS */}
          <div className="flex gap-5 mt-6">

            <a
              href="https://instagram.com"
              target="_blank"
              className="text-zinc-600 hover:text-pink-500 transition duration-300"
            >
              <FaInstagram size={22} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              className="text-zinc-600 hover:text-blue-600 transition duration-300"
            >
              <FaLinkedin size={22} />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              className="text-zinc-600 hover:text-red-500 transition duration-300"
            >
              <FaGithub size={22} />
            </a>

          </div>

        </div>

        {/* QUICK LINKS */}
        <div>

          <h4 className="font-bold text-2xl mb-6">
            Quick Links
          </h4>

          <ul className="space-y-5 text-zinc-600 text-lg">

            <li>
              <Link href="/" className="hover:text-black transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/explore" className="hover:text-black transition">
                Explore Tests
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-black transition">
                About Us
              </Link>
            </li>

          </ul>

        </div>

        {/* LEGAL */}
        <div>

          <h4 className="font-bold text-2xl mb-6">
            Legal
          </h4>

          <ul className="space-y-5 text-zinc-600 text-lg">

            <li>
              <Link href="/faqs" className="hover:text-black transition">
                FAQs
              </Link>
            </li>

            <li>
              <Link href="/privacy-policy" className="hover:text-black transition">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/terms-and-conditions" className="hover:text-black transition">
                Terms & Conditions
              </Link>
            </li>

          </ul>

        </div>

        {/* CONTACT */}
        <div>

          <h4 className="font-bold text-2xl mb-6">
            Contact Us
          </h4>

          <ul className="space-y-5 text-zinc-600 text-lg">

            <li>
              support@careerai.com
            </li>

            <li>
              +91 XXXXX XXXXX
            </li>

            <li>
              +91 XYXYX XYXYX
            </li>

          </ul>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-zinc-300 py-8 text-center text-zinc-500 text-lg">
        © 2025 CareerAI. All Rights Reserved.
      </div>

    </footer>
  )
}