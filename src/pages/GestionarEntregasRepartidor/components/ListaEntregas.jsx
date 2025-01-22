import { useState } from "react";
import { Box,  Divider, Grid, List,MenuItem,Paper, TextField, Typography } from "@mui/material";
import { BlockVacio, CircularLoader } from "../../../components";
import { ListItemBox } from "./ListItemBox";
import { useConsultarEntregasRepartidor } from "../hooks/useConsultarEntregasRepartidor";
import constants from "../../../data/constants";

export const ListaEntregas = ()=>{
    const { registros, cargandoRegistros, onSeleccionarEntrega, empresas : listaEmpresas} = useConsultarEntregasRepartidor();
    const [idEmpresa, setIdEmpresa] = useState(constants.ESTADO_TODOS);

    const seleccionarEntrega = (item) => {
        onSeleccionarEntrega(item.id);
    };

    const registrosFiltrados = registros
                                    ?.filter( item => (
                                        (item.despacho.cliente.id == idEmpresa || idEmpresa === constants.ESTADO_TODOS)
                                    ));

    return <>
        {
            Boolean(registros?.length) &&
                <Grid  container spacing={2} mt={2}>  
                    <Grid item xs={12} sm={4} md={2} >
                        <TextField
                            fullWidth
                            label = "Empresa"
                            size="small"
                            select
                            name="empresa"
                            value = {idEmpresa}
                            onChange={e => {
                                setIdEmpresa(e.target.value);
                            }}
                            required
                        >
                            <MenuItem value={constants.ESTADO_TODOS}><em>Todos</em></MenuItem>
                            {
                                listaEmpresas?.map(e => <MenuItem  key={e.id}  value={e.id}>{e.razon_social}</MenuItem>)
                            }
                        </TextField>
                    </Grid>
                </Grid>
        }
        {
            Boolean(registrosFiltrados) &&
                <Typography mt={2} mb={1} variant="body2" >Mostrando <b>{registrosFiltrados?.length}</b>: </Typography>
        }
        {
            Boolean(cargandoRegistros) &&
                <CircularLoader />
        }
        {
            (!Boolean(registrosFiltrados) || registrosFiltrados?.length <= 0)
            ?   <BlockVacio />
            :   <Paper style={{maxHeight: '60vh', overflow: 'auto'}}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {
                            registrosFiltrados?.map(item=>{
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