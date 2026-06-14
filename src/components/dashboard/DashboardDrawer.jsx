import { getUserSession } from "@/lib/core/session";
import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  Briefcase,
  Bookmark,
  FileText,
  CreditCard,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardDrawer() {
  const user = await getUserSession();

  const recruiterNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post a Job" },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },

    {
      icon: Envelope,
      href: "/dashboard/recruiter/messages",
      label: "Messages",
    },

    { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
  ];

  const seekerNavLinks = [
    {
      icon: House,
      href: "/dashboard/seeker",
      label: "Dashboard",
    },
    {
      icon: Magnifier,
      href: "/dashboard/seeker/jobs",
      label: "Jobs",
    },
    {
      icon: Bookmark,
      href: "/dashboard/seeker/saved",
      label: "Saved Jobs",
    },
    {
      icon: FileText,
      href: "/dashboard/seeker/applications",
      label: "Applications",
    },
    {
      icon: CreditCard,
      href: "/dashboard/seeker/billing",
      label: "Billing",
    },
    {
      icon: Gear,
      href: "/dashboard/seeker/settings",
      label: "Settings",
    },
  ];

  const navLinkMap = {
    seeker: seekerNavLinks,
    recruiter: recruiterNavLinks,
  };

  const navItems = navLinkMap[user?.role || "seeker"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 border-r border-default p-4">
        {navContent}
      </aside>

      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
