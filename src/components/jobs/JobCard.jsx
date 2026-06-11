import React from "react";
import { Card, Chip, Button } from "@heroui/react";
import {
  Briefcase,
  Calendar,
  Globe,
  CircleDollar,
  ArrowRight,
} from "@gravity-ui/icons";
import Link from "next/link";

export default function JobCard({ job }) {
  const {
    _id,
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
  } = job;

  const currencySymbol =
    currency === "USD" ? "$" : currency === "BDT" ? "৳" : "€";

  const displaySalary =
    minSalary && maxSalary
      ? `${currencySymbol}${Number(minSalary).toLocaleString()} – ${currencySymbol}${Number(maxSalary).toLocaleString()}`
      : "Negotiable";

  const jobId = _id?.$oid || _id;

  return (
    <Card className="w-full max-w-md border border-[#222226] bg-[#121214] text-white p-5 rounded-xl shadow-xl hover:border-[#323238] transition-all duration-200">
      {/* Header */}
      <Card.Header className="flex gap-4 p-0 items-start">
        {companyLogo ? (
          <img
            src={companyLogo}
            alt={`${companyName} logo`}
            className="w-12 h-12 rounded-lg bg-[#1a1a1e] border border-[#222226] object-contain p-2"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-[#1a1a1e] border border-[#222226] flex items-center justify-center font-bold text-zinc-500">
            {companyName?.charAt(0) || "J"}
          </div>
        )}

        <div className="flex flex-col gap-0.5">
          <Card.Title className="text-lg font-semibold tracking-tight text-white m-0">
            {title || "Untitled Position"}
          </Card.Title>
          <Card.Description className="text-sm text-[#71717a]">
            {companyName || "Unknown Company"}
          </Card.Description>
        </div>
      </Card.Header>

      {/* Content */}
      <Card.Content className="flex flex-col gap-4 px-0 py-4">
        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {isRemote && (
            <Chip className="bg-[#1a1a1e] text-[#a1a1aa] border border-[#2e2e33] gap-1 px-2 flex items-center">
              <Globe className="w-3.5 h-3.5 mr-1" />
              Remote
            </Chip>
          )}

          {jobType && (
            <Chip className="bg-[#1a1a1e] text-[#a1a1aa] border border-[#2e2e33] capitalize gap-1 px-2 flex items-center">
              <Briefcase className="w-3.5 h-3.5 mr-1" />
              {jobType}
            </Chip>
          )}
        </div>

        {/* Responsibilities */}
        {responsibilities && (
          <p className="text-xs text-[#a1a1aa] line-clamp-2 leading-relaxed">
            {responsibilities}
          </p>
        )}

        {/* Footer Info */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#1a1a1e]">
          <div className="flex items-center gap-2 text-xs text-[#71717a]">
            <CircleDollar className="w-4 h-4 text-[#a1a1aa]" />
            <span className="font-mono text-[#e4e4e7]">{displaySalary}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#71717a]">
            <Calendar className="w-4 h-4 text-[#a1a1aa]" />
            <span>
              Deadline:{" "}
              <span className="text-[#e4e4e7]">{deadline || "N/A"}</span>
            </span>
          </div>
        </div>
      </Card.Content>

      {/* Footer */}
      <Card.Footer className="p-0 flex justify-end">
        <Link href={`/jobs/${jobId}`}>
          <Button
            size="sm"
            variant="light"
            endContent={
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            }
            className="group text-[#e4e4e7] hover:text-white hover:bg-[#1a1a1e] px-3 font-medium rounded-lg transition-colors"
          >
            Apply Now
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}
