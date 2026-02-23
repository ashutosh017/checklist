import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TemplateEditor from "@/components/TemplateEditor";
import Navbar from "@/components/Navbar";

export default async function EditTemplatePage({ params }: any) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const template = await prisma.template.findUnique({
    where: {
      id,
      userId: (session.user as any).id,
    },
  });

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-24">
      <Navbar />
      <div className="mt-8">
        <TemplateEditor initialData={template} />
      </div>
    </div>
  );
}
