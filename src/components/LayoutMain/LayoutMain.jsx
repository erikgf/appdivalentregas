import { Box, Typography } from "@mui/material"
import { Navbar } from "../Navbar/Navbar"

const VERSION = `${APP_VERSION}`;

export const LayoutMain = ({children}) =>{
    return <>
        <Navbar />
        <Box p={2} sx={{height: "calc(100vh - 84px)"}}>
            {children}
        </Box>
        <Typography color={"gray"} fontWeight={"bold"} variant="caption" paddingLeft={1}>v.{VERSION}</Typography>
    </>
}