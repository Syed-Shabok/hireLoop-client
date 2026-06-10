"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  Input,
  Select,
  Label,
  ListBox,
  Button,
  Card,
  toast,
} from "@heroui/react";
import { MapPin, PaperPlane, Xmark } from "@gravity-ui/icons";
import { createJob } from "@/lib/actions/jobs";
import { useRouter } from "next/navigation";

export default function NewJobForm({ company }) {
  console.log("Received company data in NewJobForm:", company);

  const [isRemote, setIsRemote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const router = useRouter();

  const categories = [
    { id: "development", name: "Software Development" },
    { id: "design", name: "UI/UX Design" },
    { id: "marketing", name: "Digital Marketing" },
    { id: "product", name: "Product Management" },
  ];

  const jobTypes = [
    { id: "full-time", name: "Full-time" },
    { id: "part-time", name: "Part-time" },
    { id: "contract", name: "Contract" },
    { id: "internship", name: "Internship" },
  ];

  const currencies = [
    { id: "USD", name: "USD ($)" },
    { id: "EUR", name: "EUR (€)" },
    { id: "GBP", name: "GBP (£)" },
    { id: "BDT", name: "BDT (৳)" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Injecting company data and state-bound parameters into the final listing payload
    data.companyId = company._id || "company123";
    data.companyName = company.name || "SkillSphere Labs Ltd.";
    data.companyLogo = company.logoUrl || "https://via.placeholder.com/150";
    data.isRemote = isRemote;
    data.status = "active";

    if (Number(data.minSalary) > Number(data.maxSalary)) {
      setFormErrors({
        maxSalary:
          "Maximum budget limit must exceed the minimum allocation floor.",
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log(
        "Saving job configuration payload with automated company data:",
        data,
      );

      const res = await createJob(data);

      if (res.insertedId) {
        toast.success("Job Posted Successfully!");
        e.target.reset();
        setIsRemote(false);
        router.push("/dashboard/recruiter/jobs");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-[700px] bg-[#121214] border border-[#222226] rounded-xl shadow-2xl overflow-hidden">
        {/* Header Block */}
        <div className="relative p-6 border-b border-[#222226]">
          <h1 className="text-xl font-semibold text-white tracking-tight">
            Post a New Job Opportunity
          </h1>
          <p className="text-sm text-[#71717a] mt-1">
            Enter the opening parameters to broadcast this vacancy publicly.
          </p>
          <button
            type="button"
            className="absolute top-6 right-6 text-[#a1a1aa] hover:text-white transition-colors"
            aria-label="Close form"
          >
            <Xmark width={18} height={18} />
          </button>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col">
          {/* Main Content Area */}
          <div className="p-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* SECTION 1: Job Core Info */}
            <Fieldset className="flex flex-col gap-5 border-0 p-0 m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#e4e4e7] mb-2">
                    Job Title
                  </label>
                  <div className="relative flex items-center bg-[#1a1a1e] border border-[#2e2e33] hover:border-[#3f3f46] focus-within:!border-white rounded-lg h-10 transition-colors px-3">
                    <Input
                      required
                      name="title"
                      type="text"
                      placeholder="e.g. Lead Systems Engineer"
                      className="w-full bg-transparent border-none p-0 text-sm text-white placeholder-[#52525b] focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  {/* Added name property here */}
                  <Select
                    name="category"
                    placeholder="Select a field"
                    className="w-full"
                    required
                  >
                    <Label className="text-sm font-medium text-[#e4e4e7] mb-2">
                      Job Category
                    </Label>
                    <Select.Trigger className="w-full h-10 border border-[#2e2e33] hover:border-[#3f3f46] bg-[#1a1a1e] rounded-lg px-3 flex items-center justify-between text-sm text-white transition-colors">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Popover className="bg-[#121214] border border-[#222226] rounded-lg p-1 shadow-xl">
                      <ListBox>
                        {categories.map((cat) => (
                          <ListBox.Item
                            id={cat.id}
                            textValue={cat.name}
                            key={cat.id}
                            className="p-2 text-sm text-[#e4e4e7] rounded-md cursor-pointer hover:bg-[#1a1a1e] hover:text-white transition-colors"
                          >
                            {cat.name}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  {/* Added name property here */}
                  <Select
                    name="jobType"
                    placeholder="Select type"
                    className="w-full"
                    required
                  >
                    <Label className="text-sm font-medium text-[#e4e4e7] mb-2">
                      Employment Terms
                    </Label>
                    <Select.Trigger className="w-full h-10 border border-[#2e2e33] hover:border-[#3f3f46] bg-[#1a1a1e] rounded-lg px-3 flex items-center justify-between text-sm text-white transition-colors">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Popover className="bg-[#121214] border border-[#222226] rounded-lg p-1 shadow-xl">
                      <ListBox>
                        {jobTypes.map((type) => (
                          <ListBox.Item
                            id={type.id}
                            textValue={type.name}
                            key={type.id}
                            className="p-2 text-sm text-[#e4e4e7] rounded-md cursor-pointer hover:bg-[#1a1a1e] hover:text-white transition-colors"
                          >
                            {type.name}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#e4e4e7] mb-2">
                    Application Deadline
                  </label>
                  <div className="relative flex items-center bg-[#1a1a1e] border border-[#2e2e33] hover:border-[#3f3f46] focus-within:!border-white rounded-lg h-10 transition-colors px-3">
                    <Input
                      required
                      name="deadline"
                      type="date"
                      className="w-full bg-transparent border-none p-0 text-sm text-white placeholder-[#52525b] focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            </Fieldset>

            {/* SECTION 2: Financial Matrix */}
            <Fieldset className="flex flex-col gap-4 border-0 p-0 m-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#e4e4e7] mb-2">
                    Minimum Salary
                  </label>
                  <div className="relative flex items-center bg-[#1a1a1e] border border-[#2e2e33] hover:border-[#3f3f46] focus-within:!border-white rounded-lg h-10 transition-colors px-3">
                    <Input
                      required
                      name="minSalary"
                      type="number"
                      placeholder="Min Base"
                      className="w-full bg-transparent border-none p-0 text-sm text-white placeholder-[#52525b] focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#e4e4e7] mb-2">
                    Maximum Salary
                  </label>
                  <div className="relative flex items-center bg-[#1a1a1e] border border-[#2e2e33] hover:border-[#3f3f46] focus-within:!border-white rounded-lg h-10 transition-colors px-3">
                    <Input
                      required
                      name="maxSalary"
                      type="number"
                      placeholder="Max Limit"
                      className="w-full bg-transparent border-none p-0 text-sm text-white placeholder-[#52525b] focus:outline-none focus:ring-0"
                    />
                  </div>
                  {formErrors.maxSalary && (
                    <span className="text-xs text-red-400 mt-1 font-medium">
                      {formErrors.maxSalary}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  {/* Added name property here */}
                  <Select name="currency" defaultValue="USD" className="w-full">
                    <Label className="text-sm font-medium text-[#e4e4e7] mb-2">
                      Currency
                    </Label>
                    <Select.Trigger className="w-full h-10 border border-[#2e2e33] hover:border-[#3f3f46] bg-[#1a1a1e] rounded-lg px-3 flex items-center justify-between text-sm text-white transition-colors">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Popover className="bg-[#121214] border border-[#222226] rounded-lg p-1 shadow-xl">
                      <ListBox>
                        {currencies.map((curr) => (
                          <ListBox.Item
                            id={curr.id}
                            textValue={curr.name}
                            key={curr.id}
                            className="p-2 text-sm text-[#e4e4e7] rounded-md cursor-pointer hover:bg-[#1a1a1e] hover:text-white transition-colors"
                          >
                            {curr.name}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>
            </Fieldset>

            {/* SECTION 3: Location Strategy */}
            <Fieldset className="flex flex-col gap-4 border-0 p-0 m-0">
              <div className="flex items-center justify-between p-3 bg-[#1a1a1e] border border-[#222226] rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-[#e4e4e7]">
                    Remote Position
                  </h4>
                  <p className="text-xs text-[#71717a]">
                    Omit localization parameters for distributed work.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={isRemote}
                  onChange={(e) => setIsRemote(e.target.checked)}
                  className="w-4 h-4 rounded border-[#2e2e33] bg-[#121214] text-white focus:ring-0 focus:ring-offset-0 accent-white cursor-pointer"
                />
              </div>

              {!isRemote && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#e4e4e7] mb-2">
                      Location
                    </label>
                    <div className="relative flex items-center bg-[#1a1a1e] border border-[#2e2e33] hover:border-[#3f3f46] focus-within:!border-white rounded-lg h-10 transition-colors px-3 gap-2">
                      <MapPin
                        width={16}
                        height={16}
                        className="text-[#52525b] shrink-0"
                      />
                      <Input
                        required={!isRemote}
                        name="city"
                        type="text"
                        placeholder="City, Country"
                        className="w-full bg-transparent border-none p-0 text-sm text-white placeholder-[#52525b] focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Fieldset>

            {/* SECTION 4: Specifications */}
            <Fieldset className="flex flex-col gap-4 border-0 p-0 m-0">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#e4e4e7] mb-2">
                  Core Responsibilities
                </label>
                <textarea
                  required
                  name="responsibilities"
                  rows={4}
                  placeholder="Tell us about the routine metrics and project delivery expectations..."
                  className="w-full p-3 text-sm rounded-lg border border-[#2e2e33] bg-[#1a1a1e] text-white placeholder-[#52525b] focus:outline-none focus:border-white hover:border-[#3f3f46] transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#e4e4e7] mb-2">
                  Requirements & Qualifications
                </label>
                <textarea
                  required
                  name="requirements"
                  rows={4}
                  placeholder="Mandatory runtimes, tech stacks, or professional prerequisites..."
                  className="w-full p-3 text-sm rounded-lg border border-[#2e2e33] bg-[#1a1a1e] text-white placeholder-[#52525b] focus:outline-none focus:border-white hover:border-[#3f3f46] transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#e4e4e7] mb-2">
                  Benefits & Perks (Optional)
                </label>
                <textarea
                  name="benefits"
                  rows={3}
                  placeholder="Healthcare provisions, remote equipment setup capital..."
                  className="w-full p-3 text-sm rounded-lg border border-[#2e2e33] bg-[#1a1a1e] text-white placeholder-[#52525b] focus:outline-none focus:border-white hover:border-[#3f3f46] transition-colors resize-none"
                />
              </div>
            </Fieldset>
          </div>

          {/* Action Footer */}
          <div className="p-6 border-t border-[#222226] bg-[#161619] flex items-center justify-end gap-3">
            <Button
              className="bg-transparent hover:bg-[#1a1a1e] text-[#e4e4e7] font-medium rounded-lg px-4 border border-[#2e2e33] h-10 text-sm transition-colors cursor-pointer"
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-white hover:bg-[#e4e4e7] text-black font-semibold rounded-lg px-5 h-10 text-sm transition-colors flex items-center justify-center cursor-pointer"
            >
              {!isLoading && (
                <PaperPlane width={14} height={14} className="mr-2" />
              )}
              Create
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
