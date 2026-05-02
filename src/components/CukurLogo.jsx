import { motion } from "framer-motion";
import { Box } from "@mui/material";

export default function CukurLogo() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        initial="hidden"
        animate="visible"
      >
        {/* السهم العلوي < */}
        <motion.path
          d="M 30 40 L 10 50 L 30 60"
          fill="transparent"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* الثلاث نقاط . . . */}
        {[40, 50, 60].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy="50"
            r="3"
            fill="#3b82f6"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        {/* السهم السفلي > */}
        <motion.path
          d="M 70 40 L 90 50 L 70 60"
          fill="transparent"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.svg>
    </Box>
  );
}