import { getJobById } from "@/lib/api/jobs";
import React from "react";
import { Card, Chip, Button } from "@heroui/react";
import {
  Briefcase,
  Calendar,
  Globe,
  CircleDollar,
  ArrowRight,
  ShieldCheck,
  Gift,
  ChevronLeft,
} from "@gravity-ui/icons";
import Link from "next/link";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);
  console.log("Fetched job details:", job);

  // Fallback gracefully if no job data matches the parameter block
  if (!job) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6 text-center text-white min-h-screen flex items-center justify-center bg-[#030303]">
        <div className="border border-[#1f1f23] bg-[#0c0c0e]/90 backdrop-blur-md rounded-2xl p-12 shadow-2xl flex flex-col items-center justify-center gap-3">
          <p className="text-lg font-semibold text-zinc-200">
            Job Position Not Found
          </p>
          <p className="text-sm text-zinc-500 max-w-sm">
            The vacancy specification you are looking for has either expired or
            does not exist on HireLoop.
          </p>
          <Link href="/jobs">
            <Button
              size="sm"
              variant="light"
              className="text-white mt-4 bg-[#161619] border border-[#27272a] hover:bg-[#27272a] transition-all rounded-xl"
            >
              Back to Listings
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    companyName,
    companyLogo,
    jobType,
    deadline,
    minSalary,
    maxSalary,
    currency,
    isRemote,
    responsibilities,
    requirements,
    benefits,
  } = job;

  // Format currency metrics cleanly
  const currencySymbol =
    currency === "USD" ? "$" : currency === "BDT" ? "৳" : "€";
  const displaySalary =
    minSalary && maxSalary
      ? `${currencySymbol}${Number(minSalary).toLocaleString()} – ${currencySymbol}${Number(maxSalary).toLocaleString()}`
      : "Negotiable";

  const jobId = job._id?.$oid || job._id;

  return (
    <div className="w-full min-h-screen text-white bg-[#030303] bg-gradient-to-b from-[#0a0a12] via-[#030303] to-[#030303] relative overflow-hidden px-4 py-8 md:p-12">
      {/* Decorative Brand Ambient Radial Glow Background */}
      <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Back Navigation Bar */}
        <div className="mb-8">
          <Link href="/jobs">
            <Button
              size="sm"
              variant="light"
              className="text-zinc-400 hover:text-white px-0 gap-2 font-medium transition-colors bg-transparent min-w-0 group text-xs tracking-wide uppercase"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to open vacancies
            </Button>
          </Link>
        </div>

        {/* Main Structural Details Card wrapper */}
        <Card className="w-full border border-[#1f1f23] bg-[#0c0c0e]/70 backdrop-blur-xl text-white p-6 md:p-10 rounded-2xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Subtle Dynamic Top Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          {/* Header Block: Brand identity matrix & Core Titles */}
          <Card.Header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-0 pb-8 border-b border-[#1f1f23]">
            <div className="flex gap-5 items-center">
              {companyLogo ? (
                <div className="w-20 h-20 rounded-2xl bg-[#141417] border border-[#27272a] flex items-center justify-center p-3 shadow-inner">
                  <img
                    src={companyLogo}
                    alt={`${companyName} branding asset`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-[#141417] border border-[#27272a] flex items-center justify-center font-bold text-2xl text-zinc-600 shadow-inner">
                  {companyName?.charAt(0) || "J"}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <Card.Title className="text-2xl md:text-3xl font-extrabold tracking-tight text-white m-0 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  {title || "Untitled Role Framework"}
                </Card.Title>
                <Card.Description className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <span className="text-blue-400 hover:underline cursor-pointer font-semibold">
                    {companyName || "Verified Recruiter"}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span className="text-xs text-zinc-500 font-mono">
                    ID: {jobId?.toString().substring(0, 8)}...
                  </span>
                </Card.Description>
              </div>
            </div>

            {/* Action Button layout positioned cleanly to the side on desktop views */}
            <Link href={`/jobs/${jobId}/apply`} className="w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto bg-[#3b82f6] hover:bg-blue-500 text-white font-semibold rounded-xl px-8 h-12 text-sm transition-all duration-200 flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                Apply Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card.Header>

          {/* Content Body Block */}
          <Card.Content className="flex flex-col gap-10 px-0 py-8">
            {/* Metadata Matrices Grid (Arrangement parameters) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-[#111115]/50 border border-[#1f1f23] rounded-2xl p-5 shadow-inner">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Location Format
                </span>
                <span className="text-sm font-semibold inline-flex items-center gap-2 text-zinc-200">
                  <Globe className="w-4 h-4 text-blue-400" />{" "}
                  {isRemote ? "Remote" : "On-site"}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Employment Terms
                </span>
                <span className="text-sm font-semibold inline-flex items-center gap-2 text-zinc-200 capitalize">
                  <Briefcase className="w-4 h-4 text-blue-400" />{" "}
                  {jobType || "Full-time"}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Financial Base
                </span>
                <span className="text-sm font-semibold inline-flex items-center gap-2 text-emerald-400 font-mono">
                  <CircleDollar className="w-4 h-4 text-emerald-400" />{" "}
                  {displaySalary}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Deadline Matrix
                </span>
                <span className="text-sm font-semibold inline-flex items-center gap-2 text-zinc-200">
                  <Calendar className="w-4 h-4 text-blue-400" />{" "}
                  {deadline || "Open"}
                </span>
              </div>
            </div>

            {/* Role Responsibilities Context Segment */}
            {responsibilities && (
              <div className="flex flex-col gap-3.5">
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  Core Responsibilities
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap pl-6 border-l border-[#222226]">
                  {responsibilities}
                </p>
              </div>
            )}

            {/* Role Requirements Context Segment */}
            {requirements && (
              <div className="flex flex-col gap-3.5">
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  Requirements & Qualifications
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap pl-6 border-l border-[#222226]">
                  {requirements}
                </p>
              </div>
            )}

            {/* Corporate Benefits Context Segment */}
            {benefits && (
              <div className="flex flex-col gap-3.5">
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  Benefits & Perks
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap pl-6 border-l border-[#222226]">
                  {benefits}
                </p>
              </div>
            )}
          </Card.Content>

          {/* Footer Interface */}
          <Card.Footer className="p-0 pt-6 border-t border-[#1f1f23] flex items-center justify-between text-xs text-zinc-500 tracking-wide">
            <div className="flex items-center gap-2">
              <span>Listing Status:</span>
              <span className="text-emerald-400 font-semibold bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-0.5 rounded-full capitalize text-[11px]">
                {job.status || "Active"}
              </span>
            </div>
            <span className="text-zinc-600">
              Secure Identifier:{" "}
              <span className="font-mono text-zinc-500">
                {jobId?.toString()}
              </span>
            </span>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default JobDetailsPage;
