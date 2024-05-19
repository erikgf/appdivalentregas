import { Box, Grid, TextField, Button} from "@mui/material"
import {  } from "react-icons/md";
import { MdSearch as SearchIcon, MdOutlineFileOpen as ExcelIcon } from 'react-icons/md';
import { getHoy } from "../../../assets/utils";
import { LoadingButton } from "@mui/lab";

const hoy = getHoy();

export const CabeceraBuscar = ({onListar, cargandoRegistros = false, bloqueadoExcel = true, handleExcel}) => {
    const handleListar = (e)=>{
        e.preventDefault();
        const form = e.target;
        onListar({
            fechaInicio: form.fecha_inicio.value,
            fechaFin: form.fecha_fin.value
        });
    };

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
                            loading = {cargandoRegistros}
                            startIcon={<SearchIcon />}
                            >
                            BUSCAR
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                        <Button
                            fullWidth
                            type="button"
                            size="large"
                            variant="contained"
                            color="success"
                            onClick={handleExcel}
                            disabled = { bloqueadoExcel }
                            startIcon={<ExcelIcon />}>
                            EXP. EXCEL
                        </Button>
                    </Grid>
                </Grid>
            </Box>
}