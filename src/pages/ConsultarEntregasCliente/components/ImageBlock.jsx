import { Box } from "@mui/material";

const rutaServidor = import.meta.env.VITE_URL;

export const ImageBlock = ({src, alt=""}) => {
    return <Box p={2} position={"relative"}>
                <img src={`${rutaServidor}/${src}`} alt={alt} style={{width: "100%"}} />
            </Box>
};