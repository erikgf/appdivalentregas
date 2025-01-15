import { useEffect, useMemo } from "react";
import { Checkbox, Divider, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { ModalRegister } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { useRepartidor } from "../hooks/useRepartidor";
import { defaultValuesForm } from "../data/defaultValuesForm";
import { useZonaBean } from "../../../hooks/useZonaBean";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";

export const FormRegister = () => {
    const { openModal, seleccionado, cargandoGuardar, onGuardarRegistro, onCloseModal} = useRepartidor();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});
    const { data : dataZonas, cargando: cargandoZonas} = useZonaBean();
    const editandoRegistro = Boolean(seleccionado);

    useEffect(()=>{
        if (editandoRegistro){
            const { nombres_apellidos, numero_documento, celular, zonas, username, es_sistema, estado_acceso } = seleccionado;
            resetValueForm({
                nombres_apellidos, numero_documento, celular, zonas,
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
        return `${ !editandoRegistro ? 'Nuevo' : 'Editando'} Repartidor`;
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
                    console.log({valuesForm});
                    e.preventDefault();
                    onGuardarRegistro(valuesForm);
                }}
                submitLoading={cargandoGuardar}
            >
            <Grid container spacing={2}>
                <Grid item  xs={12} sm={4}>
                    <TextField
                        label="Núm. Documento"
                        size="small"
                        margin="dense"
                        type="text"
                        inputProps={{maxLength: 15}}
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
                        value = {valuesForm?.nombres_apellidos}
                        onChange={ (e)=>{
                            assignValueForm("nombres_apellidos", e.target.value);
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
                    {
                        !cargandoZonas &&
                            <MultiSelect items = {dataZonas} 
                                    itemLabel="descripcion" 
                                    label="Zonas" 
                                    value = {valuesForm?.zonas ?? []} 
                                    onChange={(selected)=>{
                                        assignValueForm("zonas", selected);
                                    }}
                                    />
                    }
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