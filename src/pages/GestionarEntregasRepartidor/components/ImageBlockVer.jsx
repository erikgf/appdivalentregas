import { Box } from "@mui/material";

export const ImageBlockVer = ({src, alt=""}) => {
    return <Box p={2} position={"relative"}>
                <img src={`http://localhost/server-dival-entregas/public/${src}`} alt={alt} style={{width: "100%"}} />
            </Box>
};