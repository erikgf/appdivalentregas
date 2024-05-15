import { Box, Button } from "@mui/material";
import { MdDelete as DeleteIcon } from "react-icons/md";

export const ImageBlock = ({src, alt="", onRemoveImage}) => {
    return <Box p={2} position={"relative"}>
                <Button 
                    color="error" 
                    variant="contained"
                    onClick={onRemoveImage} 
                    sx={{position: "absolute", right: "24px", top: "24px"}}
                    startIcon = {<DeleteIcon />}
                    >
                    QUITAR
                </Button>
                <img src={src} alt={alt} style={{width: "100%"}} />
            </Box>
};