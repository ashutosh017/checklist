"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TemplateLibrary from "@/components/TemplateLibrary";
import TemplateEditor from "@/components/TemplateEditor";
import Navbar from "@/components/Navbar";
import { Loader2 } from "lucide-react";

export default function NewTemplatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate({
      name: template.name,
      config: {
        columns: template.columns,
        days: template.days,
      },
      data: {},
      isPublic: false,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="pb-24">
        {!selectedTemplate ? (
          <div className="animate-fade-in">
            <TemplateLibrary onSelect={handleSelectTemplate} />
          </div>
        ) : (
          <div className="animate-fade-in">
            <TemplateEditor initialData={selectedTemplate} />
          </div>
        )}
      </main>
    </div>
  );
}
