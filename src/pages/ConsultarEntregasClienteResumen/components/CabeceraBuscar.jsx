import { LoadingButton } from "@mui/lab"
import { Box, Divider, Grid, MenuItem, TextField } from "@mui/material"
import { MdSearch as SearchIcon } from 'react-icons/md';
import { useZonaBean } from "../../../hooks/useZonaBean";
import { useLocalBean } from "../../../hooks/useLocalBean";


export const CabeceraBuscar = ({ onListar, paramsBusqueda, setParamsBusqueda }) => {
    //const { onListar } = useEntrega();
    //const { data : listaZonas} = useZonaBean();
    //const { data : listaLocales } = useLocalBean();

    const handleListar = (e)=>{
        e.preventDefault();
        onListar(paramsBusqueda);
    };

    return  <Box component="form" onSubmit = {handleListar} >
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