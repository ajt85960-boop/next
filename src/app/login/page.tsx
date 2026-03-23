"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.message ?? t("login.failed"));
      return;
    }

    const role = data.role as string;
    const nextPath =
      role === "ADMIN" || role === "MANAGER"
        ? "/overview"
        : role === "ANNOTATOR"
          ? "/annotation"
          : "/forbidden";

    router.push(nextPath);
    router.refresh();
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
            {t("login.title")}
          </Typography>
          <Stack component="form" spacing={2} onSubmit={onSubmit}>
            {!!error && <Alert severity="error">{error}</Alert>}
            <TextField
              label={t("login.username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label={t("login.password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? t("login.submitting") : t("login.submit")}
            </Button>
            <Button component={Link} href="/register" variant="text">
              {t("login.goRegister")}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
