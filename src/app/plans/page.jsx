"use client";

import React, { useState } from "react";
import {
  Card,
  Button,
  Accordion,
  AccordionItem,
  Switch,
  Chip,
} from "@heroui/react";
import {
  Package,
  ShoppingBag,
  CircleInfo,
  Lock,
  Xmark,
} from "@gravity-ui/icons";
import Link from "next/link";

export default function PricingPage() {
  const [targetGroup, setTargetGroup] = useState("seeker"); // 'seeker' or 'recruiter'

  // Refined Seeker Plans from text and image_4.png
  const seekerPlans = [
    {
      name: "Free",
      id: "seeker_free",
      price: "$0",
      period: "forever",
      description:
        "BROWSE & SAVE UP TO 10 JOBS, APPLY TO UP TO 3 JOBS PER MONTH, BASIC PROFILE, EMAIL ALERTS",
      variant: "bordered",
      borderColor: "border-[#2e2e33]",
      ctaText: "Get Free Access",
    },
    {
      name: "Pro",
      id: "seeker_pro",
      price: "$19",
      period: "month",
      description:
        "APPLY TO UP TO 30 JOBS PER MONTH, UNLIMITED SAVED JOBS, APPLICATION TRACKING, SALARY INSIGHTS",
      variant: "bordered",
      borderColor: "border-violet-500",
      ctaText: "Upgrade Matrix",
    },
    {
      name: "Premium",
      id: "seeker_premium",
      price: "$39",
      period: "month",
      description:
        "Everything in Pro + unlimited applications, profile boost to recruiters, early access to new jobs, priority support",
      variant: "flat",
      backgroundColor: "bg-[#161619]",
      ctaText: "Deploy Premium",
    },
  ];

  // Refined Recruiter Plans from text and image_4.png
  const recruiterPlans = [
    {
      name: "Free",
      id: "recruiter_free",
      price: "$0",
      period: "forever",
      description:
        "UP TO 3 ACTIVE JOB POSTS, BASIC APPLICANT MANAGEMENT, STANDARD LISTING VISIBILITY (GREAT FOR A COMPANY'S FIRST YEAR OF HIRING)",
      variant: "bordered",
      borderColor: "border-[#2e2e33]",
      ctaText: "Launch Free",
    },
    {
      name: "Growth",
      id: "recruiter_growth",
      price: "$49",
      period: "month",
      description:
        "UP TO 10 ACTIVE JOB POSTS, APPLICANT TRACKING, BASIC ANALYTICS, EMAIL SUPPORT",
      variant: "bordered",
      borderColor: "border-violet-500",
      ctaText: "Scale Parameters",
    },
    {
      name: "Enterprise",
      id: "recruiter_enterprise",
      price: "$149",
      period: "month",
      description:
        "UP TO 50 ACTIVE JOB POSTS, ADVANCED ANALYTICS DASHBOARD, FEATURED JOB LISTINGS, TEAM COLLABORATION, CUSTOM BRANDING, PRIORITY SUPPORT",
      variant: "flat",
      backgroundColor: "bg-[#161619]",
      ctaText: "Enterprise Matrix",
    },
  ];

  // Mapping plans based on active toggle state
  const activePlans = targetGroup === "seeker" ? seekerPlans : recruiterPlans;

  // FAQ matrix data
  const faqs = [
    {
      title:
        "How do standardized plan persistence cancellation parameters execute?",
      content:
        "Operational cancellation routines can be initialized directly from your central matrix parameter panel. Services will persist standard until the termination of your current operational cycle context.",
    },
    {
      title: "What is the systematic refund context policy?",
      content:
        "Refund persistence is typically not registered due to the persistent digital delivery of matrix parameters. However, exceptions can be initialized under specific operational anomaly conditions.",
    },
    {
      title: "Which payment matrix configurations are standardized?",
      content:
        "System accepts primary card matrix protocols, including universal persistent credit/debit card streams.",
    },
    {
      title: "Is dynamic plan switching initialized mid-cycle?",
      content:
        "Persistent operational parameters can be updated dynamically. Pro-rated parameters will be recalculated automatically to align with the new systematic operational context.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white py-12 md:py-16 px-4 dark:text-neutral-100">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-10">
        {/* 1. Header & Dynamic Toggle Matrix */}
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Matrix Configuration Plans
            </h1>
            <p className="text-sm text-[#71717a] mt-1 dark:text-neutral-400">
              Initialize flexible configurations to scale your systematic
              operational hiring context.
            </p>
          </div>

          <div className="flex items-center gap-3 p-1 bg-[#121214] border border-[#222226] rounded-full">
            <Button
              size="sm"
              variant={targetGroup === "seeker" ? "flat" : "light"}
              className={`rounded-full px-5 text-sm font-medium ${targetGroup === "seeker" ? "bg-white text-black font-semibold" : "text-[#e4e4e7] hover:bg-[#1a1a1e]"}`}
              onClick={() => setTargetGroup("seeker")}
            >
              For Job Seekers
            </Button>
            <Button
              size="sm"
              variant={targetGroup === "recruiter" ? "flat" : "light"}
              className={`rounded-full px-5 text-sm font-medium ${targetGroup === "recruiter" ? "bg-white text-black font-semibold" : "text-[#e4e4e7] hover:bg-[#1a1a1e]"}`}
              onClick={() => setTargetGroup("recruiter")}
            >
              For Recruiters
            </Button>
          </div>
        </div>

        {/* 2. Standardized Plan Tiers Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activePlans.map((plan) => (
            <Card
              key={plan.name}
              variant={plan.variant}
              className={`flex flex-col p-8 bg-[#121214] border ${plan.borderColor || "border-[#222226]"} rounded-xl shadow-2xl overflow-hidden ${plan.backgroundColor || ""}`}
            >
              <div className="flex flex-col gap-1.5 mb-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="p-3 bg-[#1a1a1e] text-[#a1a1aa] border border-[#2e2e33] rounded-lg shrink-0">
                    <ShoppingBag width={24} height={24} />
                  </div>
                  {plan.variant === "flat" && (
                    <Chip
                      size="sm"
                      variant="flat"
                      color="success"
                      className="font-medium text-xs capitalize"
                    >
                      Optimal Matrix
                    </Chip>
                  )}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-white mt-4">
                  {plan.name} configuration
                </h3>
                <div className="flex flex-col mt-1">
                  <p className="text-4xl font-bold tracking-tight text-white">
                    {plan.price}
                  </p>
                  <p className="text-xs text-[#a1a1aa] mt-0.5">
                    / {plan.period} persistence
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#e4e4e7] flex-grow leading-relaxed">
                {plan.description}
              </p>

              <form action="/api/checkout_sessions" method="POST">
                <input type="hidden" name="plain_id" value={plan.id} />
                <section>
                  <button
                    type="submit"
                    role="link"
                    className={`mt-10 font-semibold text-sm w-full py-3 rounded-lg flex items-center justify-center transition ${plan.variant === "flat" ? "bg-white hover:bg-[#e4e4e7] text-black" : "border border-[#2e2e33] hover:border-[#3f3f46] text-[#e4e4e7]"}`}
                  >
                    <ShoppingBag width={16} height={16} className="mr-2.5" />
                    Checkout
                  </button>
                </section>
              </form>

              {/* <Link href={`/auth/signup`}>
                <Button
                  fullWidth
                  size="md"
                  variant={plan.variant === "flat" ? "solid" : "bordered"}
                  
                >
                  {plan.ctaText}
                </Button>
              </Link> */}
            </Card>
          ))}
        </div>

        {/* 3. FAQ Matrix: Standardized Operational Parameters */}
        <div className="w-full max-w-4xl mx-auto mt-12 flex flex-col gap-8 p-6 bg-[#121214] border border-[#222226] rounded-2xl shadow-2xl">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              FAQ Matrix: Standardized Operational Parameters
            </h2>
            <p className="text-sm text-[#71717a] mt-1 dark:text-neutral-400">
              Initialize flexible configurations to scale your systematic
              operational hiring context.
            </p>
          </div>

          <Accordion
            variant="splitted"
            classNames={{
              item: "bg-transparent",
              title: "text-sm text-[#a1a1aa] hover:text-white font-medium",
              indicator: "text-[#a1a1aa]",
              trigger: "px-2 py-4",
            }}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={`FAQ Question ${index + 1}`}
                title={faq.title}
                indicator={<Xmark width={16} height={16} />}
              >
                <div className="p-4 bg-[#1a1a1e] border border-[#2e2e33] rounded-xl text-xs text-[#a1a1aa]">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2.5 text-[#e4e4e7]">
                      <div className="p-1.5 bg-[#222226] border border-[#2e2e33] rounded-lg text-[#a1a1aa]">
                        <CircleInfo width={18} height={18} />
                      </div>
                      <p className="text-sm font-semibold tracking-tight">
                        FAQ Matrix: Standardized Parameters
                      </p>
                    </div>
                    <p className="leading-relaxed">{faq.content}</p>
                    <p className="mt-1 text-violet-400 hover:text-violet-300 transition-colors font-medium">
                      System requires standardized plan persistence.
                    </p>
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
