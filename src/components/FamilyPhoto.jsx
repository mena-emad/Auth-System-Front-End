import { motion } from "framer-motion";
import { Box } from "@mui/material";

export default function FamilyPhoto({type,...rest}) {


  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4, mt: 2 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.05, rotate: 2 }} // حركة صايعة لما تلمسها بالماوس
        transition={{ 
            duration: 1, 
            ease: "easeOut",
            layout: { duration: 0.3 } 
        }}
        style={{
          position: "relative",
          padding: "8px",
          background: "linear-gradient(45deg, #3b82f6, #1e293b)", // برواز متدرج
          borderRadius: "20px",
          boxShadow: "0px 0px 30px rgba(59, 130, 246, 0.5)", // الـ Glow الأزرق
        }}
      >
        <Box
          component="img"
          {...rest}
          sx={{
            width: "100%",
            maxWidth: type=="signup"? "650px":"460px",
            borderRadius: "16px",
            display: "block",
            filter: "contrast(1.1) brightness(0.9)", // فلتر خفيف عشان تليق مع المود الدارك
          }}
        />
        
        {/* طبقة فوق الصورة بستايل "حفرة" خفيف */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            background: "linear-gradient(to top, rgba(2, 6, 23, 0.8) 0%, transparent 40%)",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </Box>
  );
}