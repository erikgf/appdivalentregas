import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab"
import { Box, Divider, Grid, MenuItem, TextField } from "@mui/material"
import { MdSearch as SearchIcon } from 'react-icons/md';
import { getHoy } from "../../../assets/utils";
import { useEstadosBean } from "../../../hooks/useEstadosBean";
import { useLocation } from "react-router-dom";
import constants from "../../../data/constants";


const hoy = getHoy();
const defaultValue = {
    idZona: constants.ESTADO_TODOS,
    idLocal: constants.ESTADO_TODOS,
    idEstado : constants.ESTADO_PENDIENTE,
    fechaInicio: hoy,
    fechaFin: hoy
};

export const CabeceraBuscar = ({ onListar, setIdZona, setIdLocal, setModoExterno}) => {
    const location = useLocation();
    const { data : listaEstados } = useEstadosBean();
    const [paramsBusqueda, setParamsBusqueda] = useState(defaultValue);
 
    const handleListar = (e)=>{
        e.preventDefault();
        const cambiarModoExterno = false;
        onListar(paramsBusqueda, cambiarModoExterno);
    };

    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        if (!Boolean(params.get("z"))){
            return;
        }

        const idZona = params.get('z') ?? defaultValue?.idZona;
        const idLocal = params.get('l') ?? defaultValue?.idLocal;
        const fechaInicio = params.get('fi') ?? defaultValue?.fechaInicio;
        const fechaFin = params.get('ff') ?? defaultValue?.fechaFin;
        const idEstado = params.get('e') ?? defaultValue?.idEstado;

        setIdZona(idZona)
        setIdLocal(idLocal);

        const _paramsBusqueda = {
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            idEstado : idEstado,
        };

        setModoExterno(true);
        setParamsBusqueda(_paramsBusqueda);
        const cambiarModoExterno = false;
        onListar(_paramsBusqueda, cambiarModoExterno);
    }, [location.search]);
    

    return  <Box component="form" onSubmit = {handleListar}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={4} md={2}>
                        <TextField
                            fullWidth
                            label = "Fecha Inicio"
                            type = "date"
                            size="small"
                            name="fecha_inicio"
                            value = {paramsBusqueda?.fechaInicio}
                            onChange={e => {
                                setParamsBusqueda({...paramsBusqueda, "fechaInicio": e.target.value});
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <TextField
                            fullWidth
                            label = "Fecha Fin"
                            type = "date"
                            size="small"
                            name="fecha_fin"
                            value = {paramsBusqueda?.fechaFin}
                            onChange={e => {
                                setParamsBusqueda({...paramsBusqueda, "fechaFin": e.target.value});
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <TextField
                            fullWidth
                            label = "Estados"
                            size="small"
                            select
                            name="status"
                            required
                            value = {Boolean(listaEstados) ? paramsBusqueda?.idEstado: "*"}
                            onChange={e => {
                                setParamsBusqueda({...paramsBusqueda, "idEstado": e.target.value});
                            }}
                        >
                            <MenuItem value="*"><em>Todos</em></MenuItem>
                            {
                                listaEstados?.map(e => {
                                    return <MenuItem  key={e.id} value={e.id}>{e.descripcion}</MenuItem>
                                })
                            }
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                        <LoadingButton
                            fullWidth
                            type="submit"
                            size="large"
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon />}
                            >
                            BUSCAR
                        </LoadingButton>
                    </Grid>
                </Grid>
                <Divider sx={{my : 2}} />
            </Box>
}