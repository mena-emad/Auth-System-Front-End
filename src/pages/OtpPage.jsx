import { Box, Typography, Button, TextField, useMediaQuery, useTheme, Alert } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CukurLogo from "../components/CukurLogo";
import { useRef, useState, useEffect } from "react"; // ضفنا useEffect
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

export default function OtpPage() {
    const theme = useTheme();
    const title = useTitle();
    useEffect(() => { title("verify-email") }, [title]);
    const { verifyEmail, generateOtp } = useAuth();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    const inputsRef = useRef([]);
    const location = useLocation();
    
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // --- Logic الـ Timer ---
    const [timer, setTimer] = useState(30); // بيبدأ من 30 ثانية
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    if (!location.state?.email) {
        return <Navigate to="/login" />
    }

    const email = location.state.email;

    const handleResendOtp = async () => {
        if (!canResend) return; // حماية إضافية
        
        setError("");
        try {
            await generateOtp({ email });
            setTimer(30); // ريستارت للتايمر
            setCanResend(false);
            // اختياري: ممكن تصفر الـ OTP القديم هنا
            setOtp(new Array(6).fill(''));
            inputsRef.current[0].focus();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to resend code.");
        }
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError("");
        setLoading(true);
        const otpString = otp.join('');

        try {
            await verifyEmail({ email, otp: otpString });
            navigate("/home");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP, please try again.");
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (element, index) => {
        const value = element.target.value;
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 5) inputsRef.current[index + 1].focus();
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputsRef.current[index - 1].focus();
        }
        else if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1].focus();
        else if (e.key === "ArrowRight" && index < 5) inputsRef.current[index + 1].focus();
    }

    return (
        <Box sx={{
            width: "100vw", height: "100vh", display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center",
            background: "radial-gradient(circle, #1e293b 0%, #020617 100%)",
            overflow: "hidden",
        }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <CukurLogo size={isMobile ? 40 : 60} />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }} 
                style={{ width: '100%', maxWidth: '480px', padding: isMobile ? '12px' : '24px' }}
            >
                <Box sx={{
                    bgcolor: "rgba(0, 0, 0, 0.3)", backdropFilter: "blur(15px)",
                    borderRadius: "24px", p: isMobile ? 3 : 4, boxShadow: "0px 20px 50px rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.05)", textAlign: "center"
                }}>
                    <Typography variant={isMobile ? "h6" : "h5"} sx={{ color: "#fff", fontWeight: "900", mb: 1, letterSpacing: "1px" }}>
                        VERIFY YOUR IDENTITY
                    </Typography>

                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 3 }}>
                        Code sent to <span style={{ color: "#3b82f6", fontWeight: "bold" }}>{email}</span>
                    </Typography>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <Alert severity="error" sx={{ mb: 3, borderRadius: "10px", bgcolor: "rgba(211, 47, 47, 0.1)", color: "#ff8a80" }}>
                                    {error}
                                </Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Box sx={{ display: "flex", gap: isMobile ? 1 : 1.5, justifyContent: "center", mb: 4 }}>
                        {otp.map((data, index) => (
                            <TextField
                                key={index}
                                inputRef={(el) => (inputsRef.current[index] = el)}
                                slotProps={{
                                    htmlInput: { 
                                        inputMode: 'numeric', pattern: '[0-9]*',
                                        style: { textAlign: "center", fontWeight: "900", fontSize: isMobile ? "1.2rem" : "1.5rem", padding: isMobile ? "8px" : "12px" }
                                    }
                                }}
                                variant="outlined"
                                value={data}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                sx={{
                                    width: isMobile ? "42px" : "55px",
                                    "& .MuiOutlinedInput-root": {
                                        height: isMobile ? "50px" : "60px",
                                        borderRadius: "10px",
                                        bgcolor: "rgba(255,255,255,0.05)",
                                        color: "#fff",
                                        "& fieldset": { borderColor: error ? "#ff4444" : "rgba(255,255,255,0.1)" },
                                        "&:hover fieldset": { borderColor: "#3b82f6" },
                                        "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    <Button
                        fullWidth
                        onClick={handleSubmit}
                        disabled={loading || otp.includes('')}
                        variant="contained"
                        sx={{
                            py: 1.5, borderRadius: "12px", bgcolor: "#3b82f6", fontWeight: "bold",
                            mb: 2, "&:hover": { bgcolor: "#2563eb" }
                        }}
                    >
                        {loading ? "Verifying..." : "Verify Code"}
                    </Button>

                    {/* --- الـ UI المطور للـ Resend --- */}
                    <Box sx={{ mt: 1 }}>
                        {canResend ? (
                            <Button 
                                onClick={handleResendOtp}
                                sx={{ 
                                    color: "#3b82f6", 
                                    textTransform: "none", 
                                    fontWeight: "bold",
                                    "&:hover": { bgcolor: "rgba(59, 130, 246, 0.1)" }
                                }}
                            >
                                Resend New Code
                            </Button>
                        ) : (
                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
                                Resend code in <span style={{ color: "#fff", fontWeight: "bold" }}>{timer}s</span>
                            </Typography>
                        )}
                    </Box>
                </Box>
            </motion.div>
        </Box>
    );
}