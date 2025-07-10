import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, List, Bell, User, ClipboardList, TrendingUp } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  userType: "client" | "guard";
}

export default function BottomNav({ activeTab, userType }: BottomNavProps) {
  const [location] = useLocation();

  const clientTabs = [
    { id: "home", label: "الرئيسية", icon: Home, href: "/client/dashboard" },
    { id: "orders", label: "طلباتي", icon: List, href: "/client/orders" },
    { id: "notifications", label: "الإشعارات", icon: Bell, href: "/client/notifications" },
    { id: "profile", label: "الملف الشخصي", icon: User, href: "/client/profile" }
  ];

  const guardTabs = [
    { id: "home", label: "الرئيسية", icon: Home, href: "/guard/dashboard" },
    { id: "jobs", label: "مهامي", icon: ClipboardList, href: "/guard/jobs" },
    { id: "notifications", label: "الإشعارات", icon: Bell, href: "/guard/notifications" },
    { id: "profile", label: "الملف الشخصي", icon: User, href: "/guard/profile" }
  ];

  const tabs = userType === "client" ? clientTabs : guardTabs;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <Link key={tab.id} href={tab.href}>
            <Button
              variant="ghost"
              className={`flex flex-col items-center h-auto px-2 py-1 ${
                activeTab === tab.id 
                  ? userType === "client" ? "text-primary" : "text-secondary"
                  : "text-gray-400"
              }`}
            >
              <tab.icon className="w-4 h-4 mb-0.5" />
              <span className="text-xs leading-tight">{tab.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}