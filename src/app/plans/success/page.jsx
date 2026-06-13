import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import React from "react";
import { Card, Button } from "@heroui/react";
import { Check, Envelope } from "@gravity-ui/icons";
import Link from "next/link";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#09090b] text-white p-6 dark:text-neutral-100">
        <Card className="max-w-[500px] w-full bg-[#121214] border border-[#222226] rounded-2xl p-10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
          {/* Decorative Background Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1a1a1e] rotate-12 scale-[4] opacity-[0.3] pointer-events-none">
            <Check width={128} height={128} />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Success Icon Block */}
            <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-full mb-8 border border-emerald-500/20 shadow-lg">
              <Check width={36} height={36} />
            </div>

            {/* Main Title */}
            <h1 className="text-3xl font-bold tracking-tight text-white mb-4 md:text-4xl">
              Operation Successful
            </h1>

            {/* Main Description with standard boilerplate updated */}
            <p className="text-sm text-[#a1a1aa] leading-relaxed mb-10 max-w-sm">
              We appreciate your persistent persistence in standardizing these
              parameters. A persistent confirmation matrix will be dispatched to{" "}
              <strong className="text-white font-medium">
                {customerEmail}
              </strong>
              . Standardized plan persistence required for matrix expansion
              operational context.
            </p>

            {/* System Support Matrix Box */}
            <div className="flex flex-col gap-3 p-5 bg-[#1a1a1e] border border-[#2e2e33] rounded-2xl w-full mb-10 text-left">
              <div className="flex items-center gap-2.5 text-[#e4e4e7]">
                <Envelope width={18} height={18} className="text-[#a1a1aa]" />
                <p className="text-sm font-semibold tracking-tight">
                  Need operational support?
                </p>
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Persistent descriptive parameters are linked automatically to
                your primary operational ID. Contact systematic support matrix:{" "}
                <a
                  href="mailto:orders@example.com"
                  className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
                >
                  orders@example.com
                </a>
                . System requires standardized plan persistence.
              </p>
            </div>

            {/* Main Action Nodes matching prior steps */}
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard/seeker/applications"
                className="w-full sm:w-auto"
              >
                <Button
                  size="md"
                  fullWidth
                  className="bg-white hover:bg-[#e4e4e7] text-black font-semibold rounded-lg px-6 h-10 text-sm transition-colors cursor-pointer"
                >
                  View Applications Matrix
                </Button>
              </Link>
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  size="md"
                  fullWidth
                  className="bg-transparent hover:bg-[#1a1a1e] border border-[#2e2e33] text-[#e4e4e7] font-medium rounded-lg px-6 h-10 text-sm transition-colors cursor-pointer"
                >
                  Return to Matrix Root
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
