import { Box, Button, Checkbox, Divider, Grid, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { MdDelete as DeleteIcon, MdEdit as EditIcon, MdCancel as CancelIcon } from "react-icons/md";
import { BlockVacio, ModalRegister } from "../../../components";
import { useClienteBean } from "../../../hooks/useClienteBean.js";
import { useGestionarTablaEntregasDespacho } from "../hooks/useGestionarTablaEntregasDespacho.js";
import { BloqueAgregarEntrega } from "./BloqueAgregarEntrega.jsx";
import { ButtonExcel } from "../../../components/ButtonExcel/ButtonExcel.jsx";
import { useZonaBean } from "../../../hooks/useZonaBean.js";
import { useLocalBean } from "../../../hooks/useLocalBean.js";
import { useGestionarDespachos } from "../hooks/useGestionarDespachos.js";
import { useEffect } from "react";

const modalRegistrarTitle = "Registrando Despachos", modalEditarTitle = 'Editando Despachos', maxWidth = 'lg';
const cabecera = ["#","ZONA", "LOCAL",  "# CAJAS", "#GUIAS", "# GAVETAS"];
const cabeceraEjemploExcel = ["LOCAL",  "CAJAS", "GUIAS", "GAVETAS"];

const procesarRegistrosExcel = ( { tableData, dataZonas, dataLocales, onAgregarEntregas} ) => {
    const newId = new Date().getTime();
    const nuevasEntregas = tableData.map( item => {
        const local = dataLocales.find(local => local.descripcion === item?.LOCAL);
        const zona = dataZonas.find( zona => zona.id === local?.id_zona );

        return {
            id: newId + item.id,
            checked: false,
            editando: false,
            zona, 
            local,
            numero_cajas: item?.CAJAS,
            numero_gavetas : item?.GAVETAS,
            numero_guias : item?.GUIAS,
        }
    });
    
    if (nuevasEntregas.length){
        onAgregarEntregas(nuevasEntregas);
    }
};

export const ModalRegistrarDespacho = () => {
    const { data: dataLocales, cargando: cargandoLocales } = useLocalBean();
    const { data: dataZonas, cargando: cargandoZonas} = useZonaBean();
    const { entregas, entregaRegistrando,  entregaRegistrandoValido,
            setEntregaRegistrando, onAgregarEntrega, onAgregarEntregas, onCheckEntrega, onToggleEntregas,
            onQuitarEntrega, onQuitarEntregas, onActivarEditarEntrega, onCancelarEditarEntregar, onLimpiarEntregas, onSetInitEntregas} = useGestionarTablaEntregasDespacho();
    const { registro, onGuardarDespacho, onCerrarModal, cargandoGuardando, flagModal} = useGestionarDespachos();
    const { data : dataClientes, cargando: cargandoClientes } = useClienteBean();

    const onSubmit = (e)=> {
        e.preventDefault();
        const form = e.target;
        onGuardarDespacho({
            fecha_registro : form.fecha_registro.value, 
            id_cliente: form.cliente.value,
            secuencia: form.secuencia.value,
            observaciones: form.observaciones.value,
            entregas
        }, registro?.id ?? null);
    };

    const handleModalClose = () => {
        onCerrarModal();
    };

    useEffect(()=>{
        if (Boolean(registro)){
            onSetInitEntregas(registro?.entregas ?? []);
            return;
        }
        onLimpiarEntregas();
    }, [flagModal]);

    return  <ModalRegister open ={flagModal} onSubmit = {onSubmit} 
                            modalTitle = { Boolean(registro?.id) ? modalEditarTitle : modalRegistrarTitle  } 
                            maxWidth={maxWidth} 
                            handleModalClose = { handleModalClose } submitEnabled={false} submitAllowed={false}
                            options={[
                                { 
                                    title : "GUARDAR",
                                    color : "success",
                                    type: "submit",
                                    loading: cargandoGuardando, 
                                    disabled: cargandoGuardando
                                }
                            ]}>
                <Box m={2}>
                    <Grid container spacing={2}>
                        <Grid item sm={2} md={2}>
                            <TextField 
                                    type="date"
                                    name="fecha_registro"
                                    margin="dense"
                                    size="small"
                                    label="Fecha Registro"
                                    defaultValue={ registro?.fecha_registro ?? ""}
                                    required
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                />
                        </Grid>
                        <Grid item sm={4} md={6}>
                            {
                                !cargandoClientes &&
                                        <TextField 
                                            select
                                            name="cliente"
                                            margin="dense"
                                            size="small"
                                            label="Clientes"
                                            required
                                            InputLabelProps={{shrink: true}}
                                            defaultValue={ registro?.cliente?.id ?? ""}
                                            fullWidth
                                        >
                                            <MenuItem value="">Seleccionar</MenuItem>
                                        {
                                            dataClientes?.map( item => {
                                                return <MenuItem key={item.id} value={item.id}>{item.descripcion}</MenuItem>
                                            })
                                        }
                                        </TextField>
                            }
                        </Grid>
                        <Grid item sm={2} md={2}>
                            <TextField 
                                    type="text"
                                    name="secuencia"
                                    margin="dense"
                                    size="small"
                                    label="Secuencia"
                                    required
                                    fullWidth
                                    defaultValue={ registro?.secuencia ?? ""}
                                    />
                        </Grid>
                        <Grid item sm={4} md={6}>
                            <TextField 
                                    type="text"
                                    name="observaciones"
                                    margin="dense"
                                    size="small"
                                    label="Observaciones"
                                    fullWidth
                                    multiline
                                    defaultValue={ registro?.observaciones ?? ""}
                                    />
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                <Box m={2}>
                    <BloqueAgregarEntrega dataLocales = {dataLocales} cargandoLocales={cargandoLocales} 
                                    dataZonas={ dataZonas } cargandoZonas={ cargandoZonas }
                                    entregaRegistrando = {entregaRegistrando} setEntregaRegistrando  = {setEntregaRegistrando} />
                    <Box display={"flex"} flexDirection={"row"} gap={"10px"} mb={2}>
                        <Typography mt={2} mb={1} variant="body2" >Mostrando <b>{entregas?.length}</b> Entregas: </Typography>
                        <Button size="small" variant="contained" color="primary"  onClick={()=>{onAgregarEntrega()}} disabled = {!entregaRegistrandoValido}>
                            {Boolean(entregaRegistrando?.id) ? "MODIFICAR ENTREGA" :  "AGREGAR ENTREGA"}
                        </Button>
                        <ButtonExcel title={"AGREGAR ENTREGA(S) (EXCEL)"} 
                            cabeceras={cabeceraEjemploExcel}
                            ejemplos={[["NOMBRE LOCAL 1", 10, 5, 10],["NOMBRE LOCAL 2", 10, 12, 12]]}
                            variant="contained" 
                            size="small" 
                            color="success"  
                            setData={({ tableData }) => procesarRegistrosExcel({tableData, dataLocales, dataZonas, onAgregarEntregas})}
                            />
                        {
                            entregas?.filter( e=>e.checked)?.length > 0 &&
                                <Button size="small" variant="contained" color="error" onClick={()=>onQuitarEntregas()}>QUITAR ENTREGAS</Button>
                        }
                    </Box>
                    <TableContainer component={Paper} sx={{maxHeight: 350}}>
                        <Table size="small" sx={{ minWidth: 650}} >
                            <TableHead>
                                <TableRow>
                                    <TableCell  padding="checkbox" align="center">
                                        {
                                            entregas?.length > 0 &&
                                                <Checkbox size="small" onChange={(e)=>{ onToggleEntregas(e.target.checked)}}/>
                                        }
                                    </TableCell>
                                    {
                                        cabecera?.map(celda => {
                                            return <TableCell key={celda}>
                                                <b>{celda}</b>
                                            </TableCell>
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    entregas.length <= 0
                                    ? <TableRow>
                                        <TableCell colSpan={99}>
                                            <BlockVacio title="¡Agrega Entregas al registro!" />
                                        </TableCell>
                                      </TableRow>
                                    : entregas?.map((entrega, index) => {
                                        return  <TableRow key={entrega.id}>
                                                    <TableCell sx={{display: "flex", alignItems:"center", justifyContent: "center"}}>
                                                        <Checkbox size="small" checked={entrega.checked} onChange={(e)=>{
                                                            const {
                                                                target: { checked }
                                                            } = e;
                                                            onCheckEntrega({id: entrega.id, checked })
                                                        }} />
                                                        {
                                                            !Boolean(entrega.editando) 
                                                                ? <IconButton title="Editar entrega"  onClick={()=>onActivarEditarEntrega(entrega.id)}>
                                                                    <EditIcon style={{color:"orange"}}/>
                                                                  </IconButton>
                                                                : <IconButton title="Cancelar edición" onClick={()=>onCancelarEditarEntregar()}>
                                                                        <CancelIcon style={{color:"orange"}}/>
                                                                    </IconButton>
                                                        }
                                                        <IconButton title="Quitar entrega"  onClick={()=>onQuitarEntrega(entrega.id)}>
                                                            <DeleteIcon style={{color:"red"}}/>
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{entrega?.zona?.descripcion}</TableCell>
                                                    <TableCell>{entrega?.local?.descripcion}</TableCell>
                                                    <TableCell align="center">{entrega.numero_cajas}</TableCell>
                                                    <TableCell align="center">{entrega.numero_guias}</TableCell>
                                                    <TableCell align="center">{entrega.numero_gavetas}</TableCell>
                                                </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </ModalRegister>
    }