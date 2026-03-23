import { redirect } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { prisma } from "@/lib/prisma";
import { getCurrentSessionFromCookie } from "@/lib/auth";
import { hasModuleAccess } from "@/lib/role";

export default async function PeoplePage() {
  const { payload } = await getCurrentSessionFromCookie();
  if (!payload || !hasModuleAccess(payload.role, "people")) {
    redirect("/forbidden");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  return (
    <Stack spacing={2}>
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            人员管理
          </Typography>
          <Typography color="text.secondary">
            当前示例按用户角色直接分配页面权限。
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            用户列表
          </Typography>
          <Stack spacing={1}>
            {users.map((user) => (
              <Box
                key={user.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #e5e7eb",
                  borderRadius: 2,
                  p: 1.25,
                }}
              >
                <Box>
                  <Typography>{user.username}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    角色：{user.role}
                  </Typography>
                </Box>
                <Chip
                  label="可登录"
                  color="success"
                  size="small"
                />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
