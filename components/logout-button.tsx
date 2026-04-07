"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return <button onClick={logout} className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary dark:hover:bg-secondary">
    <LogOut className="h-5 w-5" />
  </button>;
}
