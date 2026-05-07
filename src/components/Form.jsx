import { Box, Button, Typography, Paper, Alert, CircularProgress } from "@mui/material";
import Input from "./Input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Form({ formType, ...rest }) {
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(""); // لتخزين رسالة الخطأ من الباك-إيند
  const [loading, setLoading] = useState(false); // لمنع الضغط المتكرر أثناء الطلب

  const isSignUp = formType.toLowerCase() === "signup";

  // تعريف الـ Validation باستخدام Zod
  const zodSchemaSignup = z.object({
    userName: z.string().min(1, { message: "Username is required" }).min(3, { message: "Username must be at least 3 characters long" }).trim(),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }).trim(),
    password: z.string().min(1, { message: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }).min(6, { message: "Password must be at least 6 characters long" })
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

  const zodSchemaLogin = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }).trim(),
    password: z.string().min(1, { message: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" })
  });

  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(isSignUp ? zodSchemaSignup : zodSchemaLogin),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  // تصفير الفورم والأخطاء عند التبديل بين Login و Signup
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setServerError("");
    reset({
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  }, [reset, formType]);

  const onSubmit = async (data) => {
    setServerError(""); // تصفير الخطأ القديم قبل المحاولة الجديدة
    setLoading(true);
    try {
      if (isSignUp) {
        await signup(data);
        navigate("/verify-email", { state: { email: data.email } });
      } else {
        await login(data);
        navigate("/home",{state:{fromAuth:true}} , { replace: true });
      }
    } catch (err) {
      // هنا نمسك رسالة الخطأ من السيرفر (مثل: Email already exists)
      const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        padding: '2rem',
        borderRadius: '16px',
        maxWidth: '450px',
        margin: '2rem auto',
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          mb: 3,
          color: "#fff",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}
      >
        {isSignUp ? "Create Account" : "Welcome Back"}
      </Typography>

      {/* عرض رسالة الخطأ القادمة من الباك-إيند */}
      {serverError && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2, 
            borderRadius: "12px", 
            bgcolor: "rgba(211, 47, 47, 0.15)", 
            color: "#ff8a80",
            border: "1px solid rgba(211, 47, 47, 0.3)" 
          }}
        >
          {serverError}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        {...rest}
        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
      >
        {isSignUp && (
          <Input
            name="userName"
            {...register("userName")}
            placeholder="Enter your name"
            label="Name"
            error={errors.userName?.message}
            type="text"
          />
        )}

        <Input
          name="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="Enter your email"
          label="Email"
          type="email"
        />

        <Input
          name="password"
          {...register("password")}
          error={errors.password?.message}
          placeholder="Enter your password"
          label="Password"
          type="password"
        />

        {isSignUp && (
          <Input
            name="confirmPassword"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            placeholder="Confirm your password"
            label="Confirm Password"
            type="password"
          />
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading} // تعطيل الزرار أثناء عملية الإرسال
          sx={{
            marginTop: '1.5rem',
            padding: '12px',
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '1.1rem',
            fontWeight: '600',
            background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
            boxShadow: "0px 4px 15px rgba(37, 99, 235, 0.4)",
            '&:hover': {
              background: "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : (isSignUp ? "Sign Up" : "Login")}
        </Button>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            mt: 2,
            color: 'rgba(255,255,255,0.6)'
          }}
        >
          {isSignUp ? `Already have an account? ` : "Don't have an account?"}
          <Link
            to={isSignUp ? "/login" : "/signup"}
            style={{
              color: "#3b82f6",
              textDecoration: "none",
              fontWeight: "bold",
              marginLeft: "5px"
            }}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
}