import { useEffect, useMemo } from "react";
import { Grid, TextField } from "@mui/material";
import { ModalRegister } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { useZona } from "../hooks/useZona";
import { defaultValuesForm } from "../data/defaultValuesForm";

export const FormRegister = () => {
    const { openModal, seleccionado, cargandoGuardar, onGuardarRegistro, onCloseModal} = useZona();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});

    useEffect(()=>{
        if (Boolean(seleccionado)){
            const { descripcion, lead_time } = seleccionado;
            resetValueForm({
                descripcion,
                lead_time 
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
        return `${ !Boolean( seleccionado ) ? 'Nueva' : 'Editando'} Zona`;
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
                <Grid item  xs={12} sm={6}>
                    <TextField
                        label="Descripción"
                        size="small"
                        margin="dense"
                        type="text"
                        autoFocus
                        fullWidth
                        required
                        value = {valuesForm?.descripcion}
                        onChange={ (e)=>{
                            assignValueForm("descripcion", e.target.value);
                        }}
                        />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Lead Time"
                        type="number"
                        size="small"
                        margin="dense"
                        fullWidth
                        required
                        value = {valuesForm?.lead_time}
                        onChange={ (e)=>{
                            assignValueForm("lead_time", e.target.value);
                        }}
                    />
                </Grid>
            </Grid>
        </ModalRegister>
    )
}