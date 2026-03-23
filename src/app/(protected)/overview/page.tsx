import { redirect } from "next/navigation";
import { Card, CardContent, Typography } from "@mui/material";
import { getCurrentSessionFromCookie } from "@/lib/auth";
import { hasModuleAccess } from "@/lib/role";

export default async function OverviewPage() {
  const { payload } = await getCurrentSessionFromCookie();
  if (!payload || !hasModuleAccess(payload.role, "overview")) {
    redirect("/forbidden");
  }

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          概览
        </Typography>
        <Typography color="text.secondary">
          欢迎进入系统概览页，这里可以展示项目统计与运行状态。
        </Typography>
      </CardContent>
    </Card>
  );
}
