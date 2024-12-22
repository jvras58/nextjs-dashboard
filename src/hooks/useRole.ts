import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  afilliate: string | null;
}

export function useRole() {
  const { data: session, status } = useSession();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setRole((session.user as User).role);
    }
  }, [session, status]);

  return {
    isAdmin: () => role === 'admin',
    hasRole: (roleToCheck: string) => role === roleToCheck,
    userRole: role,
    isLoading: status === "loading",
  };
}