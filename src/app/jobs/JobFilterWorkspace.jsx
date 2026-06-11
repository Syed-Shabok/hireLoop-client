"use client";

import React, { useState, useMemo } from "react";
import { TextField, InputGroup, Select, ListBox } from "@heroui/react";
import { Magnifier, Briefcase, Globe, Xmark } from "@gravity-ui/icons";
import JobCard from "@/components/jobs/JobCard";

export default function JobFilterWorkspace({ initialJobs = [] }) {
  // ✅ FIXED: use simple string state (NOT Set)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [selectedWorkplace, setSelectedWorkplace] = useState("all");

  // Job type value
  const jobTypeVal = selectedJobType;
  const workplaceVal = selectedWorkplace;

  // ✅ FILTER LOGIC
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      // 1. Search filter
      const matchesSearch =
        !searchQuery ||
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.category?.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Job type filter (safe comparison)
      const matchesType =
        jobTypeVal === "all" ||
        job.jobType?.toLowerCase() === jobTypeVal.toLowerCase();

      // 3. Workplace filter
      let matchesWorkplace = true;

      if (workplaceVal === "remote") {
        matchesWorkplace = job.isRemote === true;
      }

      if (workplaceVal === "onsite") {
        matchesWorkplace = job.isRemote === false;
      }

      return matchesSearch && matchesType && matchesWorkplace;
    });
  }, [initialJobs, searchQuery, jobTypeVal, workplaceVal]);

  // Reset filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedJobType("all");
    setSelectedWorkplace("all");
  };

  const isFiltered =
    searchQuery !== "" || jobTypeVal !== "all" || workplaceVal !== "all";

  return (
    <div className="w-full max-w-6xl mx-auto p-6 min-h-screen text-white">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Explore Open Positions
          </h2>
          <p className="text-sm text-[#71717a]">
            Discover opportunities, review role structures, and apply instantly.
          </p>
        </div>

        {isFiltered && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-xs font-medium text-[#f31260] bg-[#f31260]/10 border border-[#f31260]/20 px-3 py-1.5 rounded-lg hover:bg-[#f31260]/20 transition-colors"
          >
            <Xmark className="w-3.5 h-3.5" /> Clear Filters
          </button>
        )}
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 items-end">
        {/* SEARCH */}
        <div className="md:col-span-6">
          <TextField className="w-full">
            <InputGroup className="border border-[#222226] bg-[#121214] text-white rounded-xl h-11 px-3 items-center">
              <InputGroup.Prefix className="text-[#71717a] mr-2">
                <Magnifier className="w-4 h-4" />
              </InputGroup.Prefix>

              <InputGroup.Input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full outline-none text-sm text-white placeholder-[#71717a]"
              />
            </InputGroup>
          </TextField>
        </div>

        {/* JOB TYPE */}
        <div className="md:col-span-3">
          <Select
            selectedKeys={selectedJobType}
            onSelectionChange={(value) =>
              setSelectedJobType(String(value ?? "all"))
            }
          >
            <Select.Trigger className="w-full border border-[#222226] bg-[#121214] text-white rounded-xl px-3 h-11 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#71717a]" />
                <Select.Value>
                  {jobTypeVal === "all"
                    ? "All Job Types"
                    : jobTypeVal.replace("-", " ")}
                </Select.Value>
              </div>
            </Select.Trigger>

            <Select.Popover className="border border-[#222226] bg-[#121214] rounded-xl mt-1">
              <ListBox className="p-1">
                <ListBox.Item id="all">All Job Types</ListBox.Item>
                <ListBox.Item id="full-time">Full-time</ListBox.Item>
                <ListBox.Item id="part-time">Part-time</ListBox.Item>
                <ListBox.Item id="contract">Contract</ListBox.Item>
                <ListBox.Item id="internship">Internship</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* WORKPLACE */}
        <div className="md:col-span-3">
          <Select
            selectedKeys={selectedWorkplace}
            onSelectionChange={(value) =>
              setSelectedWorkplace(String(value ?? "all"))
            }
          >
            <Select.Trigger className="w-full border border-[#222226] bg-[#121214] text-white rounded-xl px-3 h-11 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#71717a]" />
                <Select.Value>
                  {workplaceVal === "all"
                    ? "All Formats"
                    : workplaceVal === "remote"
                      ? "Remote Only"
                      : "On-site Only"}
                </Select.Value>
              </div>
            </Select.Trigger>

            <Select.Popover className="border border-[#222226] bg-[#121214] rounded-xl mt-1">
              <ListBox className="p-1">
                <ListBox.Item id="all">All Formats</ListBox.Item>
                <ListBox.Item id="remote">Remote Only</ListBox.Item>
                <ListBox.Item id="onsite">On-site Only</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      {/* RESULTS */}
      {filteredJobs.length === 0 ? (
        <div className="border border-[#222226] bg-[#121214] rounded-xl p-12 text-center">
          <p className="text-white font-medium">No jobs found</p>
          <p className="text-sm text-[#71717a]">
            Try changing filters or search terms
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id?.$oid || job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
