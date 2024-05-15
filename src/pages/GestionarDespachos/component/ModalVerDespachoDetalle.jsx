import { Box, Button, Chip, Divider, Grid, InputLabel, Link, TextField, Typography } from "@mui/material";
import { ModalRegister } from "../../../components/index.js";
import { useVerDespacho } from "../hooks/useVerDespacho.js";
import { LoadingButton } from "@mui/lab";
import { ImageBlock } from "../../ConsultarEntregasCliente/components/ImageBlock.jsx";

const modalTitle = "Visualizando Entrega Detalle", maxWidth = 'md';

export const ModalVerDespachoDetalle = () => {
    const { registro : registroPadre, entregaDetalle : registro, flagModalDetalle,  cargandoModificando,
                onCerrarEntregaDetalle, onEntregaEsModificable } = useVerDespacho();

    const handleModalClose = () => {
        onCerrarEntregaDetalle();
    };

    return  <ModalRegister open ={flagModalDetalle} 
                            modalTitle = { <Typography variant="h6" component={"span"} >
                                <span>{modalTitle}</span>
                                <Chip  sx={{marginTop: 1, width: {xs: '100%', sm: 'auto'}, right: 16, position : 'absolute'}} label={registro?.estado.nombre} color={registro?.estado.color}/>
                            </Typography> } 
                            maxWidth={maxWidth} 
                            handleModalClose = { handleModalClose } 
                            submitEnabled={false} 
                            submitAllowed={false}>
                <Box>
                    <Typography variant="body2"><strong>Sobre el Despacho</strong></Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={2}>
                            <InputLabel>Secuencia: </InputLabel>
                            <Typography variant="h6">{registroPadre?.secuencia}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <InputLabel>Zona: </InputLabel>
                            <Typography variant="h6">{registro?.zona.descripcion ?? ""}</Typography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <InputLabel>Local: </InputLabel>
                            <Typography variant="h6">{registro?.local?.descripcion ?? ""}</Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{mt: 1, mb: 1}}/>
                    <Typography variant="body2"><strong>Sobre la Entrega</strong></Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={4} md={2}>
                            <InputLabel>N° Guías: </InputLabel>
                            <Typography variant="h6">{registro?.numero_guias}</Typography>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <InputLabel>N° Gavetas: </InputLabel>
                            <Typography variant="h6">{registro?.numero_gavetas}</Typography>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <InputLabel>N° Gavetas: </InputLabel>
                            <Typography variant="h6">{registro?.numero_cajas}</Typography>
                        </Grid>             
                    </Grid>
                    <Divider sx={{mt: 2, mb: 2}}/>
                    <Typography sx={{display:'flex', gap: '16px', justifyContent: {xs: 'space-around', md: 'flex-start'}}} variant="h6">
                        <strong>Fecha En Tránsito: </strong> 
                        <span>{registro?.fecha_en_transito}</span>
                    </Typography>
                    {
                        registro?.fecha_por_entregar &&
                        <>
                            <Typography sx={{display:'flex', gap: '16px', justifyContent: {xs: 'space-around', md: 'flex-start'}}}  variant="h6">
                                <strong>Fecha por Entregar: </strong>
                                <span>{registro?.fecha_por_entregar}</span> 
                            </Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <InputLabel>Repartidor: </InputLabel>
                                    <Typography variant="h6">{registro?.repartidor?.nombres_apellidos ?? "* No Asignado *"}</Typography>
                                </Grid>
                            </Grid>
                        </>
                    }
                    <Divider sx={{marginTop: 2, marginBottom: 2}}/>
                    {
                        registro?.fecha_entregado &&
                            <Typography sx={{display:'flex', gap: '16px', justifyContent: {xs: 'space-around', md: 'flex-start'}}}  variant="h6">
                                <strong>Fecha Entregado: </strong> 
                                <span>{registro?.fecha_entregado}</span>
                            </Typography>
                    }
                    <Divider sx={{marginTop: 2, marginBottom: 2}}/>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            {
                            registro?.id_estado === 'E' &&
                                <>
                                    <Typography variant="body2"><strong>Sobre el Reparto</strong></Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <InputLabel>Observaciones: </InputLabel>
                                                <Typography variant="h6">{registro?.observaciones_repartidor ?? "-"}</Typography>
                                            </Grid>
                                            {
                                                Boolean(registro?.latitud_entrega) &&
                                                    <Grid item xs={12}>
                                                        <InputLabel>Ubicación Mapa: </InputLabel>
                                                        <Link href={`https://maps.google.com/?ll=${registro?.latitud_entrega},${registro?.longitud_entrega}`} target="_blank" variant="body2">Ir a ver mapa</Link>
                                                    </Grid>
                                            }
                                            <Grid item xs={12} sx={{position: 'relative'}}>
                                                {
                                                    !Boolean(registro?.es_modificable) 
                                                        ? <LoadingButton loading={cargandoModificando} onClick={()=>{onEntregaEsModificable({idEntrega: registro.id, modificable : true})}}
                                                                size="small" color="secondary" sx={{right: 0, top: 0, position: 'absolute'}} variant="contained">Habilitar Resubir Fotos</LoadingButton>
                                                        : <LoadingButton loading={cargandoModificando} onClick={()=>{onEntregaEsModificable({idEntrega: registro.id, modificable : false})}}
                                                        size="small" color="error" sx={{right: 0, top: 0, position: 'absolute'}} variant="contained">Deshabilitar Resubir Fotos</LoadingButton>
                                                        
                                                }
                                                <Box mt={4}>
                                                {
                                                    (!Boolean(registro?.images) || registro?.images?.length <= 0)
                                                        ? <Typography align="center">Sin imágenes registradas.</Typography>
                                                        : registro?.images?.map( image => {
                                                            return  image?.img_url && 
                                                                        <ImageBlock key={image.orden} src={image.img_url}/>
                                                        })
                                                }
                                                </Box>
                                            </Grid>
                                        </Grid>
                                </>
                            }
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{position: 'relative', display: 'none'}}>
                            <Button size="small" sx={{right: 0, top: 8, position: 'absolute'}} variant="contained">Guardar</Button>
                            <InputLabel>Observaciones revisor: </InputLabel>
                            <TextField 
                                fullWidth
                                size="small"
                                margin="dense"
                                placeholder="Escribe anotaciones / observaciones..."
                                name="observaciones_revisor"
                                rows={5} 
                                multiline/>
                        </Grid>
                    </Grid>
                </Box>
            </ModalRegister>
    }