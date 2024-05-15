import { useEffect } from "react";
import { LoadingButton } from "@mui/lab"
import { Box, Grid, TextField } from "@mui/material"
import { MdSearch as SearchIcon } from 'react-icons/md';
import { getHoy } from "../../../assets/utils";

const hoy = getHoy();

export const CabeceraBuscar = ({onListar}) => {
    const handleListar = (e)=>{
        e.preventDefault();
        const form = e.target;
        onListar({
            fechaInicio: form.fecha_inicio.value,
            fechaFin: form.fecha_fin.value
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