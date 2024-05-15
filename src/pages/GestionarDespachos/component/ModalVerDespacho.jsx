import { memo } from "react";
import { Box, Button, Checkbox, Chip, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ModalRegister } from "../../../components/index.js"
import { useVerDespacho } from "../hooks/useVerDespacho.js";
import { ResumenPie } from "./ResumenPie.jsx";
import { MdRemoveRedEye as EyeIcon } from "react-icons/md";

const modalTitle = "Visualizando Despachos/Día", maxWidth = 'lg';
const cabecera = ["N°", "REPARTIDOR ASIGNADO","ZONA", "LOCAL",  "# CAJAS", "# GAVETAS","# GUIAS","STATUS"];

export const ModalVerDespacho = () => {
    const { registro, entregas, flagModal,  cargandoAsignacion,
            onToggleAllEntregas, onToggleEntrega, onAsignarRepartidores, onLimpiarRegistro, onVerEntregaDetalle, onHabilitarModificarDespachos } = useVerDespacho();

    const handleModalClose = () => {
        onLimpiarRegistro();
    };

    return  <ModalRegister open ={flagModal}  modalTitle = { modalTitle } maxWidth={maxWidth} 
                            handleModalClose = { handleModalClose } submitEnabled={false} submitAllowed={false}
                            options={[
                                {
                                    title: "Modificar Despachos",
                                    onAction: onHabilitarModificarDespachos,
                                },
                                { 
                                    title : "Asignar Repartidores",
                                    onAction : onAsignarRepartidores, 
                                    loading: cargandoAsignacion, 
                                    disabled: entregas?.filter(e => {
                                        if (e.puedo_asignar){
                                            return e.checked;
                                        }
                                        return false;
                                    }).length <= 0
                                }
                            ]}>
                {
                    Boolean(registro) &&
                        <>
                            <Box m={2}>
                                <Grid container spacing={2}>
                                    <Grid item sm={6} md={9}>
                                        <Grid container spacing={2}>
                                            <Grid item sm={6} md={4}><b>Fecha:</b> {registro.fecha_registro}</Grid>
                                            <Grid item sm={12} md={6}><b>Cliente:</b> {registro?.cliente.razon_social}</Grid>
                                            <Grid item sm={6} md={4}><b>Secuencia:</b> {registro.secuencia}</Grid>
                                            <Grid item sm={12} md={6}><b>Observaciones:</b> {registro.observaciones}</Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sm={6} md={3}>
                                        {
                                            registro?.data_pie &&
                                                <ResumenPie data = { registro?.data_pie } />
                                        }
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box m={2}>
                                <Typography mt={2} mb={1} variant="body2" >Mostrando <b>{entregas?.length}</b> Entregas | Cajas: <b>{registro.cantidad_cajas}</b> | Guías: <b>{registro.cantidad_guias}</b> | Gavetas: <b>{registro.cantidad_gavetas}</b></Typography>
                                <TableContainer component={Paper}>
                                    <Table size="small" sx={{ minWidth: 650 }} >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell padding="checkbox" align="center">
                                                    {
                                                        entregas?.filter( e => e.puedo_asignar)?.length > 0 &&
                                                            <Checkbox size="small" onChange={(e)=>{ onToggleAllEntregas(e.target.checked)}}/>
                                                    }
                                                </TableCell>
                                                {
                                                    cabecera?.map(celda => {
                                                        return <TableCell padding="none" key={celda}>
                                                            <b>{celda}</b>
                                                        </TableCell>
                                                    })
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                entregas?.map((entrega, i) => {
                                                    const repartidor = entrega?.repartidor 
                                                                ? <Typography variant="body2" >{ entrega.repartidor.nombres_apellidos  }</Typography>
                                                                : <Typography variant="caption" >* No Asignado *</Typography>;

                                                    const _num = `000${i + 1}`;

                                                    return  <TableRow key={entrega.id}>
                                                                <TableCell align="center" padding="checkbox">
                                                                    {
                                                                        entrega.puedo_asignar 
                                                                            ? <Checkbox size="small" checked={entrega.checked} onChange={()=>{onToggleEntrega(entrega.id)}} />
                                                                            : false
                                                                    }
                                                                    {
                                                                        entrega.id_estado  == 'E' &&
                                                                            <Button 
                                                                                onClick = {()=>{
                                                                                    onVerEntregaDetalle({idEntrega: entrega.id});
                                                                                }}
                                                                                variant="contained" size="large" color="primary" title="Ver Detalle"><EyeIcon /></Button>
                                                                    }
                                                                </TableCell>
                                                                <TableCell padding="none" sx={{paddingRight: 1}}>{_num.substring(_num.length - 3)}</TableCell>
                                                                <TableCell padding="none">{repartidor}</TableCell>
                                                                <TableCell padding="none">{entrega?.zona?.descripcion}</TableCell>
                                                                <TableCell padding="none">{entrega?.local?.descripcion}</TableCell>
                                                                <TableCell padding="none" align="center">{entrega.numero_cajas}</TableCell>
                                                                <TableCell padding="none" align="center">{entrega.numero_gavetas}</TableCell>
                                                                <TableCell padding="none" align="center">{entrega.numero_guias}</TableCell>
                                                                <TableCell padding="none">
                                                                    <Chip sx={{width:'100%'}} size="small" label = {entrega.estado?.nombre} color={entrega.estado?.color} />
                                                                </TableCell>
                                                            </TableRow>
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </>
                }
            </ModalRegister>
    }