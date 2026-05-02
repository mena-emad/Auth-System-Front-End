import { TextField, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Input({ label, error, type, ...rest }) {
    const [showPassword, setShowPassword] = useState(false);
    
    const handleShowPassword = () => {
        setShowPassword(show => !show);
    };

    return (
        <TextField
            {...rest}
            label={label}
            variant="outlined"
            fullWidth
            type={type === "password" && showPassword ? "text" : type}
            margin="dense" // استبدال normal بـ dense لتقليل المسافات ومنع السكرول
            error={!!error}
            helperText={error}
            sx={{
                // ستايل الليبل (Label)
                '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.6)',
                    '&.Mui-focused': { color: '#3b82f6' }, // لون أزرق ياماتش عند التركيز
                },
                // ستايل حقل الإدخال (Input)
                '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    color: '#fff', // لون الكتابة أبيض
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.1)', // بوردر خفيف جداً
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6', // لون البوردر عند الـ focus
                    },
                    background: 'rgba(255, 255, 255, 0.02)', // خلفية داخلية خفيفة
                },
                // ستايل رسالة الخطأ
                '& .MuiFormHelperText-root': {
                    fontSize: '0.75rem',
                    marginLeft: '4px',
                }
            }}
            slotProps={{
                input: {
                    endAdornment: type === "password" && (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
        />
    );
}