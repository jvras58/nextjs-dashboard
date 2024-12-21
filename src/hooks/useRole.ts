import { useSession } from "next-auth/react";

export function useRole() {
  const { data: session } = useSession();

  console.log("Session Data:", session);

  const isAdmin = () => session?.user?.role === 'admin';
  
  const hasRole = (role: string) => session?.user?.role === role;
  
  const userRole = session?.user?.role;

  return {
    isAdmin,
    hasRole,
    userRole,
  };
}