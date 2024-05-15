import { useEffect, useMemo } from "react";
import { Grid, TextField } from "@mui/material";
import { ModalRegister } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { useCliente } from "../hooks/useCliente";
import { defaultValuesForm } from "../data/defaultValuesForm";

export const FormRegister = () => {
    const { openModal, seleccionado, cargandoGuardar, onGuardarRegistro, onCloseModal} = useCliente();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});

    useEffect(()=>{
        if (Boolean(seleccionado)){
            const { numero_documento, razon_social, celular, direccion } = seleccionado;
            resetValueForm({
                numero_documento,
                razon_social,
                celular,
                direccion
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
        return `${ !Boolean( seleccionado ) ? 'Nuevo' : 'Editando'} Cliente`;
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
            </Grid>
        </ModalRegister>
    )
}