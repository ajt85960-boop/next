import { Box, Button, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f6f8",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          数据标注平台
        </Typography>
        <Typography color="text.secondary">
          使用 Session + Redis 管理登录态
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button href="/login" variant="contained">
            去登录
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
