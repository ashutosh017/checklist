"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, LayoutDashboard, PlusCircle, Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

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
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/docs" className="text-xs font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">
                Docs
              </Link>
              {session && (
                <div className="flex items-center gap-6">
                  <Link href="/dashboard" className="hover:text-primary flex items-center gap-1.5 transition-colors text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link href="/templates/new" className="hover:text-primary flex items-center gap-1.5 transition-colors text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <PlusCircle className="w-4 h-4" />
                    New Checklist
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
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

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in absolute w-full z-40 shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <Link 
              href="/docs" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-4 rounded-xl text-sm font-black text-foreground uppercase tracking-widest hover:bg-secondary border border-transparent hover:border-border transition-all"
            >
              <BookOpen className="w-5 h-5 text-primary" />
              Documentation
            </Link>
            
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-4 rounded-xl text-sm font-black text-foreground uppercase tracking-widest hover:bg-secondary border border-transparent hover:border-border transition-all"
                >
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                  Dashboard
                </Link>
                <Link 
                  href="/templates/new" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-4 rounded-xl text-sm font-black text-foreground uppercase tracking-widest hover:bg-secondary border border-transparent hover:border-border transition-all"
                >
                  <PlusCircle className="w-5 h-5 text-primary" />
                  New Checklist
                </Link>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold border border-border">
                        {session.user?.name?.charAt(0)}
                      </div>
                      <span className="text-sm font-bold">{session.user?.name}</span>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg glow-primary"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
