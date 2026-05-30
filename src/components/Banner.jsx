import Link from "next/link";
import {
  Magnifier,
  MapPin,
  Briefcase,
  Factory,
  Person,
  Star,
} from "@gravity-ui/icons";
import Image from "next/image";
import globe from "../../public/images/globe.png";

export default function Banner() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-24 text-center text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(139,92,246,0.25),transparent_60%)]" />

      <div className="container mx-auto ">
        {/* Badge */}
        <div className="relative z-10 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-400 backdrop-blur-xl">
            <span className="font-bold text-violet-400">50,000+</span>
            New Jobs This Month
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto mb-10 max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            Find Your Dream
            <span className="block text-violet-500">Job Today</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role faster.
          </p>
        </div>

        {/* Search Box */}
        <div className="relative z-10 mx-auto mb-8 max-w-4xl">
          <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl md:flex-row">
            {/* Job Search */}
            <div className="flex flex-1 items-center gap-3 rounded-2xl px-4">
              <Magnifier className="h-5 w-5 text-gray-500" />

              <input
                type="text"
                placeholder="Job title, skill or company"
                className="w-full border-none bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
              />
            </div>

            <div className="hidden w-px bg-white/10 md:block" />

            {/* Location */}
            <div className="flex flex-1 items-center gap-3 rounded-2xl px-4">
              <MapPin className="h-5 w-5 text-gray-500" />

              <input
                type="text"
                placeholder="Location or Remote"
                className="w-full border-none bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
              />
            </div>

            {/* Search Button */}
            <button className="flex h-14 w-full items-center justify-center rounded-2xl bg-violet-600 transition-all duration-300 hover:bg-violet-500 md:w-14">
              <Magnifier className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Trending */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mb-60">
          <span className="text-xs uppercase tracking-wider text-gray-500">
            Trending Positions
          </span>

          <Link
            href="#"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-violet-500"
          >
            Product Designer
          </Link>

          <Link
            href="#"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-violet-500"
          >
            AI Engineer
          </Link>

          <Link
            href="#"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-violet-500"
          >
            DevOps Engineer
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-235 left-0 w-full opacity-40">
        <Image src={globe} alt="Globe" className="h-auto w-full" />
      </div>

      {/* Stats Section */}
      <div className="relative z-10 mx-auto container">
        <h2 className="mb-12 text-3xl font-medium text-gray-200">
          Assisting over{" "}
          <span className="font-bold text-white">15,000 job seekers</span>
          <br className="hidden md:block" />
          find their dream positions.
        </h2>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<Briefcase className="h-6 w-6" />}
            value="50K"
            label="Active Jobs"
          />

          <StatCard
            icon={<Factory className="h-6 w-6" />}
            value="12K"
            label="Companies"
          />

          <StatCard
            icon={<Person className="h-6 w-6" />}
            value="2M"
            label="Job Seekers"
          />

          <StatCard
            icon={<Star className="h-6 w-6" />}
            value="97%"
            label="Satisfaction Rate"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl transition-all duration-300 hover:bg-white/10">
      <div className="mb-8 text-gray-400">{icon}</div>

      <div className="mb-2 text-4xl font-bold">{value}</div>

      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}
