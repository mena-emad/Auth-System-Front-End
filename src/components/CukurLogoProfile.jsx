import { Box } from "@mui/material";
import { motion } from "framer-motion";

export default function CukurLogo({ size = 9000 }) { // كبرنا الحجم الافتراضي هنا
    const pathVariants = {
        animate: {
            pathLength: [0, 1, 1, 0], 
            opacity: [0, 1, 1, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.4, 0.8, 1]
            }
        }
    };

    const glowVariants = {
        animate: {
            filter: [
                "drop-shadow(0 0 5px #3b82f6)",
                "drop-shadow(0 0 25px #3b82f6)",
                "drop-shadow(0 0 5px #3b82f6)"
            ],
            scale: [0.95, 1.05, 0.95], // نبض أوضح مع التكبير
            transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <Box
            sx={{
                width: size,
                height: size,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2 // مساحة أمان للتوهج (Glow) عشان ميتحذفش من الحواف
            }}
        >
            <motion.div
                variants={glowVariants}
                animate="animate"
                style={{ width: "100%", height: "100%" }}
            >
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "100%", height: "100%" }}
                >
                    {/* السهم العلوي - مطاابق لـ download.png */}
                    <motion.path
                        d="M20 40L50 10L80 40"
                        stroke="#3b82f6"
                        strokeWidth="10" // سمك أكبر ليتناسب مع الحجم الجديد
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={pathVariants}
                        animate="animate"
                    />

                    {/* النقاط الثلاث الرأسية */}
                    {[38, 52, 66].map((cy, i) => (
                        <motion.circle
                            key={i}
                            cx="50"
                            cy={cy}
                            r="5" // نقاط أوضح
                            fill="#3b82f6"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                                opacity: [0, 1, 1, 0], 
                                scale: [0, 1, 1, 0] 
                            }}
                            transition={{ 
                                duration: 4, 
                                repeat: Infinity, 
                                delay: 0.15 * i,
                                times: [0, 0.4, 0.8, 1]
                            }}
                        />
                    ))}

                    {/* السهم السفلي - مطابق لـ download.png */}
                    <motion.path
                        d="M20 65L50 95L80 65"
                        stroke="#3b82f6"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={pathVariants}
                        animate="animate"
                    />
                </svg>
            </motion.div>
        </Box>
    );
}