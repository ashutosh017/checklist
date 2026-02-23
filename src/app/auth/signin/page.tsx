"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Github, Chrome, Disc } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";

  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-16 px-6">
      <div className="max-w-md w-full bg-card rounded-2xl border border-border p-10 shadow-2xl animate-fade-in">
        <div className="flex flex-col items-center text-center mb-10 space-y-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-[14px] text-primary-foreground font-black glow-primary">
            CL
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight">Welcome Back.</h1>
            <p className="text-muted-foreground text-sm font-medium">Initialize your tracking protocol.</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("github", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-widest border border-border transition-all active:scale-95 group"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Continue with GitHub
          </button>

                      <button
                        onClick={() => signIn("google", { callbackUrl })}
                        className="w-full flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-widest border border-border transition-all active:scale-95 group"
                      >
                        <Chrome className="w-5 h-5 group-hover:scale-110 transition-transform text-primary" />
                        Continue with Google
                      </button>
                    </div>
                  <p className="mt-10 text-center text-[10px] text-muted-foreground font-black uppercase tracking-widest leading-relaxed">
          By signing in, you agree to the <br /> 
          <span className="text-primary hover:underline cursor-pointer">Terms of Execution</span> and <br />
          <span className="text-primary hover:underline cursor-pointer">Privacy Protocol</span>.
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <Suspense fallback={<div className="flex items-center justify-center pt-32 text-muted-foreground uppercase text-xs font-black tracking-widest">Loading Protocol...</div>}>
        <SignInContent />
      </Suspense>
    </div>
  );
}
