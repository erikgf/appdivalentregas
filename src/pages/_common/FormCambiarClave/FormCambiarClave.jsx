import { useState } from "react";
import { ModalRegister } from "../../../components";


const titleModal = "Cambiar Clave Usuario";

const isCombinacionClavesValida = ( claveNueva, repetirClaveNueva ) => {
    return claveNueva === repetirClaveNueva && claveNueva != "";
};

export const FormCambiarClave = ({openModal = false, onCloseModal, onGuardar = ()=>{}}) => {
    const [claveNueva, setClaveNueva] = useState("");
    const [repetirClaveNueva, setRepetirClaveNueva] = useState("");
    const combinacionClaveValida =  isCombinacionClavesValida(claveNueva, repetirClaveNueva);

    return <ModalRegister
                modalTitle = {titleModal}
                okButtonText = 'Guardar'
                open = { openModal }
                handleModalClose = {()=>{
                    onCloseModal();
                }}
                onSubmit = { (e)=>{
                    e.preventDefault();
                    onGuardar(claveNueva.trim());
                }}
                submitEnabled = { combinacionClaveValida }
                submitLoading={cargandoGuardar}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Clave Nueva"
                            size="small"
                            margin="dense"
                            type="password"
                            autoFocus
                            fullWidth
                            autoComplete="off"
                            required
                            value = {claveNueva}
                            onChange = { (e)=>setClaveNueva(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            label="Repetir Clave"
                            size="small"
                            margin="dense"
                            type="passowrd"
                            autoComplete="off"
                            fullWidth
                            required
                            value = {repetirClaveNueva}
                            onChange = { (e)=>setRepetirClaveNueva(e.target.value)}
                            />
                    </Grid>
                </Grid>
            </ModalRegister>
}