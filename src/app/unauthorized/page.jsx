import React from "react";
import { Card, Button } from "@heroui/react";
import { Lock, ArrowLeft } from "@gravity-ui/icons";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#09090b] px-4 py-12 text-white">
      <Card className="w-full max-w-md bg-[#121214] border border-[#222226] rounded-xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
        {/* Decorative Background Icon Stream */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1a1a1e] rotate-12 scale-[3.5] opacity-[0.2] pointer-events-none">
          <Lock width={128} height={128} />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Visual Alert Icon Block */}
          <div className="p-4 bg-[#f31260]/10 text-[#f31260] rounded-full mb-6 border border-[#f31260]/20 shadow-xl">
            <Lock width={32} height={32} />
          </div>

          {/* Header Parameters */}
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-5xl mb-5">
            401
          </h1>
          <h1 className="text-xl font-bold tracking-tight text-white md:text-2xl">
            Unauthorized Access
          </h1>

          {/* System Validation Message */}
          <p className="text-sm text-[#a1a1aa] mt-4 max-w-sm leading-relaxed">
            Your current credential matrix lacks the persistent clearance
            parameters required for this operational context. System has
            intercepted and logged this authorization anomaly.
          </p>

          {/* Action Context Layer */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3.5 w-full justify-center">
            <Link href="/" className="w-full sm:w-auto">
              <Button
                size="md"
                fullWidth
                className="bg-white hover:bg-[#e4e4e7] text-black font-semibold rounded-lg px-5 h-10 text-sm transition-colors cursor-pointer"
              >
                Return Home
              </Button>
            </Link>

            <Link href="/auth/signin" className="w-full sm:w-auto">
              <Button
                size="md"
                fullWidth
                className="bg-transparent hover:bg-[#1a1a1e] text-[#e4e4e7] border border-[#2e2e33] hover:border-[#3f3f46] font-medium rounded-lg px-5 h-10 text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowLeft width={14} height={14} />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
