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
import { useTranslation } from "react-i18next";
import { appMenu } from "@/lib/menu";
import { getRoleMenuModules } from "@/lib/role";
import { useUserStore } from "@/store/user-store";
import { LanguageSwitcher } from "@/components/language-switcher";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useTranslation();
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
            {t("layout.appTitle")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("layout.navTitle")}
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
              <ListItemText primary={t(`menu.${item.module}`)} />
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
            <Typography variant="h6">{t("layout.console")}</Typography>
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              <LanguageSwitcher />
              <Box component="form" action="/api/auth/logout" method="post">
                <Button type="submit" variant="outlined" color="inherit">
                  {t("layout.logout")}
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
