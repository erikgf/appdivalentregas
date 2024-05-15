import { Box, Chip, Divider, Grid, List, ListItem, ListItemButton, Paper, Typography } from "@mui/material";
import { BlockVacio, CircularLoader } from "../../../components";
import { ListItemBox } from "./ListItemBox";

export const ListaEntregas = ({data : registros,
                                cargando: cargandoRegistros,
                                onSeleccionar})=>{

    return <>
        {
            <Typography mt={2} mb={1} variant="body2" >Mostrando <b>{registros?.length}</b> registros: </Typography>
        }
        {
            Boolean(cargandoRegistros) &&
                <CircularLoader />
        }
        {
            (cargandoRegistros || registros?.length <= 0)
            ?   (!Boolean(cargandoRegistros) && <BlockVacio />)
            :   <Paper style={{maxHeight: '80vh', overflow: 'auto'}}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {
                            registros?.map(item=>{
                                return <Box  key = {item.id} onClick={()=>{onSeleccionar(item)}}>
                                            <ListItemBox item={item} /> 
                                            <Divider component="li" />
                                        </Box>
                            })
                        }
                    </List>
                </Paper>
        }
        
    </>
}