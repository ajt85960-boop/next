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

export default function RegisterPage() {
  const router = useRouter();
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
      setError(data.message ?? "注册失败");
      return;
    }

    setSuccess("注册成功，即将跳转登录页...");
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
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            注册账号
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            请选择角色，注册后可直接登录
          </Typography>
          <Stack component="form" spacing={2} onSubmit={onSubmit}>
            {!!error && <Alert severity="error">{error}</Alert>}
            {!!success && <Alert severity="success">{success}</Alert>}
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
            <TextField
              select
              label="角色"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "ADMIN" | "MANAGER" | "ANNOTATOR")
              }
              fullWidth
              SelectProps={{ native: true }}
            >
              <option value="ADMIN">管理员（最高权限）</option>
              <option value="ANNOTATOR">标注员（最低权限）</option>
              <option value="MANAGER">项目经理（第二权限）</option>
            </TextField>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "注册中..." : "注册"}
            </Button>
            <Button component={Link} href="/login" variant="text">
              已有账号？去登录
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
