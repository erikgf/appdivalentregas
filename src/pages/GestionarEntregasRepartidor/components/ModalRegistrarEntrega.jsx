import { useEffect, useRef, useState } from "react";
import { Box, Button,  Divider, Grid, InputLabel, LinearProgress, TextField, Typography } from "@mui/material";
import { ModalRegister } from "../../../components";
import { ImageBlock } from "./ImageBlock.jsx";
import { useConsultarEntregasRepartidor } from "../hooks/useConsultarEntregasRepartidor.js";
import { MdCamera as CameraIcon } from 'react-icons/md';
import '../css/ModalRegistrarEntrega.css';
import Compressor from "compressorjs";

const modalRegisterTitle = "Registrando Entrega", modalEditTitle = "Editando Entrega", maxWidth = 'lg';

const getUserLocation = ( setUserLocation ) => {
    setUserLocation((userLocation) => {
        return {...userLocation, cargando:  true};
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ loading: false, latitud: latitude, longitud: longitude, error: null });
        },
        (error) => {
          console.error('Error getting user location:', error);
          setUserLocation({loading: false, latitud: null, longitud: null, error});
        }
      );
    }
    else {
      setUserLocation({loading: false, latitud: null, longitud: null, error: 'Geolocation is not supported by this browser.'});
      console.error('Geolocation is not supported by this browser.');
    }
  };

export const ModalRegistrarEntrega = () => {
    const hiddenFileInput = useRef(null);
    const refBtnCamara = useRef(null)
    const { registro, flagModalSave, cargandoGuardando, onCerrarModalSave, onGuardarEntrega } = useConsultarEntregasRepartidor();
    const [images, setImages] = useState([]);
    const [userLocation, setUserLocation] = useState({
        cargando: false, latitud: null, longitud: null, error: null
    });
    const estaEntregado = Boolean(registro?.id_estado == "E");

    const executeScroll = () => {
        refBtnCamara.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    };

    function handleChange(e) {
        const imagePicked = e.target.files[0];

        new Compressor(imagePicked, {
            quality: 0.7, // 0.6 can also be used, but its not recommended to go below.
            success: (imageCompressed) => {
              // compressedResult has the compressed file.
              // Use the compressed file to upload the images to your server.        
                setImages( images => {
                    return [
                        ...images, 
                        {
                            id: new Date().getTime(),
                            file: imageCompressed,
                            url: URL.createObjectURL(imageCompressed)
                        }
                    ];
                });
            },
        });
        
        e.target.value = null;

        setTimeout(()=>{
            executeScroll();
        }, 300);
    };

    const onSubmit = (e)=> {
        e.preventDefault();
        const form = e.target;
        onGuardarEntrega({
            observaciones : form.observaciones.value, 
            imagenes : images.map ( image => image.file ),
            latitud: userLocation.latitud,
            longitud: userLocation.longitud
        });
    };

    const handleModalClose = () => {
        onCerrarModalSave();
    };

    const onRemoveImage = (id) => {
        setImages( images => {
            return images.filter( image => image.id != id);
        });
    };


    useEffect(() => {
        if (flagModalSave == false){
            setImages([]);
        } else {
            if (!estaEntregado){
                getUserLocation(setUserLocation);
            }
            
        }
    }, [flagModalSave]);

    return  <ModalRegister fullScreen = {true} 
                    open ={flagModalSave} 
                    onSubmit = {onSubmit} 
                    modalTitle = { estaEntregado ? modalEditTitle : modalRegisterTitle} 
                    maxWidth={maxWidth} 
                    handleModalClose = { handleModalClose } 
                    submitEnabled={true} 
                    submitAllowed={true} 
                    submitLoading = { cargandoGuardando }
                    okButtonText = {estaEntregado ? "EDITAR ENTREGAR" : "REALIZAR ENTREGA"}>
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
                        {
                            registro?.valores.map( valor => (
                                <Grid key={valor.key} item xs={4} md={2}>
                                    <InputLabel>{valor.label}: </InputLabel>
                                    <Typography variant="h6">{valor?.value}</Typography>
                                </Grid>
                            ))
                        }           
                    </Grid>

                    <Divider sx={{mt: 2, mb: 2}}/>

                    <Typography variant="body2" color={"primary"}><strong>Datos a Registrar</strong></Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={2}>
                            <TextField 
                                    name="observaciones"
                                    margin="dense"
                                    size="small"
                                    label="Observaciones"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    defaultValue={ registro?.observaciones_repartidor ?? ""}
                                    autoFocus
                                />
                        </Grid>
                        {
                             !estaEntregado &&
                                    <Grid item xs={12} md={2}>
                                    {
                                        userLocation?.cargando
                                            ?   <>
                                                    <Typography variant="subtitle">Obteniendo GPS...</Typography>
                                                    <LinearProgress />
                                                </>
                                            :   <>
                                                    <InputLabel>Ubicación GPS</InputLabel>
                                                    <Typography variant="subtitle" color={Boolean(userLocation.latitud)  ? "secondary" : "error"} fontWeight={'bold'}>
                                                        { 
                                                            Boolean(userLocation.latitud) 
                                                                ? "¡GPS Encontrado!"
                                                                : "No encontrado."
                                                        }
                                                    </Typography>
                                                </>
                                    }
                                </Grid>
                        }
                        <Grid item xs={12} md={2}>
                            {
                                images?.map( image => {
                                    return  image?.url && 
                                                <ImageBlock 
                                                     key={image.id}
                                                     src={image.url}
                                                    onRemoveImage={
                                                        () => {
                                                            onRemoveImage(image.id);
                                                        }
                                                    }/>
                                })
                            }
                            <Button 
                                    ref={refBtnCamara}
                                    fullWidth 
                                    variant="contained" color="success" size="large" 
                                    onClick={()=>{
                                        hiddenFileInput.current.click();
                                    }}
                                    disabled = { images?.length >= 2 }
                                    startIcon={<CameraIcon />}>CÁMARA</Button>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                style={{display: 'none'}}
                                accept="image/*"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </ModalRegister>
    }