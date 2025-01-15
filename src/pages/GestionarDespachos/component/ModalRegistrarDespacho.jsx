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
import { useState } from "react";

const modalRegistrarTitle = "Registrando Despachos", modalEditarTitle = 'Editando Despachos', maxWidth = 'lg';

const procesarRegistrosExcel = ( { tableData, dataZonas, dataLocales, onAgregarEntregas, formatoEntregas} ) => {
    const newId = new Date().getTime();
    const nuevasEntregas = tableData.map( item => {
        const local = dataLocales.find(local => local.descripcion === item?.["0"]);
        const zona = dataZonas.find( zona => zona.id === local?.id_zona );

        return {
            id: newId + item.id,
            checked: false,
            editando: false,
            zona, 
            local,
            ...(formatoEntregas?.reduce((obj, cur, curIndex) => { 
                return {...obj, [cur.key]: item[`${curIndex + 1}`]}
            }, {}))
        }
    });
    
    if (nuevasEntregas.length){
        onAgregarEntregas(nuevasEntregas);
    }
};

const defaultEntregaValues = {
    zona : null,
    local: null,
};

export const ModalRegistrarDespacho = () => {
    const { data: dataLocales, cargando: cargandoLocales } = useLocalBean();
    const { data: dataZonas, cargando: cargandoZonas} = useZonaBean();
    const { registro, onGuardarDespacho, onCerrarModal, cargandoGuardando, flagModal} = useGestionarDespachos();
    const { data : dataClientes, cargando: cargandoClientes } = useClienteBean();
    const [clienteSeleccionado, setClienteSeleccionado] = useState(registro?.cliente);
    const [entregaRegistrando, setEntregaRegistrando] = useState(defaultEntregaValues);
    const { entregas, entregaRegistrandoValido,
            onAgregarEntrega, onAgregarEntregas, onCheckEntrega, onToggleEntregas,
            onQuitarEntrega, onQuitarEntregas, onActivarEditarEntrega, onCancelarEditarEntregar, onLimpiarEntregas, onSetInitEntregas} = useGestionarTablaEntregasDespacho({
                entregaRegistrando,
                setEntregaRegistrando,
                formatoEntregas: clienteSeleccionado?.formato_entregas
            });

    const cabecera = clienteSeleccionado?.formato_entregas 
                            ? ["#", "ZONA","LOCAL/TIENDA", ...clienteSeleccionado?.formato_entregas.map( item => item.name.toUpperCase())]
                            : ["#", "ZONA","LOCAL/TIENDA"];
    const cabeceraEjemploExcel = clienteSeleccionado?.formato_entregas 
                            ? ["LOCAL/TIENDA", ...clienteSeleccionado?.formato_entregas.map( item => item.name.toUpperCase())]
                            : ["LOCAL/TIENDA"];

    const onSubmit = (e)=> {
        e.preventDefault();
        const form = e.target;

        onGuardarDespacho({
            fecha_registro : form.fecha_registro.value, 
            id_cliente: form.cliente.value,
            secuencia: form.secuencia.value,
            observaciones: form.observaciones.value,
            entregas : entregas.map ( entrega => {
                const newEntrega = {};
                clienteSeleccionado?.formato_entregas.map( item => item.key)
                    .forEach(_key => {
                        newEntrega[_key] = entrega[_key];
                    });
                newEntrega.id = entrega.backend ? entrega.id : null;
                newEntrega.id_local = entrega.local.id;
                return newEntrega;
            })
        }, registro?.id ?? null);
    };

    const handleModalClose = () => {
        onCerrarModal();
    };

    const onChangeCliente = (e) => {
        const cliente = dataClientes.find( item => item.id === e.target.value );
        setClienteSeleccionado(cliente);
    };

    useEffect(()=>{
        if (Boolean(registro)){
            onSetInitEntregas(registro?.entregas ?? []);
            setClienteSeleccionado(registro?.cliente);
            return;
        }
        onLimpiarEntregas();
        setClienteSeleccionado(null);
    }, [flagModal]);

    useEffect(() => {
        //onLimpiarEntregas();
        if (!Boolean(clienteSeleccionado)){
            setEntregaRegistrando(defaultEntregaValues);
            return;
        }

        setEntregaRegistrando({
            ...defaultEntregaValues,
            ...(clienteSeleccionado?.formato_entregas?.map( item => item.key).reduce((obj, cur) => ({...obj, [cur]: ""}), {}))
        });
    }, [clienteSeleccionado]);

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
                        <Grid item sm={2} md={2} xs={12}>
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
                        <Grid item sm={4} md={6} xs={12}>
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
                                            onChange={onChangeCliente}
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
                        <Grid item sm={2} md={2} xs={12}>
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
                        <Grid item sm={4} md={6} xs={12}>
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
                {
                    Boolean(clienteSeleccionado) &&
                        <Box m={2}>
                            <BloqueAgregarEntrega dataLocales = {dataLocales} cargandoLocales={cargandoLocales} 
                                        dataZonas={ dataZonas } cargandoZonas={ cargandoZonas }
                                        entregaRegistrando = {entregaRegistrando} 
                                        setEntregaRegistrando  = {setEntregaRegistrando} 
                                        formatoEntregas = { clienteSeleccionado?.formato_entregas }/>
                            <Box display={"flex"} flexDirection={"row"} gap={"10px"} mb={2}>
                                <Typography mt={2} mb={1} variant="body2" >Mostrando <b>{entregas?.length}</b> Entregas: </Typography>
                                <Button size="small" variant="contained" color="primary"  onClick={()=>{onAgregarEntrega()}} disabled = {!entregaRegistrandoValido}>
                                    {Boolean(entregaRegistrando?.id) ? "MODIFICAR ENTREGA" :  "AGREGAR ENTREGA"}
                                </Button>
                                <ButtonExcel title={"AGREGAR ENTREGA(S) (EXCEL)"} 
                                    cabeceras={cabeceraEjemploExcel}
                                    ejemplos={[]}
                                    variant="contained" 
                                    size="small" 
                                    color="success"  
                                    setData={({ tableData }) => procesarRegistrosExcel({tableData, dataLocales, dataZonas, onAgregarEntregas, formatoEntregas: clienteSeleccionado?.formato_entregas})}
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
                                                            {
                                                                clienteSeleccionado?.formato_entregas?.map( item => {
                                                                    return <TableCell align="center">{entrega[item?.key]}</TableCell>
                                                                })
                                                            }
                                                        </TableRow>
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                }
            </ModalRegister>
    }