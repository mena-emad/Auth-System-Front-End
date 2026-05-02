import { Box, useMediaQuery, useTheme } from "@mui/material";
import Form from "../components/Form";
import CukurLogo from "../components/CukurLogo";
import { motion } from "framer-motion";
import FamilyPhoto from "../components/FamilyPhoto";
import useTitle from "../hooks/useTitle";
import { useEffect } from "react";

export default function LoginPage() {
    const theme = useTheme();
    const title = useTitle();
    useEffect(() => { title("Login") }, [title]);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                width: "100vw",
                // التعديل الأول: نستخدم minHeight بدل height عشان نسمح للمحتوى يطول لو زاد عن الشاشة
                minHeight: "100vh", 
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                // التعديل الثاني: السماح بالسكرول الرأسي فقط في الموبايل لو لزم الأمر
                overflowY: isMobile ? "auto" : "hidden",
                overflowX: "hidden",
                background: "radial-gradient(circle, #1e293b 0%, #020617 100%)",
            }}
        >
            {/* الجانب الجمالي */}
            <Box sx={{ 
                flex: isMobile ? "none" : 1, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center",
                p: isMobile ? 2 : 4,
                pt: isMobile ? 4 : 0,
                borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.05)"
            }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center' }}
                >
                    <CukurLogo />
                    {/* نصغر الصورة في الموبايل شوية عشان متسحبش مساحة كبيرة */}
                    <Box sx={{ transform: isMobile ? 'scale(0.8)' : 'scale(1)', mb: isMobile ? -2 : 0 }}>
                        {/* <FamilyPhoto type={"login"} alt="Mena Emad Alone" src="https://res.cloudinary.com/dssh1cc4p/image/upload/v1777682401/ChatGPT_Image_May_2_2026_03_39_26_AM_ezckmb.png"/> */}
                        <FamilyPhoto type={"login"} alt="Mena Emad Alone" src="https://res.cloudinary.com/dssh1cc4p/image/upload/v1777737006/Gemini_Generated_Image_n29hwhn29hwhn29h_zus1az.png"/>
                    </Box>
                </motion.div>
            </Box>

            {/* جانب الفورم */}
            <Box sx={{ 
                flex: 1, 
                display: "flex", 
                justifyContent: "center", 
                alignItems: isMobile ? "flex-start" : "center", // يبدأ من فوق في الموبايل لسهولة السكرول
                bgcolor: "rgba(0, 0, 0, 0.2)", 
                backdropFilter: "blur(10px)",
                p: 2,
                pb: isMobile ? 5 : 2 // مساحة إضافية تحت في الموبايل
            }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ width: '100%', maxWidth: '420px' }}
                >
                    <Form formType="login" />
                </motion.div>
            </Box>
        </Box>
    );
}