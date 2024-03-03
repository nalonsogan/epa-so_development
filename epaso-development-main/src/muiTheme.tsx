import { createTheme } from '@mui/material/styles';

const epasoTheme = createTheme({
    // -------- COLORS
    palette: {
        primary: {
            contrastText: undefined,
            dark: undefined,
            light: undefined,
            // main: '#DC002E',
            main: '#0098CD'
        },
        secondary:{
            contrastText: undefined,
            dark: undefined,
            light: undefined,
            main: '#828282',
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    // ---- Components
    components:{
        // ---- Buttons
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                  ...(ownerState.variant === 'contained' &&
                    ownerState.color === 'primary' && {
                      color: '#fff',
                    }),
                }),
            },
        },
        MuiInputBase:{
            styleOverrides:{
                root:{
                    width: '100%',
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#828282!important',
                    },
                }
            }
        },
        MuiFormLabel:{
            styleOverrides:{
                root:{
                    '&.Mui-focused': {
                        color: '#828282',
                    },
                }
            }
        }
    }
});

export default epasoTheme;