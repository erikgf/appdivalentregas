import { Box, Chip, Divider, Grid, InputLabel, Link,  Typography } from "@mui/material";
import { ModalRegister } from "../../../components";
import { ImageBlock } from "./ImageBlock.jsx";
import '../css/ModalRegistrarEntrega.css';

const modalTitle = "Visualizando Entrega", maxWidth = 'lg';

export const ModalRegistrarEntrega = ({registro = null, flagModal = false, setFlagModal}) => {
  
    const handleModalClose = () => {
        setFlagModal(false);
    };

    return  <ModalRegister fullScreen = {true} 
                    open ={flagModal} 
                    modalTitle = { modalTitle } 
                    maxWidth={maxWidth} 
                    handleModalClose = { handleModalClose } 
                    submitEnabled={false} 
                    submitAllowed={false}>
                <Box>
                    <Typography variant="body2"><strong>Sobre el Despacho</strong></Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={2}>
                            <InputLabel>Secuencia: </InputLabel>
                            <Typography variant="h6">{registro?.secuencia}</Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <InputLabel>Zona: </InputLabel>
                            <Typography variant="h6">{registro?.zona.descripcion ?? ""}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={2}>
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
                                <Grid item xs={12} md={2}>
                                    <InputLabel>Repartidor: </InputLabel>
                                    <Typography variant="h6">{registro?.repartidor?.nombres_apellidos}</Typography>
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
                    <Chip sx={{marginTop: 1, width: {xs: '100%', sm: 'auto'}}} label={registro?.estado.nombre} color={registro?.estado.color}/>
                    <Divider sx={{marginTop: 2, marginBottom: 2}}/>
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
                                        <Grid item xs={12}>
                                            {
                                                (!Boolean(registro?.images) || registro?.images?.length <= 0)
                                                    ? <Typography align="center">Sin imágenes registradas.</Typography>
                                                    : registro?.images?.map( image => {
                                                        return  image?.img_url && 
                                                                    <ImageBlock 
                                                                        key={image.orden}
                                                                        src={image.img_url}/>
                                                      })
                                            }
                                        </Grid>
                                    </Grid>
                            </>
                        
                    }
                    
                </Box>
            </ModalRegister>
    }