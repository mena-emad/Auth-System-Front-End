import { Box, Container, Typography, Avatar, Grid, Paper, Button, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { Mail, User, ShieldCheck, LogOut, Award } from "lucide-react"; 
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import { useEffect } from "react";
import CukurLogoProfile from "../components/CukurLogoProfile";

export default function ProfilePage() {
    const title = useTitle();
    useEffect(() => { title("Profile") }, [title]);
    const { user, logout } = useAuth();
    const isLoading = !user;

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
    };

    const firstLetter = user?.userName?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || "?";

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "radial-gradient(circle at top right, #1e293b 0%, #020617 100%)",
                py: { xs: 4, md: 8 }, // تقليل الحشو الرأسي في الموبايل
                color: "#fff",
                position: "relative",
                overflowX: "hidden" // منع السكرول العرضي تماماً
            }}
        >
            {/* شعار الحفرة - ضبط مكانه وحجمه للموبايل */}
            <Box sx={{ 
                position: "absolute", 
                top: { xs: 10, md: 20 }, 
                left: { xs: 10, md: 20 }, 
                opacity: 0.6,
                zIndex: 1
            }}>
                <CukurLogoProfile size={window.innerWidth < 600 ? 40 : 60} />
            </Box>

            <Container maxWidth="md">
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 5 }, // Padding متغير حسب الشاشة
                            borderRadius: { xs: "24px", md: "32px" },
                            bgcolor: "rgba(255, 255, 255, 0.02)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.05)",
                            mb: 4,
                            textAlign: "center",
                            position: "relative",
                            overflow: "hidden"
                        }}
                    >
                        <Box sx={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: { xs: 200, md: 300 }, height: { xs: 200, md: 300 }, bgcolor: "#3b82f6", filter: "blur(120px)", opacity: 0.15, zIndex: 0 }} />

                        {isLoading ? (
                            <Skeleton variant="circular" width={100} height={100} sx={{ mx: "auto", mb: 2, bgcolor: "rgba(255,255,255,0.05)" }} />
                        ) : (
                            <Avatar
                                sx={{
                                    width: { xs: 90, md: 120 },
                                    height: { xs: 90, md: 120 },
                                    mx: "auto",
                                    mb: 2,
                                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                                    fontWeight: "bold",
                                    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                                    border: "4px solid rgba(255,255,255,0.1)",
                                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                                }}
                            >
                                {firstLetter}
                            </Avatar>
                        )}

                        <Typography 
                            variant="h3" 
                            sx={{ 
                                fontWeight: "900", 
                                mb: 0.5, 
                                fontSize: { xs: "1.8rem", md: "3rem" }, // تصغير الخط للموبايل
                                background: "linear-gradient(to right, #fff, #94a3b8)", 
                                WebkitBackgroundClip: "text", 
                                WebkitTextFillColor: "transparent",
                                wordBreak: "break-word" 
                            }}
                        >
                            {isLoading ? <Skeleton width="60%" sx={{ mx: "auto", bgcolor: "rgba(255,255,255,0.05)" }} /> : (user?.userName || user?.name)}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ color: "#3b82f6", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", fontSize: { xs: "0.7rem", md: "1rem" } }}>
                            {isLoading ? <Skeleton width={100} sx={{ mx: "auto", bgcolor: "rgba(255,255,255,0.05)" }} /> : "Verified Member"}
                        </Typography>
                    </Paper>

                    <Grid container spacing={2}>
                        {[
                            { icon: <User size={20}/>, label: "Username", value: user?.userName || user?.name },
                            { icon: <Mail size={20}/>, label: "Email Address", value: user?.email },
                            { icon: <Award size={20}/>, label: "Role", value: user?.role || "User" },
                            { icon: <ShieldCheck size={20}/>, label: "Account Status", value: "Active" }
                        ].map((item, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <InfoCard icon={item.icon} label={item.label} value={isLoading ? <Skeleton width="80%" sx={{ bgcolor: "rgba(255,255,255,0.05)" }} /> : item.value} />
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ mt: { xs: 4, md: 6 }, textAlign: "center" }}>
                        <Button
                            onClick={logout}
                            startIcon={<LogOut size={20} />}
                            fullWidth={window.innerWidth < 600} // الزرار ياخد العرض كامل في الموبايل لسهولة الضغط
                            sx={{
                                color: "#f87171",
                                fontWeight: "800",
                                px: 4,
                                py: 1.5,
                                borderRadius: "16px",
                                background: "rgba(248, 113, 113, 0.05)",
                                border: "1px solid rgba(248, 113, 113, 0.1)",
                                "&:hover": { bgcolor: "rgba(248, 113, 113, 0.15)" }
                            }}
                        >
                            Sign Out
                        </Button>
                    </Box>

                </motion.div>
            </Container>
        </Box>
    );
}

function InfoCard({ icon, label, value }) {
    return (
        <Paper
            sx={{
                p: { xs: 2, md: 3 },
                borderRadius: "20px",
                bgcolor: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                gap: { xs: 1.5, md: 2.5 },
                overflow: "hidden", // حماية إضافية للحاوية
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)", borderColor: "rgba(59, 130, 246, 0.3)" }
            }}
        >
            <Box sx={{ 
                p: 1.2, 
                borderRadius: "12px", 
                bgcolor: "rgba(59, 130, 246, 0.1)", 
                color: "#3b82f6", 
                display: "flex",
                flexShrink: 0 // منع الأيقونة من الانكماش لو النص طويل
            }}>
                {icon}
            </Box>
            <Box sx={{ minWidth: 0 }}> {/* ضروري لعمل الـ wordBreak داخل الـ Flexbox */}
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", display: "block", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.6rem" }}>
                    {label}
                </Typography>
                <Typography 
                    variant="body2" 
                    sx={{ 
                        fontWeight: "700", 
                        color: "#e2e8f0", 
                        fontSize: { xs: "0.85rem", md: "1rem" },
                        wordBreak: "break-all" // الحل السحري لخروج النص بره الحاوية
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </Paper>
    );
}