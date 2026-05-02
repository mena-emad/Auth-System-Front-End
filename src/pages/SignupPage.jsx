import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "../components/Form";
import CukurLogo from "../components/CukurLogo";
import FamilyPhoto from "../components/FamilyPhoto";
import { motion } from "framer-motion";
import useTitle from "../hooks/useTitle";
import { useEffect } from "react";

export default function SignupPage() {
    const title = useTitle();
    useEffect(() => { title("Signup") }, [title]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                width: "100vw",
                // التعديل هنا: نستخدم minHeight بدل height عشان نسمح للمحتوى يتمدد
                minHeight: "100vh", 
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                // التعديل هنا: نخليه auto عشان لو المحتوى أكبر من الشاشة الموبايل يسكرول عادي
                overflowY: isMobile ? "auto" : "hidden", 
                overflowX: "hidden",
                background: "radial-gradient(circle, #1e293b 0%, #020617 100%)",
                margin: 0,
                padding: 0,
            }}
        >
            {/* الجزء الجمالي */}
            <Box sx={{ 
                // في الموبايل مش محتاجين flex: 1 عشان مياخدش نص الشاشة ويضغط الفورم
                flex: isMobile ? "none" : 1, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center",
                p: isMobile ? 2 : 4, // تقليل الـ padding في الموبايل
                pt: isMobile ? 4 : 0,
                borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.05)"
            }}>
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <CukurLogo />
                    <Typography 
                        variant={isMobile ? "h5" : "h4"} // نص أصغر شوية في الموبايل
                        sx={{ 
                            color: "#fff", 
                            fontWeight: "900", 
                            textAlign: "center", 
                            mb: 1, 
                            letterSpacing: "2px",
                            textTransform: "uppercase" 
                        }}
                    >
                        Mena<span style={{ color: "#3b82f6" }}>-</span>Scripto
                    </Typography>
                    
                    {/* في الموبايل ممكن نصغر الصورة شوية عشان الفورم تظهر بدري */}
                    <Box sx={{ transform: isMobile ? 'scale(0.95)' : 'scale(1)' }}>
                        <FamilyPhoto type={"signup"} alt={"Mena with Cukur Family"} src="https://res.cloudinary.com/dssh1cc4p/image/upload/v1777679651/Gemini_Generated_Image_544o9j544o9j544o_zsegyv.png" />
                    </Box>
                    
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            display: 'block',
                            color: "rgba(255,255,255,0.4)", 
                            textAlign: "center", 
                            mt: 1, 
                            fontStyle: 'italic',
                        }}
                    >
                        "Aile Her Şeydir | Family is everything"
                    </Typography>
                </motion.div>
            </Box>

            {/* جزء الـ Form */}
            <Box sx={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column",
                justifyContent: isMobile ? "flex-start" : "center", // يبدأ من فوق في الموبايل
                alignItems: "center",
                bgcolor: "rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(10px)",
                p: 2,
                pb: 5 // مساحة تحت عشان الحقوق متلزقش في الشاشة
            }}>
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ width: '100%', maxWidth: '420px' }}
                >
                    <Box sx={{
                        boxShadow: "0px 20px 50px rgba(0,0,0,0.5)",
                        borderRadius: "16px",
                        // شيلنا الـ overflow: hidden من هنا عشان لو فيه رسايل خطأ تظهر
                    }}>
                        <Form formType="signup" />
                    </Box>
                    
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            display: "block", 
                            textAlign: "center", 
                            mt: 3, 
                            color: "rgba(255,255,255,0.2)",
                        }}
                    >
                        © 2026 MENA EMAD SAWARES
                    </Typography>
                </motion.div>
            </Box>
        </Box>
    );
}