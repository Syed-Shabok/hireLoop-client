import Link from "next/link";
// import BrandLogo from "./BrandLogo";
import { LogoFacebook, LogoLinkedin, LogoGithub } from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 text-white">
      <div className="mx-auto container px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500">
                <span className="text-xl font-bold text-white">P</span>
              </div>

              <div className="leading-none">
                <h2 className="text-xl font-bold">HireLoop</h2>
              </div>
            </Link>

            <p className="max-w-xs leading-8 text-gray-400">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-violet-600"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-violet-600"
              >
                <LogoGithub className="h-5 w-5" />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-violet-600"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-violet-500">
              For Job Seekers
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/jobs" className="transition hover:text-white">
                  Search Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="/resume-builder"
                  className="transition hover:text-white"
                >
                  Resume Builder
                </Link>
              </li>

              <li>
                <Link href="/dashboard" className="transition hover:text-white">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-violet-500">
              For Employers
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/post-job" className="transition hover:text-white">
                  Post a Job
                </Link>
              </li>

              <li>
                <Link
                  href="/talent-search"
                  className="transition hover:text-white"
                >
                  Talent Search
                </Link>
              </li>

              <li>
                <Link href="/pricing" className="transition hover:text-white">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-violet-500">
              Company
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/about" className="transition hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="transition hover:text-white">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/blog" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} Hiring Loop. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
