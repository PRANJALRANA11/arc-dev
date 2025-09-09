import React, { useContext } from "react";
import { Home, Code, Code2, Eye } from "lucide-react";
import { LimelightNav, NavItem } from "@/components/ui/limelight-nav";
import { AppContext } from "@/app/context/contextApi";

interface TabViewProps {
  activeTab: "code" | "preview";
  onTabChange: (tab: "code" | "preview") => void;
}

export function TabView({ activeTab, onTabChange }: TabViewProps) {
  const { setOpenPreviewFull } = useContext(AppContext);
  const customNavItems = [
    {
      id: "code",
      icon: <Code2 />,
      label: "Code",
      onClick: () => {
        onTabChange("code");
        setOpenPreviewFull(false);
      },
    },
    {
      id: "preview",
      icon: <Eye />,
      label: "Preview",
      onClick: () => {
        onTabChange("preview");
        setOpenPreviewFull(true);
      },
    },
  ];
  return (
    <div className="flex space-x-2 mt-4 mb-3 ml-4">
      <LimelightNav
        className="bg-secondary dark:bg-card/50 dark:border-accent/50 rounded-xl"
        items={customNavItems}
      />
    </div>
  );
}
