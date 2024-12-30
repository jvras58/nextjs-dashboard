import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  afilliate?: string | null;
}

export function useRole() {
  const { data: session, status } = useSession();
  const [role, setRole] = useState<string | null>(null);
  const [affiliate, setAffiliate] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setRole((session.user as User).role);
      setAffiliate((session.user as User).afilliate || null);
    }
  }, [session, status]);

  return {
    isAdmin: () => role === 'admin',
    hasRole: (roleToCheck: string) => role === roleToCheck,
    userRole: role,
    affiliate: affiliate,
    hasAffiliate: () => affiliate !== null,
    isLoading: status === "loading",
  };
}