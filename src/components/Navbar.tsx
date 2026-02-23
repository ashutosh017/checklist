"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, LayoutDashboard, PlusCircle } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-bold text-foreground hover:opacity-80 transition-opacity flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center text-[10px] text-primary-foreground font-black">
                CL
              </div>
              <span className="tracking-tight">Checklist</span>
            </Link>
            {session && (
              <div className="hidden md:flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <Link href="/dashboard" className="hover:text-primary flex items-center gap-1.5 transition-colors">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link href="/templates/new" className="hover:text-primary flex items-center gap-1.5 transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  New Checklist
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="h-4 w-[1px] bg-border" />
            {session ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground/80">
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold border border-border">
                    {session.user?.name?.charAt(0) || <User className="w-3.5 h-3.5" />}
                  </div>
                  <span className="hidden sm:inline-block">{session.user?.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all rounded-lg"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition-all active:scale-95 shadow-sm uppercase tracking-widest glow-primary"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
