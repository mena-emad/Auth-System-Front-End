import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function ProtectedRoutes() {
    const { loading, isAuth } = useAuth();

    if (loading) {
        return (
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "radial-gradient(circle, #1e293b 0%, #020617 100%)", // نفس خلفية صفحة الـ OTP
                    color: "#fff",
                }}
            >
                {/* لوجو متحرك أو Spinner بسيط */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 1.5, 
                        repeatType: "reverse" 
                    }}
                >
                    <CircularProgress size={60} sx={{ color: "#3b82f6", mb: 2 }} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: "bold", 
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.7)"
                        }}
                    >
                        Verifying Session...
                    </Typography>
                </motion.div>
            </Box>
        );
    }
    isAuth ? <Navigate to="/home" /> : <Navigate to="/login" /> 
    return isAuth ? <Outlet /> : <Navigate to="/login" />
}