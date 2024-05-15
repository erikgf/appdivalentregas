import { LoadingButton } from "@mui/lab"
import { Grid, MenuItem, TextField } from "@mui/material"
import { MdSearch as SearchIcon } from 'react-icons/md';
import { useConsultarEntregasRepartidor } from "../hooks/useConsultarEntregasRepartidor";
import { useEstadosBean } from "../../../hooks/useEstadosBean";
import { useState } from "react";
import { useLocalRepartidoresBean } from "../../../hooks/useLocalRepartidoresBean";
import { useZonaRepartidoresBean } from "../../../hooks/useZonaRepartidoresBean";

const defaultValue = {
    idZona: "*",
    idLocal: "*",
    idEstado : "P",
};

export const CabeceraBuscar = () => {
    const { data : listaEstados } = useEstadosBean();
    const { data : listaZonas} = useZonaRepartidoresBean();
    const { data : listaLocales } = useLocalRepartidoresBean();
    const [paramsBusqueda, setParamsBusqueda] = useState(defaultValue);
    const { onListarEntregas } = useConsultarEntregasRepartidor();

    const handleListar = (e)=>{
        e.preventDefault();
        onListarEntregas(paramsBusqueda);
    };

    return <Grid component="form" container spacing={2}
                onSubmit = {handleListar}  
                >
                <Grid item xs={12} sm={4} md={2} >
                    <TextField
                        fullWidth
                        label = "Zona"
                        size="small"
                        select
                        name="zona"
                        value = {paramsBusqueda?.idZona}
                        onChange={e => {
                            setParamsBusqueda({...paramsBusqueda, "idZona": e.target.value});
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
                        value = {paramsBusqueda?.idLocal}
                        onChange={e => {
                            setParamsBusqueda({...paramsBusqueda, "idLocal": e.target.value});
                        }}
                    >
                        <MenuItem value="*"><em>Todos</em></MenuItem>
                        {
                            listaLocales
                                ?.filter(e => {
                                    return e.id_zona === paramsBusqueda.idZona
                                })
                                ?.map(e => <MenuItem   key={e.id}  value={e.id}>{e.descripcion}</MenuItem>)
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    {
                        listaEstados?.length > 0  &&
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
                                {
                                    listaEstados
                                        .filter(e=> e.id != "T" )
                                        .map(e => {
                                            return <MenuItem  key={e.id} value={e.id}>{e.descripcion}</MenuItem>
                                        })
                                }
                            </TextField>
                    }
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
}