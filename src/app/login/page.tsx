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

export default function LoginPage() {
  const router = useRouter();
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
      setError(data.message ?? "登录失败");
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
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            登录
          </Typography>
          <Stack component="form" spacing={2} onSubmit={onSubmit}>
            {!!error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="密码"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "登录中..." : "登录"}
            </Button>
            <Button component={Link} href="/register" variant="text">
              没有账号？去注册
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
