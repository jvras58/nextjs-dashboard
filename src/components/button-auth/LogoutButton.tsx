"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return <button onClick={() => signOut()}>Sair</button>;
};

export default LogoutButton;