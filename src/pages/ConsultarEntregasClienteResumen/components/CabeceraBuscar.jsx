import { LoadingButton } from "@mui/lab"
import { Grid, MenuItem, TextField } from "@mui/material"
import { MdSearch as SearchIcon } from 'react-icons/md';
import { useZonaBean } from "../../../hooks/useZonaBean";
import { useLocalBean } from "../../../hooks/useLocalBean";


export const CabeceraBuscar = ({ onListar, paramsBusqueda, setParamsBusqueda }) => {
    //const { onListar } = useEntrega();
    const { data : listaZonas} = useZonaBean();
    const { data : listaLocales } = useLocalBean();

    const handleListar = (e)=>{
        e.preventDefault();
        onListar(paramsBusqueda);
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