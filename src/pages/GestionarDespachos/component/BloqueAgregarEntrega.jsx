import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";

export const BloqueAgregarEntrega = ({dataLocales, cargandoLocales, dataZonas, cargandoZonas, entregaRegistrando, setEntregaRegistrando, formatoEntregas}) => {
                        
    return  <>
                <Typography variant="body2">Registro de Despachos</Typography>
                <Box m={2}>
                    <Grid container spacing={1}>
                        <Grid item sm={3} xs={12}>
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
                        <Grid item sm={3} xs={12}>
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
                        {
                            formatoEntregas?.map ( item => {
                                return <Grid key={item.key} item sm={2} xs={12}>
                                            <TextField
                                                type={item.type === "integer" ? "number" : "text"}
                                                margin="dense"
                                                size="small"
                                                label={item.name}
                                                fullWidth
                                                inputProps={item.type === "integer"  ? {min: 0} : {}}
                                                value = {entregaRegistrando?.[item.key] ?? ""}
                                                onChange={e => {
                                                    setEntregaRegistrando(
                                                        {
                                                            ...entregaRegistrando,
                                                            [item.key]: e.target.value
                                                        }
                                                    );
                                                }}
                                                />
                                        </Grid>
                            })
                        }
                    </Grid>
                </Box>
            </>
};