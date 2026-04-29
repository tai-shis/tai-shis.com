import ProjectTemplate from "@/app/components/projects/project-template";

export default function VendorReports() {
  return (
    <ProjectTemplate
      panelName="vendor-reports"
      description="Full-Stack internal web application for showing consignment vendors real-time visibility into their sales data."
      tags={["TypeScript", "React", "Next.js", "Neon Auth", "NeonDB", "Prisma", "TailwindCSS", "Square SDK", "Vercel"]}
      images={["/vendor-reports/home.png", "/vendor-reports/orders.png"]}
    />
  );
}
  