import { useEffect } from "react";
import { LoadingButton } from "@mui/lab"
import { Box, Grid, MenuItem, TextField } from "@mui/material"
import { MdSearch as SearchIcon } from 'react-icons/md';
import { getHoy } from "../../../assets/utils";

const hoy = getHoy();

export const CabeceraBuscar = () => {
    const onListar = ({fechaInicio, fechaFin, local}) => {
        return;
    };

    const handleListar = (e)=>{
        e.preventDefault();
        const form = e.target;
        onListar({
            fechaInicio: form.fecha_inicio.value,
            fechaFin: form.fecha_fin.value,
            local: form.local.value
        });
    };

    useEffect(()=>{
        onListar({
            fechaInicio: hoy,
            fechaFin: hoy
        });
    }, []);

    return  <Box m={2}>
                <Grid component="form" container spacing={2}
                    onSubmit = {handleListar}  
                    >
                    <Grid item xs={6} sm={4} md={2}>
                        <TextField
                            fullWidth
                            label = "Zona"
                            size="small"
                            select
                            name="zona"
                            defaultValue = {''}
                            required
                        >
                            <MenuItem value=""><em>Todos</em></MenuItem>
                            <MenuItem value="1">ZONA 1</MenuItem>
                            <MenuItem value="2">ZONA 2</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                        <TextField
                            fullWidth
                            label = "Local"
                            size="small"
                            select
                            name="local"
                            defaultValue = {''}
                            required
                        >
                            <MenuItem value=""><em>Todos</em></MenuItem>
                            <MenuItem value="1">LOCAL 1 </MenuItem>
                            <MenuItem value="2">LOCAL 2</MenuItem>
                            <MenuItem value="3">LOCAL 3</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <TextField
                            fullWidth
                            label = "Fecha Inicio"
                            type = "date"
                            size="small"
                            name="fecha_inicio"
                            defaultValue = {hoy}
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
                            defaultValue = {hoy}
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
            </Box>
}