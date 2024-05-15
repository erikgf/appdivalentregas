import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";

export const BloqueAgregarEntrega = ({dataLocales, cargandoLocales, dataZonas, cargandoZonas, entregaRegistrando, setEntregaRegistrando}) => {
                        
    return  <>
                <Typography variant="body2">Registro de Despachos</Typography>
                <Box m={2}>
                    <Grid container spacing={1}>
                        <Grid item sm={3}>
                            {
                            !cargandoZonas &&
                                <TextField 
                                    select
                                    margin="dense"
                                    size="small"
                                    label="Zonas"
                                    InputLabelProps={{shrink: true}}
                                    value = {entregaRegistrando?.zona?.id ?? ""}
                                    onChange={e => {
                                        const zona = dataZonas.find(zona => zona.id == e.target.value);
                                        setEntregaRegistrando(
                                            {
                                                ...entregaRegistrando,
                                                "zona": zona,
                                                "local": null
                                            }
                                        );
                                    }}
                                    fullWidth
                                >
                                    <MenuItem value="">Seleccionar Zona</MenuItem>
                                {
                                    dataZonas?.map( item => {
                                        return <MenuItem key={item.id} value={item.id}>{item.descripcion}</MenuItem>
                                    })
                                }
                                </TextField>
                            }
                        </Grid>
                        <Grid item sm={3}>
                            {
                                !cargandoLocales &&
                                    <TextField 
                                        select
                                        margin="dense"
                                        size="small"
                                        label="Locales"
                                        InputLabelProps={{shrink: true}}
                                        value = {entregaRegistrando?.local?.id ?? ""}
                                        onChange={e => {
                                            const local = dataLocales.find(local => local.id == e.target.value);
                                            setEntregaRegistrando(
                                                {
                                                    ...entregaRegistrando,
                                                    "local": local
                                                }
                                            );
                                        }}
                                        fullWidth
                                    >
                                        <MenuItem value="">Seleccionar Local</MenuItem>
                                    {
                                        dataLocales?.filter(local=>local.id_zona == entregaRegistrando?.zona?.id)?.map( item => {
                                            return <MenuItem key={item.id} value={item.id}>{item.descripcion}</MenuItem>
                                        })
                                    }
                                    </TextField>
                                }
                        </Grid>
                        <Grid item sm={2}>
                            <TextField
                                    type="number"
                                    margin="dense"
                                    size="small"
                                    label="# Cajas"
                                    fullWidth
                                    inputProps={{min: 0}}
                                    value = {entregaRegistrando?.numero_cajas ?? ""}
                                    onChange={e => {
                                        setEntregaRegistrando(
                                            {
                                                ...entregaRegistrando,
                                                "numero_cajas": e.target.value
                                            }
                                        );
                                    }}
                                    />
                        </Grid>
                        <Grid item sm={2}>
                            <TextField
                                    type="number"
                                    margin="dense"
                                    size="small"
                                    label="# Guías"
                                    fullWidth
                                    inputProps={{min: 0}}
                                    value = {entregaRegistrando?.numero_guias ?? ""}
                                    onChange={e => {
                                        setEntregaRegistrando(
                                            {
                                                ...entregaRegistrando,
                                                "numero_guias": e.target.value
                                            }
                                        );
                                    }}
                                    />
                        </Grid>
                        <Grid item sm={2}>
                            <TextField
                                    type="number"
                                    margin="dense"
                                    size="small"
                                    label="# Gavetas"
                                    fullWidth
                                    inputProps={{min: 0}}
                                    value = {entregaRegistrando?.numero_gavetas ?? ""}
                                    onChange={e => {
                                        setEntregaRegistrando(
                                            {
                                                ...entregaRegistrando,
                                                "numero_gavetas": e.target.value
                                            }
                                        );
                                    }}
                                    />
                        </Grid>
                    </Grid>
                </Box>
            </>
};