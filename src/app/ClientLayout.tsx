"use client";
import { AuthProvider } from "@/utils/AuthContext";
import { StoreProvider } from "@/utils/StoreContext";

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <AuthProvider>{children}</AuthProvider>
    </StoreProvider>
  );
}

export default ClientLayout;
