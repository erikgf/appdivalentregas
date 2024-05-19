import { Box, Chip, Divider, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { ModalRegister } from "../../../components/index.js";
import '../css/ModalRegistrarEntrega.css';
import { useConsultarEntregasRepartidor } from "../hooks/useConsultarEntregasRepartidor.js";
import { ImageBlockVer } from "./ImageBlockVer.jsx";

const modalTitle = "Visualizando Entrega", maxWidth = 'lg';

export const ModalRegistrarEntregaVer = () => {
    const { registro, flagModal, onCerrarModal, onSeleccionarEntregaParaEditar} = useConsultarEntregasRepartidor();

    const handleModalClose = () => {
        onCerrarModal();
    };

    return  <ModalRegister fullScreen = {true} 
                    open ={flagModal} 
                    modalTitle = { modalTitle } 
                    maxWidth={maxWidth} 
                    handleModalClose = { handleModalClose } 
                    submitEnabled={false} 
                    submitAllowed={false}
                    options={ Boolean(registro?.es_modificable) && [
                        { 
                            title : "EDITAR",
                            color : "warning",
                            type: "button",
                            onAction : () => {
                                onSeleccionarEntregaParaEditar(registro?.id);
                            }
                        }
                    ] }
                    >
                <Box>
                    <Typography variant="body2"><strong>Sobre el despacho</strong></Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={2}>
                            <InputLabel>Fecha Registro: </InputLabel>
                            <Typography variant="h6">{registro?.despacho?.fecha_registro}</Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <InputLabel>Secuencia: </InputLabel>
                            <Typography variant="h6">{registro?.despacho?.secuencia}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} >
                            <InputLabel>Cliente: </InputLabel>
                            <Typography variant="h6">{registro?.despacho?.cliente?.razon_social}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={2}>
                            <InputLabel>Local: </InputLabel>
                            <Typography variant="h6">{registro?.local?.descripcion ?? "" }</Typography>
                        </Grid>
                    </Grid>
                    
                    <Divider sx={{mt: 2, mb: 2}}/>

                    <Typography variant="body2"><strong>Sobre la entrega</strong></Typography>
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
                            <InputLabel>N° Cajas: </InputLabel>
                            <Typography variant="h6">{registro?.numero_cajas}</Typography>
                        </Grid>             
                    </Grid>
                    
                    <Divider sx={{mt: 2, mb: 2}}/>
                    {
                        registro?.fecha_por_entregar &&
                            <Typography sx={{display:'flex', gap: '16px', justifyContent: {xs: 'space-around', md: 'flex-start'}}}  variant="h6">
                                <strong>Fecha por Entregar: </strong>
                                <span>{registro?.fecha_por_entregar}</span> 
                            </Typography>
                    }
                    <Divider sx={{mt: 2, mb: 2}}/>
                    {
                        registro?.fecha_entregado &&
                            <Typography sx={{display:'flex', gap: '16px', justifyContent: {xs: 'space-around', md: 'flex-start'}}}  variant="h6">
                                <strong>Fecha Entregado: </strong> 
                                <span>{registro?.fecha_entregado}</span>
                            </Typography>
                    }
                    <Chip sx={{mt: 1, width: {xs: '100%', sm: 'auto'}}} label={registro?.estado.nombre} color={registro?.estado.color}/>

                    <Divider sx={{mt: 2, mb: 2}}/>
                    {
                        registro?.id_estado === 'E' &&
                            <>
                                <Typography variant="body2"><strong>Sobre el Reparto</strong></Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} >
                                        <InputLabel>Observaciones: </InputLabel>
                                        <Typography variant="h6">{registro?.observaciones_repartidor ?? "-"}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            (!Boolean(registro) || registro?.images?.length <= 0)
                                                ? <Typography align="center">Sin imágenes registradas.</Typography>
                                                :   <Grid container spacing={2}>
                                                        {
                                                            registro?.images?.map( image => {
                                                                return  image?.img_url && 
                                                                        <Grid key={image.orden} item xs={12} sm={3}>
                                                                            <ImageBlockVer src={image.img_url}/>
                                                                        </Grid>
                                                                })
                                                        }
                                                    </Grid>
                                        }
                                    </Grid>
                                </Grid>
                            </>
                        
                    }
                    
                </Box>
            </ModalRegister>
    }