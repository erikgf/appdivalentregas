import { useEffect, useMemo } from "react";
import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, IconButton, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { ModalRegister } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { useCliente } from "../hooks/useCliente";
import { defaultValuesForm } from "../data/defaultValuesForm";
import { MdDelete, MdEdit, MdEditOff, MdSave } from "react-icons/md";

export const FormRegister = () => {
    const { openModal, seleccionado, cargandoGuardar, onGuardarRegistro, onCloseModal} = useCliente();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});
    const editandoRegistro = Boolean(seleccionado);

    const handleAgregarColumna = () => {
        assignValueForm("formato_entregas", [
            ...valuesForm?.formato_entregas, {
                id: new Date().getTime(),
                key: "", name: "", type: "integer",
               _name: "", _type: "integer",
                isEditing: true
            }]);
    };

    const onEditTable = (id) => {
        assignValueForm("formato_entregas", valuesForm?.formato_entregas.map( item => item.id === id 
            ? ({
                ...item, 
                _key: item.key,
                _name: item.name,
                _type: item.type,
                isEditing: true
            })
            : item
        ));
    };

    const onDeleteTable = (id) => {
        assignValueForm("formato_entregas", valuesForm?.formato_entregas.filter( item => item.id !== id));
    };

    const onCancelTable = (id) => {
        const itemEditado = valuesForm?.formato_entregas.find(item => item.id === id);
        if (Boolean(itemEditado.key)){
            assignValueForm("formato_entregas", valuesForm?.formato_entregas.map( item => item.id === id ? ({...item, isEditing: false}) : item));
        } else {
            onDeleteTable(id);
        }
    };

    const onSaveTable = (id) => {
        assignValueForm("formato_entregas", 
            valuesForm?.formato_entregas.map( item => item.id === id 
            ? ({
                ...item,
                name: item._name.trim(),
                key: item._name.trim().toLowerCase().replaceAll(" ", "_").replaceAll(".",""),
                type: item._type.trim(),
                isEditing: false
            })
            : item
        ));
    };

    const handleChangeTable = (id, e) => {
        assignValueForm("formato_entregas", 
            valuesForm?.formato_entregas.map( item => item.id === id 
            ? ({
                ...item,
                [e.target.name] : e.target.value
            })
            : item
        ));
    };

    useEffect(()=>{
        if (editandoRegistro){
            const { numero_documento, razon_social, celular, direccion, formato_entregas, username, es_sistema, estado_acceso  } = seleccionado;

            resetValueForm({
                numero_documento,
                razon_social,
                celular,
                direccion,
                formato_entregas,
                username, es_sistema, estado_acceso
            });

            return;
        }
    }, [seleccionado]);

    useEffect(()=>{
        if (openModal === false){
            resetValueForm();
        }
    }, [openModal]);

    const titleModal = useMemo(()=>{
        return `${ !editandoRegistro ? 'Nuevo' : 'Editando'} Cliente`;
    }, [seleccionado]);

    return (
        <ModalRegister 
                modalTitle = {titleModal}
                okButtonText = 'Guardar'
                open = { openModal }
                handleModalClose = {()=>{
                    onCloseModal();
                }}
                onSubmit = { (e)=>{
                    e.preventDefault();
                    onGuardarRegistro(valuesForm);
                }}
                maxWidth="md"
                submitLoading={cargandoGuardar}
            >
            <Grid container spacing={2}>
                <Grid item  xs={12} sm={4}>
                    <TextField
                        label="Núm. Documento"
                        size="small"
                        margin="dense"
                        type="text"
                        autoFocus
                        fullWidth
                        required
                        value = {valuesForm?.numero_documento}
                        onChange={ (e)=>{
                            assignValueForm("numero_documento", e.target.value);
                        }}
                        />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        label="Razón Social"
                        size="small"
                        margin="dense"
                        type="text"
                        fullWidth
                        required
                        value = {valuesForm?.razon_social}
                        onChange={ (e)=>{
                            assignValueForm("razon_social", e.target.value);
                        }}
                        />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                            label="Celular"
                            size="small"
                            margin="dense"
                            type="text"
                            fullWidth
                            value = {valuesForm?.celular ?? ""}
                            onChange={ (e)=>{
                                assignValueForm("celular", e.target.value);
                            }}/>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                            label="Dirección"
                            size="small"
                            margin="dense"
                            type="text"
                            fullWidth
                            multiline
                            value = {valuesForm?.direccion ?? ""}
                            onChange={ (e)=>{
                                assignValueForm("direccion", e.target.value);
                            }}/>
                </Grid>
                
                <Grid item xs={12}>
                    <Box display={"flex"} gap={5} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography variant="subtitle2">Formato Archivo Subida</Typography>
                        <Button size="small" variant="contained" color="info" onClick={handleAgregarColumna} type="button">AGREGAR COLUMNA</Button>
                    </Box>
                    
                    <Table size="small">
                        <TableHead>
                            <TableCell sx={{fontWeight: "bold"}}>ID Columna</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Nombre Columna</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Tipo</TableCell>
                            <TableCell sx={{fontWeight: "bold"}}>Opc.</TableCell>
                        </TableHead>
                        <TableBody>
                            {
                                valuesForm?.formato_entregas?.map( item => (
                                    !Boolean(item?.isEditing)
                                    ?   <TableRow key={item.id}>
                                            <TableCell>{item.key}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.type === 'integer' ? 'Número' : "Texto"}</TableCell>
                                            <TableCell>
                                                <IconButton  onClick={()=>onEditTable(item.id)} type="button" size="small" color="secondary" title="Editar">
                                                    <MdEdit />
                                                </IconButton>
                                                <IconButton  onClick={()=>onDeleteTable(item.id)} type="button" size="small" color="error" title="Eliminar">
                                                    <MdDelete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    :   <TableRow key={item.id}>
                                            <TableCell><TextField fullWidth size="small" label="ID" value={item._key} InputProps={{readOnly: true}}/></TableCell>
                                            <TableCell><TextField autoFocus fullWidth size="small"  name="_name" label="Nombre" value={item._name} onChange={(e)=>handleChangeTable(item.id,e)}/></TableCell>
                                            <TableCell>
                                                <TextField fullWidth size="small" name="_type" label="Tipo" value={item._type} select onChange={(e)=>handleChangeTable(item.id,e)}>
                                                    <MenuItem value="integer">Numérico</MenuItem>
                                                    <MenuItem value="string">Texto</MenuItem>
                                                </TextField>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton  onClick={()=>onCancelTable(item.id)} type="button" size="small" color="secondary" title="Cancelar">
                                                    <MdEditOff />
                                                </IconButton>
                                                <IconButton  onClick={()=>onSaveTable(item.id)} disabled={!Boolean(item._name)} type="button" size="small" color="success" title="Guardar">
                                                    <MdSave />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                ))
                            }
                            
                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={12} sm={5}>
                    <FormControlLabel 
                        control={<Checkbox
                            checked = {valuesForm?.es_sistema ?? false} 
                            onChange={(e)=>{
                                assignValueForm("es_sistema", e.target.checked);
                            }}/>} 
                        label="¿Acceder al sistema?" />
                </Grid>
            </Grid>
            { 
                valuesForm?.es_sistema && 
                <>
                    <Divider sx={{marginTop: 2, marginBottom: 2}}/>
                    <Typography variant="body2">Datos del sistema</Typography>
                    <Grid container spacing={2} >
                        <Grid item  xs={12} sm={4}>
                            <TextField
                                label=" Usuario"
                                size="small"
                                margin="dense"
                                type="text"
                                fullWidth
                                InputProps= {
                                    { readOnly : editandoRegistro && Boolean(seleccionado?.usuario)}
                                }
                                required
                                value = {valuesForm?.username ?? ""}
                                onChange={ (e)=>{
                                    assignValueForm("username", e.target.value);
                                }}
                                />
                        </Grid>
                        {
                            !(editandoRegistro && Boolean(seleccionado?.usuario)) &&
                                <Grid item  xs={12} sm={4}>
                                    <TextField
                                        label="Contraseña"
                                        size="small"
                                        margin="dense"
                                        type="password"
                                        fullWidth
                                        required
                                        value = {valuesForm?.password ?? ""}
                                        onChange={ (e)=>{
                                            assignValueForm("password", e.target.value);
                                        }}
                                        />
                                </Grid>
                        }
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Estado Acceso"
                                size="small"
                                margin="dense"
                                fullWidth
                                required
                                select
                                value = {valuesForm?.estado_acceso}
                                onChange={ (e)=>{
                                    assignValueForm("estado_acceso", e.target.value);
                                }}
                            >
                                <MenuItem value="A">ACTIVO</MenuItem>
                                <MenuItem value="I">INACTIVO</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </>
            }
        </ModalRegister>
    )
}