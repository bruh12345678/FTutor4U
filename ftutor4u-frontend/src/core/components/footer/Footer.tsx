import { Box, Typography, Link, Stack, IconButton } from "@mui/material";
import { Facebook, Phone, Email, Instagram, YouTube, LinkedIn, Twitter } from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#f5f5f5", p: 4, color: "black" }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4} justifyContent="space-between">
        
        {/* Store Information */}
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "black" }}>
            Thông Tin Cửa Hàng
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Facebook fontSize="small" />
            <Link href="https://facebook.com" underline="hover" color="inherit" sx={{ color: "black" }}>
              facebook.com
            </Link>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Phone fontSize="small" />
            <Typography sx={{ color: "black" }}>0971511238</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Email fontSize="small" />
            <Link href="mailto:giangchu2233@gmail.com" underline="hover" color="inherit" sx={{ color: "black" }}>
              giangchu2233@gmail.com
            </Link>
          </Stack>
        </Box>

        {/* Social Media */}
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "black" }}>
            Mạng Xã Hội
          </Typography>
          <Stack direction="row" spacing={2}>
            <IconButton color="inherit">
              <Twitter />
            </IconButton>
            <IconButton color="inherit">
              <Instagram />
            </IconButton>
            <IconButton color="inherit">
              <YouTube />
            </IconButton>
            <IconButton color="inherit">
              <LinkedIn />
            </IconButton>
          </Stack>
        </Box>

        {/* Policies */}
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "black" }}>
            Chính Sách
          </Typography>
          <Link href="#" underline="hover" color="inherit" sx={{ color: "black" }}>
            Chính sách bảo hành
          </Link>
        </Box>

      </Stack>
    </Box>
  );
};

export default Footer;