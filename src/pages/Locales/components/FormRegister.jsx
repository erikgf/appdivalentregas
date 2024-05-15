import { useEffect, useMemo } from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import { ModalRegister } from "../../../components";
import { useForm } from "../../../hooks/useForm";
import { useLocal } from "../hooks/useLocal";
import { defaultValuesForm } from "../data/defaultValuesForm";
import { useZonaBean } from "../../../hooks/useZonaBean";

export const FormRegister = () => {
    const { openModal, seleccionado, cargandoGuardar, onGuardarRegistro, onCloseModal} = useLocal();
    const { data : dataZonas, cargando: cargandoZonas} = useZonaBean();
    const { valuesForm, assignValueForm, resetValueForm } = useForm({defaultValuesForm});

    useEffect(()=>{
        if (Boolean(seleccionado)){
            const { descripcion, direccion, id_zona } = seleccionado;
            resetValueForm({
                descripcion: descripcion,
                direccion: direccion,
                id_zona : id_zona
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
        return `${ !Boolean( seleccionado ) ? 'Nueva' : 'Editando'} Local`;
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
            <Grid container spacing={2} >
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
                    {
                        !cargandoZonas &&
                            <TextField
                                label="Zona"
                                select
                                size="small"
                                margin="dense"
                                fullWidth
                                required
                                value = {valuesForm?.id_zona ?? ""}
                                onChange={ (e)=>{
                                    assignValueForm("id_zona", e.target.value);
                                }}
                            >
                                <MenuItem value={""}><em>Seleccionar...</em></MenuItem>
                                {
                                    dataZonas?.map( item => {
                                        return <MenuItem key={item?.id} value={item?.id}>{item?.descripcion}</MenuItem>
                                    })
                                }
                            </TextField>
                    }
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item  xs={12}>
                    <TextField
                            label="Dirección"
                            size="small"
                            margin="dense"
                            type="text"
                            autoFocus
                            fullWidth
                            required
                            value = {valuesForm?.direccion}
                            onChange={ (e)=>{
                                assignValueForm("direccion", e.target.value);
                            }}/>
                </Grid>
            </Grid>
        </ModalRegister>
    )
}