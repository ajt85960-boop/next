import { redirect } from "next/navigation";
import { Box } from "@mui/material";
import { AppShell } from "@/components/app-shell";
import { UserBootstrap } from "@/components/user-bootstrap";
import { getCurrentSessionFromCookie } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { payload } = await getCurrentSessionFromCookie();

  if (!payload) {
    redirect("/login");
  }

  return (
    <Box>
      <UserBootstrap user={payload} />
      <AppShell>{children}</AppShell>
    </Box>
  );
}
