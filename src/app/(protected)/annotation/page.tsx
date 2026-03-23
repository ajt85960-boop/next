import { redirect } from "next/navigation";
import { Card, CardContent, Typography } from "@mui/material";
import { getCurrentSessionFromCookie } from "@/lib/auth";
import { hasModuleAccess } from "@/lib/role";

export default async function AnnotationPage() {
  const { payload } = await getCurrentSessionFromCookie();
  if (!payload || !hasModuleAccess(payload.role, "annotation")) {
    redirect("/forbidden");
  }

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          数据标注
        </Typography>
        <Typography color="text.secondary">
          标注员仅能看到本模块，进行任务领取、标注和提交。
        </Typography>
      </CardContent>
    </Card>
  );
}
