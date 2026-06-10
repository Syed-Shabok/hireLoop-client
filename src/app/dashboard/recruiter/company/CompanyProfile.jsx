"use client";

import React, { useState, useRef } from "react";
import {
  Form,
  Fieldset,
  Input,
  Select,
  Label,
  ListBox,
  Button,
  toast,
} from "@heroui/react";
import { createCompany } from "@/lib/actions/companies";

// Using simple SVG paths for icons to ensure plug-and-play compatibility without package mismatches
const BuildingIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg
    className="w-4 h-4 text-[#71717a]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 12H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    className="w-4 h-4 text-[#71717a]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    className="w-5 h-5 text-[#71717a]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  // Fix: Check if company info exists initially to route away from the unregistered block if data loaded
  const [viewMode, setViewState] = useState(
    recruiterCompany && recruiterCompany.name ? "registered" : "unregistered",
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  // Core Persistent Data Model State
  const [company, setCompany] = useState({
    name: "",
    logoUrl: "",
    websiteUrl: "",
    industry: "",
    location: "",
    employeeCount: "",
    description: "",
    recruiterId: recruiter?.id || "",
    status: "Pending",
    ...recruiterCompany,
  });

  // Working transaction memory state for input fields
  const [formValues, setFormValues] = useState({ ...company });

  const staticIndustries = [
    { id: "tech", name: "Technology" },
    { id: "design", name: "Design & Creative" },
    { id: "marketing", name: "Marketing" },
    { id: "finance", name: "Finance" },
  ];

  const staticEmployeeRanges = [
    { id: "1-10", name: "1-10 employees" },
    { id: "11-50", name: "11-50 employees" },
    { id: "51-200", name: "51-200 employees" },
    { id: "201+", name: "201+ employees" },
  ];

  // ImgBB Upload Handler Integration
  const handleLogoImgBBUpload = async (e) => {
    const assetFile = e.target.files[0];
    if (!assetFile) return;

    setIsUploading(true);
    const uploadPayload = new FormData();
    uploadPayload.append("image", assetFile);

    try {
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: uploadPayload,
        },
      );

      const parsedData = await response.json();
      if (parsedData.success) {
        setFormValues((prev) => ({ ...prev, logoUrl: parsedData.data.url }));
      } else {
        alert("Upload failed: " + parsedData.error.message);
      }
    } catch (error) {
      console.error("ImgBB API Asset dispatch error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectField = (fieldName, itemValue) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: itemValue }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedCompany = {
      ...formValues,
      status: isEditing ? company.status : "Pending",
    };

    // Simulate database update
    setCompany(updatedCompany);
    setIsEditing(false);
    setViewState("registered");

    console.log("Submitting company profile data:", updatedCompany);

    const payload = await createCompany(updatedCompany);

    if (payload?.insertedId) {
      toast.success("Company profile created successfully!");
    }
  };

  const startRegistration = () => {
    setFormValues({
      name: "",
      logoUrl: "",
      websiteUrl: "",
      industry: "Technology",
      location: "",
      employeeCount: "1-10 employees",
      description: "",
      recruiterId: recruiter?.id || "",
      status: "Pending",
    });
    setIsEditing(false);
    setViewState("form");
  };

  const startEditing = () => {
    setFormValues({ ...company });
    setIsEditing(true);
    setViewState("form");
  };

  // Status Badge visual parser mapping to your exact wireframe styling rules
  const getBadgeStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* 1. UNREGISTERED PROMPT STATE */}
      {viewMode === "unregistered" && (
        <div className="bg-[#121214] border border-[#222226] rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-14 h-14 bg-[#1a1a1e] border border-[#2e2e33] rounded-xl flex items-center justify-center text-[#e4e4e7]">
            <BuildingIcon />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">
              No Company Registered
            </h3>
            <p className="text-sm text-[#71717a] mt-1 max-w-sm">
              Your account currently is not assigned to any hiring entity. Setup
              your profile now to begin managing job posts.
            </p>
          </div>
          <Button
            onClick={startRegistration}
            className="bg-white hover:bg-[#e4e4e7] text-black font-semibold rounded-lg px-6 h-10 text-sm mt-2 transition-colors cursor-pointer"
          >
            Register Company
          </Button>
        </div>
      )}

      {/* 2. REGISTERED DETAILS VIEW STATE */}
      {viewMode === "registered" && (
        <div className="bg-[#121214] border border-[#222226] rounded-xl overflow-hidden shadow-xl">
          <div className="p-6 md:p-8 flex flex-col sm:flex-row items-start justify-between gap-6 border-b border-[#222226]">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* Company Logo Display Section */}
              <div className="w-20 h-20 bg-[#1a1a1e] border border-[#2e2e33] rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt="Company Branding Asset"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BuildingIcon />
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {company.name}
                  </h2>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 border rounded-full ${getBadgeStyle(company.status)}`}
                  >
                    {company.status}
                  </span>
                </div>

                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <GlobeIcon /> {company.websiteUrl}
                </a>
              </div>
            </div>

            <Button
              onClick={startEditing}
              className="bg-transparent hover:bg-[#1a1a1e] text-[#e4e4e7] font-medium rounded-lg px-4 border border-[#2e2e33] h-9 text-xs transition-colors cursor-pointer self-start sm:self-auto"
            >
              Edit Details
            </Button>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#141417]/50">
            <div className="md:col-span-2 flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                Company Description
              </span>
              <p className="text-sm text-[#e4e4e7] leading-relaxed whitespace-pre-wrap">
                {company.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 border-l border-[#222226]/60 pl-0 md:pl-6">
              <div>
                <span className="text-xs font-semibold text-[#71717a] uppercase tracking-wider block mb-1">
                  Industry
                </span>
                <span className="text-sm text-white font-medium">
                  {company.industry}
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold text-[#71717a] uppercase tracking-wider block mb-1">
                  Company Size
                </span>
                <span className="text-sm text-white font-medium">
                  {company.employeeCount}
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold text-[#71717a] uppercase tracking-wider block mb-1">
                  HQ Location
                </span>
                <span className="text-sm text-white font-medium inline-flex items-center gap-1.5">
                  <LocationIcon /> {company.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MUTATION FORM ENGINE: CREATING AND EDITING PROFILES */}
      {viewMode === "form" && (
        <div className="bg-[#121214] border border-[#222226] rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-[#222226]">
            <h2 className="text-lg font-bold text-white">
              {isEditing ? "Update Company Details" : "Register New Company"}
            </h2>
            <p className="text-xs text-[#71717a] mt-0.5">
              Enter your enterprise parameters below to configure global
              organization context.
            </p>
          </div>

          <Form onSubmit={handleFormSubmit} className="flex flex-col">
            <div className="p-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Identity Matrix */}
              <Fieldset className="flex flex-col gap-5 border-0 p-0 m-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#e4e4e7] mb-2">
                      Company Name
                    </label>
                    <div className="relative flex items-center bg-[#1a1a1e] border border-[#2e2e33] hover:border-[#3f3f46] focus-within:!border-white rounded-lg h-10 transition-colors px-3">
                      <Input
                        required
                        name="name"
                        type="text"
                        placeholder="e.g. Acme Corp"
                        value={formValues.name}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-none p-0 text-sm text-white placeholder-[#52525b] focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Select placeholder="Select Industry" className="w-full">
                      <Label className="text-sm font-medium text-[#e4e4e7] mb-2">
                        Industry / Category
                      </Label>
                      <Select.Trigger className="w-full h-10 border border-[#2e2e33] hover:border-[#3f3f46] bg-[#1a1a1e] rounded-lg px-3 flex items-center justify-between text-sm text-white transition-colors">
                        <Select.Value>{formValues.industry}</Select.Value>
                      </Select.Trigger>
                      <Select.Popover className="bg-[#121214] border border-[#222226] rounded-lg p-1 shadow-xl">
                        <ListBox>
                          {staticIndustries.map((ind) => (
                            <ListBox.Item
                              id={ind.id}
                              key={ind.id}
                              textValue={ind.name}
                              onClick={() =>
                                handleSelectField("industry", ind.name)
                              }
                              className="p-2 text-sm text-[#e4e4e7] rounded-md cursor-pointer hover:bg-[#1a1a1e] hover:text-white transition-colors"
                            >
                              {ind.name}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#e4e4e7] mb-2">
                      Website URL
                    </label>
                    <div className="relative flex items-center bg-[#1a1a1e] border border-[#2e2e33] hover:border-[#3f3f46] focus-within:!border-white rounded-lg h-10 transition-colors px-3">
                      <Input
                        required
                        name="websiteUrl"
                        type="url"
                        placeholder="https://example.com"
                        value={formValues.websiteUrl}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-none p-0 text-sm text-white placeholder-[#52525b] focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#e4e4e7] mb-2">
                      Location
                    </label>
                    <div className="relative flex items-center bg-[#1a1a1e] border border-[#2e2e33] hover:border-[#3f3f46] focus-within:!border-white rounded-lg h-10 transition-colors px-3 gap-2">
                      <LocationIcon />
                      <Input
                        required
                        name="location"
                        type="text"
                        placeholder="City, Country"
                        value={formValues.location}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-none p-0 text-sm text-white placeholder-[#52525b] focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <Select placeholder="Select size range" className="w-full">
                      <Label className="text-sm font-medium text-[#e4e4e7] mb-2">
                        Employee Count Range
                      </Label>
                      <Select.Trigger className="w-full h-10 border border-[#2e2e33] hover:border-[#3f3f46] bg-[#1a1a1e] rounded-lg px-3 flex items-center justify-between text-sm text-white transition-colors">
                        <Select.Value>{formValues.employeeCount}</Select.Value>
                      </Select.Trigger>
                      <Select.Popover className="bg-[#121214] border border-[#222226] rounded-lg p-1 shadow-xl">
                        <ListBox>
                          {staticEmployeeRanges.map((range) => (
                            <ListBox.Item
                              id={range.id}
                              key={range.id}
                              textValue={range.name}
                              onClick={() =>
                                handleSelectField("employeeCount", range.name)
                              }
                              className="p-2 text-sm text-[#e4e4e7] rounded-md cursor-pointer hover:bg-[#1a1a1e] hover:text-white transition-colors"
                            >
                              {range.name}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* Logo Upload Block */}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#e4e4e7] mb-2">
                      Company Logo
                    </span>
                    <div className="flex items-center gap-3 bg-[#1a1a1e] border border-[#2e2e33] rounded-lg h-10 px-3 overflow-hidden">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleLogoImgBBUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#27272a] hover:bg-[#3f3f46] border border-[#3f3f46] text-zinc-200 text-xs font-medium px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <UploadIcon />
                        {isUploading ? "Uploading..." : "Choose File"}
                      </button>
                      <span className="text-xs text-[#52525b] truncate flex-1">
                        {formValues.logoUrl
                          ? "✓ Image Loaded Successfully"
                          : "No file selected (Max 5MB)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#e4e4e7] mb-2">
                    Brief Description
                  </label>
                  <textarea
                    required
                    name="description"
                    rows={4}
                    placeholder="Tell us about your company's mission and culture..."
                    value={formValues.description}
                    onChange={handleInputChange}
                    className="w-full p-3 text-sm rounded-lg border border-[#2e2e33] bg-[#1a1a1e] text-white placeholder-[#52525b] focus:outline-none focus:border-white hover:border-[#3f3f46] transition-colors resize-none"
                  />
                </div>
              </Fieldset>
            </div>

            {/* Action Footer */}
            <div className="p-6 border-t border-[#222226] bg-[#161619] flex items-center justify-end gap-3">
              <Button
                onClick={() =>
                  setViewState(company.name ? "registered" : "unregistered")
                }
                className="bg-transparent hover:bg-[#1a1a1e] text-[#e4e4e7] font-medium rounded-lg px-4 border border-[#2e2e33] h-10 text-sm transition-colors cursor-pointer"
                type="button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUploading}
                className="bg-white hover:bg-[#e4e4e7] text-black font-semibold rounded-lg px-5 h-10 text-sm transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
              >
                {isEditing ? "Save Updates" : "Register Company"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
