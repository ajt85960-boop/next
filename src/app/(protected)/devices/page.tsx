import { redirect } from "next/navigation";
import { Card, CardContent, Typography } from "@mui/material";
import { getCurrentSessionFromCookie } from "@/lib/auth";
import { hasModuleAccess } from "@/lib/role";

export default async function DevicesPage() {
  const { payload } = await getCurrentSessionFromCookie();
  if (!payload || !hasModuleAccess(payload.role, "devices")) {
    redirect("/forbidden");
  }

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          设备管理
        </Typography>
        <Typography color="text.secondary">
          这里放设备资产、状态、分配与维护相关功能。
        </Typography>
      </CardContent>
    </Card>
  );
}
