"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "MANAGER" | "ANNOTATOR">(
    "ANNOTATOR",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.message ?? t("register.failed"));
      return;
    }

    setSuccess(t("register.success"));
    setTimeout(() => {
      router.push("/login");
    }, 900);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f6f8",
        p: 2,
      }}
    >
      <Card sx={{ width: 420, borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
            <LanguageSwitcher />
          </Stack>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {t("register.title")}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {t("register.subtitle")}
          </Typography>
          <Stack component="form" spacing={2} onSubmit={onSubmit}>
            {!!error && <Alert severity="error">{error}</Alert>}
            {!!success && <Alert severity="success">{success}</Alert>}
            <TextField
              label={t("register.username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label={t("register.password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <TextField
              select
              label={t("register.role")}
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "ADMIN" | "MANAGER" | "ANNOTATOR")
              }
              fullWidth
              SelectProps={{ native: true }}
            >
              <option value="ADMIN">{t("register.roleAdmin")}</option>
              <option value="ANNOTATOR">{t("register.roleAnnotator")}</option>
              <option value="MANAGER">{t("register.roleManager")}</option>
            </TextField>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? t("register.submitting") : t("register.submit")}
            </Button>
            <Button component={Link} href="/login" variant="text">
              {t("register.goLogin")}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
