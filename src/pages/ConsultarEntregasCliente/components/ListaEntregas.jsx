import { Box, Divider, Grid, List, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { BlockVacio, CircularLoader } from "../../../components";
import { ListItemBox } from "./ListItemBox";
import { useEffect } from "react";
import constants from "../../../data/constants";

export const ListaEntregas = ({data : registros,
                                listaLocales, listaZonas,
                                cargando: cargandoRegistros,
                                idZona, setIdZona,
                                idLocal, setIdLocal,
                                onSeleccionar,
                                modoExterno })=>{

    const registrosFiltrados = registros
                                    ?.filter( item => (
                                        (item.id_zona == idZona || idZona === constants.ESTADO_TODOS) && (item.id_local == idLocal || idLocal === constants.ESTADO_TODOS)
                                    ));

    useEffect(() =>{
        if (idZona === constants.ESTADO_TODOS){
            setIdLocal(constants.ESTADO_TODOS);
            return;
        }
    }, [idZona]);

    useEffect(() => {
        if (modoExterno){
           if (Boolean(registros)){
            setIdLocal(idLocal);
            setIdZona(idZona);
           }
        }
    }, [registros, modoExterno]);

    return   <>
                {
                    Boolean(registros?.length) &&
                        <Grid  container spacing={2}>  
                            <Grid item xs={12} sm={4} md={2} >
                                <TextField
                                    fullWidth
                                    label = "Zona"
                                    size="small"
                                    select
                                    name="zona"
                                    value = {idZona}
                                    onChange={e => {
                                        setIdZona(e.target.value);
                                    }}
                                    required
                                >
                                    <MenuItem value="*"><em>Todos</em></MenuItem>
                                    {
                                        listaZonas?.map(e => <MenuItem  key={e.id}  value={e.id}>{e.descripcion}</MenuItem>)
                                    }
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <TextField
                                    fullWidth
                                    label = "Local"
                                    size="small"
                                    select
                                    name="local"
                                    required
                                    value = {idLocal}
                                    onChange={e => {
                                        setIdLocal(e.target.value);
                                    }}
                                >
                                    <MenuItem value="*"><em>Todos</em></MenuItem>
                                    {
                                        listaLocales
                                            ?.filter(e => {
                                                return e.id_zona == idZona
                                            })
                                            ?.map(e => <MenuItem   key={e.id}  value={e.id}>{e.descripcion}</MenuItem>)
                                    }
                                </TextField>
                            </Grid>
                        </Grid>
                }
                {
                    <Typography mt={2} mb={1} variant="body2" >Mostrando <b>{registrosFiltrados?.length}</b> registros: </Typography>
                }
                {
                    Boolean(cargandoRegistros) &&
                        <CircularLoader />
                }
                {
                    (cargandoRegistros || registrosFiltrados?.length <= 0)
                    ?   (!Boolean(cargandoRegistros) && <BlockVacio />)
                    :   <Paper style={{height: '60%', overflow: 'auto'}}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper', pb: "32px"}} >
                                {
                                    registrosFiltrados
                                        ?.map(item=>(
                                            <Box  key = {item.id} onClick={()=>{onSeleccionar(item)}}>
                                                <ListItemBox item={item}/> 
                                                <Divider component="li" />
                                            </Box>
                                        ))
                                }
                            </List>
                        </Paper>
                }
            </>
}