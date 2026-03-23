import { Box, Button, Typography } from "@mui/material";

export default function ForbiddenPage() {
  return (
    <Box sx={{ p: 6 }}>
      <Typography variant="h4" gutterBottom>
        403 Forbidden
      </Typography>
      <Typography sx={{ mb: 3 }} color="text.secondary">
        你没有访问该页面的权限。
      </Typography>
      <Button href="/overview" variant="contained">
        返回概览
      </Button>
    </Box>
  );
}
