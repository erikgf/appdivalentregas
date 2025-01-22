import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useProcesadorDatosEntregas } from "../hooks/useProcesadorDatosEntregas";
import { BlockVacio, CircularLoader } from "../../../components";
import { useEffect, useState } from "react";
import constants from "../../../data/constants";

const pieParams = { height: 200, margin: { right: 5 } };

export const BloquePieResumen = ({data : registros, listaLocales, listaZonas, cargando : cargandoRegistros, ir}) => {
    const { onProcesarDatosAPie } = useProcesadorDatosEntregas();

    const [idZona, setIdZona] = useState(constants.ESTADO_TODOS);
    const [idLocal, setIdLocal] = useState(constants.ESTADO_TODOS);
    const registrosFiltrados = registros ?.filter( item => (
                                        (item.id_zona == idZona || idZona === constants.ESTADO_TODOS) && (item.id_local == idLocal || idLocal === constants.ESTADO_TODOS)
                                    ));

    const datosPie = onProcesarDatosAPie(registrosFiltrados);

    useEffect(() =>{
        if (idZona === constants.ESTADO_TODOS){
            setIdLocal(constants.ESTADO_TODOS);
            return;
        }
    }, [idZona]);

    return  <>
            {
                Boolean(registros?.length) &&
                    <Grid container spacing={2}>  
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
                Boolean(cargandoRegistros) &&
                    <CircularLoader />
            }
            {
                Boolean(datosPie )
                    ?  !Boolean(cargandoRegistros) 
                        &&  <Box mt={2}  overflow={"scroll"} height={"300px"}>
                                <Typography variant="h6">Resultados: </Typography>
                                {
                                    datosPie?.map(pie => {
                                        return  <Box key={pie.id}>
                                                    <Typography variant={pie.rotulo_variante}>{pie.rotulo_principal}</Typography>
                                                    <Typography variant="body2">Totales: {pie.totales}</Typography>
                                                    <PieChart
                                                        series={[{ data: pie.valores, outerRadius: pie.outer_radius}]}
                                                        onItemClick={(event, d) => ir({dataIndex: d.dataIndex, id_local: pie.id_local, id_zona: pie.id_zona})}
                                                        {...pieParams}
                                                    />
                                                </Box>
                                    })
                                }
                            </Box>
                    : (!Boolean(cargandoRegistros) && <BlockVacio />)
            }
            
    </>
};