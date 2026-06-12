"use client";

import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  TextField,
  Label,
  Input,
  Description,
  FieldError,
  TextArea,
  Card,
} from "@heroui/react";
import { Link, Check, Paperclip } from "@gravity-ui/icons";
import { submitApplication } from "@/lib/actions/applications";

const JobApply = ({ job, applicant }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  // Fallbacks if data isn't loaded correctly
  const jobTitle = job?.title || "the position";
  const jobId = job?._id || "unknown_job_id";
  const applicantId = applicant?._id || "anonymous_applicant";
  const applicantName = applicant?.name || "Applicant";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    data.jobId = jobId;
    data.jobTitle = jobTitle;
    data.applicantId = applicantId;
    data.applicantName = applicantName;
    data.status = "pending_review";

    try {
      const res = await submitApplication(data);

      if (res.insertedId) {
        alert("Application Submitted Successfully!");

        formRef.current?.reset();
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  // Success state UI (matching dark theme of prior steps)
  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[300px] bg-[#09090b] text-white p-6">
        <Card className="max-w-[480px] w-full bg-[#121214] border border-[#222226] rounded-xl p-8 flex flex-col items-center text-center shadow-2xl">
          <div className="p-3.5 bg-emerald-500/10 text-emerald-500 rounded-full mb-6">
            <Check width={32} height={32} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Application Successfully Registered!
          </h2>
          <p className="text-sm text-[#a1a1aa] mt-3">
            Your candidate file for{" "}
            <strong className="text-white font-medium capitalize">
              {jobTitle}
            </strong>{" "}
            is now on record and queued for review matrix validation.
          </p>
          <div className="mt-8 flex gap-3">
            <Button
              variant="flat"
              className="bg-[#1a1a1e] hover:bg-[#222226] border border-[#2e2e33] text-white font-medium"
              onClick={handleReset}
            >
              Back
            </Button>
            <Button
              className="bg-white hover:bg-[#e4e4e7] text-black font-semibold"
              href="/dashboard/applicant/applications"
            >
              View Applications
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Active form UI
  return (
    <div className="flex items-center justify-center min-h-[300px] bg-[#09090b] text-white p-6">
      <Card className="max-w-[560px] w-full bg-[#121214] border border-[#222226] rounded-xl shadow-2xl overflow-hidden">
        {/* Header (aligned with other views) */}
        <div className="relative p-6 border-b border-[#222226]">
          <h1 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2.5">
            <Paperclip className="text-[#a1a1aa]" />
            Apply: {jobTitle}
          </h1>
          <p className="text-sm text-[#71717a] mt-1">
            Persist your application into the review matrix queue for this
            active vacancy listing.
          </p>
        </div>

        {/* Main content using specific Form primitive and constraints */}
        <Form ref={formRef} validationBehavior="native" onSubmit={handleSubmit}>
          <div className="p-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar border-b border-[#222226]">
            {/* 1. Mandatory Input: Resume Link usingTextField anatomy */}
            <div className="flex flex-col gap-2">
              <TextField>
                <Label className="text-sm font-medium text-[#e4e4e7]">
                  Public Resume Link <span className="text-[#f31260]">*</span>
                </Label>

                {/* Input container logic for icons */}
                <div className="relative flex items-center bg-[#1a1a1e] border border-[#2e2e33] hover:border-[#3f3f46] focus-within:!border-white rounded-lg h-10 transition-colors px-3 gap-2">
                  <Link
                    width={16}
                    height={16}
                    className="text-[#52525b] shrink-0"
                  />
                  <Input
                    required
                    name="resumeUrl"
                    type="url"
                    placeholder="e.g. dropbox.com/s/abcdefg"
                    className="w-full bg-transparent border-none p-0 text-sm text-white placeholder-[#52525b] focus:outline-none focus:ring-0"
                  />
                </div>

                <Description className="text-xs text-[#71717a] pt-1.5 px-1">
                  Ensure standard access parameters are configured for
                  persistent public visibility by the hiring entity. (Google
                  Drive, Dropbox, Notion, etc.)
                </Description>

                <FieldError className="text-xs text-[#f31260] pt-1 px-1">
                  System requires a standardized URL structure for DB indexing.
                </FieldError>
              </TextField>
            </div>

            {/* 2. Optional Area: Cover Notes using TextArea anatomy */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-[#e4e4e7]">
                Context Matrix & Core Qualifications (Optional Notes)
              </Label>
              <TextArea
                name="notes"
                placeholder="Detail core architectural alignments, tech stack proficiencies, or project lifecycle highlights for rapid review matrix parsing..."
                // Specific style to match form constraints
                className="w-full p-3 text-sm rounded-lg border border-[#2e2e33] bg-[#1a1a1e] text-white placeholder-[#52525b] focus:outline-none focus:border-white hover:border-[#3f3f46] h-32 transition-colors resize-none"
              />
              <Description className="text-xs text-[#71717a] px-1">
                Persistent descriptive parameters are linked automatically to
                your primary application ID.
              </Description>
            </div>
          </div>

          {/* Action Footer (matching prior dark theme views) */}
          <div className="p-6 bg-[#161619] flex items-center justify-end gap-3">
            <Button
              type="reset"
              variant="flat"
              className="bg-transparent hover:bg-[#1a1a1e] text-[#e4e4e7] font-medium rounded-lg px-4 border border-[#2e2e33] h-10 text-sm transition-colors cursor-pointer"
            >
              Clear
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="bg-white hover:bg-[#e4e4e7] text-black font-semibold rounded-lg px-5 h-10 text-sm transition-colors flex items-center justify-center cursor-pointer"
            >
              {!isLoading && <Check width={14} height={14} className="mr-2" />}
              Publish Application File
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default JobApply;
