import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import Link from "next/link";
import { Card, Chip } from "@heroui/react";
import { Paperclip, ShoppingBag, CircleInfo, Lock } from "@gravity-ui/icons";

const JobApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  // console.log("User Session:", user);

  if (user.role !== "seeker") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#09090b] px-4 py-12 text-white">
        <Card className="w-full max-w-md bg-[#121214] border border-[#222226] rounded-xl p-8 flex flex-col items-center text-center shadow-2xl">
          <div className="p-4 bg-[#f31260]/10 text-[#f31260] rounded-full mb-6 border border-[#f31260]/20">
            <Lock width={32} height={32} />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white">
            Access Lock
          </h2>

          <p className="text-sm text-[#a1a1aa] mt-3 max-w-sm">
            Your current authorization parameter is invalid. System requires a
            valid <strong className="text-white font-medium">'seeker'</strong>{" "}
            operational privilege for this context. Access to the primary
            process cannot be established.
          </p>

          <div className="mt-8 flex gap-3">
            <Link
              className="bg-[#1a1a1e] hover:bg-[#222226] border border-[#2e2e33] text-white px-5 h-10 text-sm font-medium rounded-lg flex items-center justify-center transition-colors"
              href="/"
            >
              Return to Root
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user._id);

  const plan = {
    name: "free",
    maxApplicationsPerMonth: 3,
  };

  const job = await getJobById(id);

  const applicationCount = applications.length;
  const maxApplications = plan.maxApplicationsPerMonth;
  const isQuotaExceeded = applicationCount >= maxApplications;

  const usagePercentage = Math.min(
    (applicationCount / maxApplications) * 100,
    100,
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-white px-4 py-12 md:py-16">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-10">
        {/* Usage & Plan Card - More Refined Design */}
        <Card className="w-full bg-[#121214] border border-[#222226] rounded-xl p-6 md:p-8 shadow-2xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            {/* Left Side: stats & plan context */}
            <div className="flex items-start gap-4 md:flex-1">
              <div className="p-3 bg-[#1a1a1e] text-[#a1a1aa] border border-[#2e2e33] rounded-lg shrink-0">
                <Paperclip width={24} height={24} />
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-[#71717a]">
                  Monthly Applications: Quota Usage
                </p>

                <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-white flex items-baseline gap-2 mb-3">
                  {applicationCount}
                  <span className="text-xl text-[#52525b]">/</span>
                  <span className="text-xl text-[#a1a1aa] font-medium">
                    {maxApplications}
                  </span>
                </h3>
                <p className="text-sm text-[#52525b] font-normal">
                  registered positions this monthly cycle
                </p>

                {/* Custom, Cleaner Progress Bar */}
                <div className="w-full max-w-xl relative">
                  <div className="h-2.5 bg-[#1a1a1e] rounded-full border border-[#2e2e33] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ease-out ${
                        isQuotaExceeded
                          ? "bg-[#f31260]"
                          : "bg-gradient-to-r from-violet-600 to-violet-400"
                      }`}
                      style={{
                        width: `${usagePercentage}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 max-w-xl text-xs">
                  <Chip
                    size="sm"
                    variant="flat"
                    className="capitalize font-medium text-xs bg-[#1a1a1e] text-[#e4e4e7] border border-[#2e2e33]"
                  >
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag
                        width={14}
                        height={14}
                        className="text-[#a1a1aa]"
                      />
                      <span>{plan.name} configuration</span>
                    </div>
                  </Chip>
                </div>
              </div>
            </div>

            {/* Right Side: Expansion Context */}
            <div className="flex flex-col gap-4 p-5 bg-[#1a1a1e] border border-[#2e2e33] rounded-2xl md:min-w-[280px]">
              <div className="flex items-center gap-2.5 text-[#e4e4e7]">
                <div className="p-1.5 bg-[#222226] border border-[#2e2e33] rounded-lg text-[#a1a1aa]">
                  <CircleInfo width={18} height={18} />
                </div>
                <p className="text-sm font-semibold tracking-tight">
                  System Resource Expansion
                </p>
              </div>

              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Primary applications file creation is constrained within this
                operational tier. Expanding standardized persistence requires a
                higher tier plan configuration.
              </p>

              <Link
                className="mt-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1.5"
                href="/plans"
              >
                View Plans →
              </Link>
            </div>
          </div>
        </Card>

        {/* Application Form or Lock Message Block */}
        {!isQuotaExceeded ? (
          <div className="w-full flex flex-col gap-6 md:gap-8">
            <JobApply applicant={user} job={job} />
          </div>
        ) : (
          <Card className="w-full bg-[#121214] border border-[#222226] rounded-xl p-8 md:p-12 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
            {/* Decorative Background Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1a1a1e] rotate-12 scale-[3] opacity-[0.2]">
              <Lock width={128} height={128} />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="p-4 bg-[#f31260]/10 text-[#f31260] rounded-full mb-6 border border-[#f31260]/20">
                <Lock width={32} height={32} />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                Operational Limit Reached
              </h2>

              <p className="text-sm text-[#a1a1aa] mt-4 max-w-lg leading-relaxed">
                System configuration of your current{" "}
                <strong className="text-white font-medium capitalize">
                  {plan.name}
                </strong>{" "}
                operational tier has reached maximum parameter saturation.
                Creating new applications files for{" "}
                <strong className="text-white font-medium">{job.title}</strong>{" "}
                is constrained. Access will be persistent in new cycles or
                requires standardized plan expansion persistence.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  className="bg-white hover:bg-[#e4e4e7] text-black font-semibold rounded-lg px-6 h-11 text-sm flex items-center justify-center transition-colors"
                  href="/dashboard/seeker/applications"
                >
                  View Current Applications
                </Link>
                <Link
                  className="bg-transparent hover:bg-[#1a1a1e] text-[#a1a1aa] hover:text-white font-medium rounded-lg px-6 h-11 text-sm border border-[#2e2e33] flex items-center justify-center transition-colors"
                  href="/plans"
                >
                  Upgrade Parameters
                </Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobApplyPage;
