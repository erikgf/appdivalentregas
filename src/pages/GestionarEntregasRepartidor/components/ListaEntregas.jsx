import { Box,  Divider, List,Paper, Typography } from "@mui/material";
import { BlockVacio, CircularLoader } from "../../../components";
import { ListItemBox } from "./ListItemBox";
import { useConsultarEntregasRepartidor } from "../hooks/useConsultarEntregasRepartidor";

export const ListaEntregas = ()=>{
    const { registros, cargandoRegistros, onSeleccionarEntrega } = useConsultarEntregasRepartidor();

    const seleccionarEntrega = (item) => {
        onSeleccionarEntrega(item.id);
    };

    return <>
        {
            Boolean(registros) &&
                <Typography mt={2} mb={1} variant="body2" >Mostrando <b>{registros?.length}</b>: </Typography>
        }
        {
            Boolean(cargandoRegistros) &&
                <CircularLoader />
        }
        {
            (!Boolean(registros) || registros?.length <= 0)
            ?   <BlockVacio />
            :   <Paper style={{maxHeight: '60vh', overflow: 'auto'}}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {
                            registros?.map(item=>{
                                return <Box  key = {item.id} onClick={()=>{seleccionarEntrega(item)}}>
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