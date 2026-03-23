"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { appMenu } from "@/lib/menu";
import { getRoleMenuModules } from "@/lib/role";
import { useUserStore } from "@/store/user-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  const roleModules = getRoleMenuModules(user?.role ?? "");
  const menu = appMenu.filter((item) => roleModules.includes(item.module));

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Paper
        square
        sx={{
          width: 260,
          borderRight: "1px solid #e5e7eb",
          bgcolor: "#ffffff",
          borderRadius: 0,
        }}
      >
        <Box sx={{ px: 2.5, py: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            SaaS 平台
          </Typography>
          <Typography variant="body2" color="text.secondary">
            统一导航
          </Typography>
        </Box>
        <List>
          {menu.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              href={item.path}
              selected={pathname === item.path}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="static"
          elevation={0}
          color="transparent"
          sx={{ borderBottom: "1px solid #e5e7eb", bgcolor: "#ffffff" }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">业务控制台</Typography>
            <Box component="form" action="/api/auth/logout" method="post">
              <Button type="submit" variant="outlined" color="inherit">
                退出登录
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
