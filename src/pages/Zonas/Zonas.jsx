import { useEffect } from "react";
import { Alert, Grid } from "@mui/material";
import { TableManager } from "../../components";
import { MdAddCircle as AddCircleIcon, MdEdit as EditIcon, MdDelete as DeleteIcon, MdRefresh as RefreshIcon} from "react-icons/md";
import useConfirm from "../../hooks/useConfirm";
import useNotification from "../../hooks/useNotification";
import { headCells } from "./data/headCells";
import { FormRegister } from "./components/FormRegister";
import { styles } from "../../assets/styles";
import { useZona } from "./hooks/useZona";

const tableTitle = "Gestionar Zonas";

export const Zonas = ()=>{
    const { registros, cargandoRegistros, cargandoEliminar, cargandoSeleccionado, 
            onListar, onEliminarRegistro, onNuevoRegistro, onLeerRegistro} = useZona();
    const { confirm } = useConfirm();

    const handleNuevoRegistro = () =>{
        onNuevoRegistro();
    };

    const handleEditarRegistro = (a)=>{
        onLeerRegistro({id: a.id});
    };

    const handleRefreshRegistros = () => {
        onListar();
    };

    const handleEliminarRegistro = async ({id}) =>{
        const isConfirmed = await confirm({
                        title: 'Eliminar Registro', 
                        description: '¿Desea eliminar el registro seleccionado? Esta acción es irreversible.'
                    });
        if (isConfirmed){
            onEliminarRegistro({id});
            return;
        }
    };

    useEffect(()=>{
        handleRefreshRegistros();
    }, []);

    return <>
            <Grid container spacing={2}>
                <Grid item xs = {12} md={5}>
                    <TableManager
                        tableTitle={tableTitle}
                        rows =  {registros} 
                        loadingData = { cargandoRegistros }
                        headCells = { headCells }
                        isSearchAllowed = {true}
                        isSelectableRows = { false }
                        registersPerPage= {30}
                        strechTable = { true }
                        onActions = {[
                            {
                                inRows: false, inToolbar: true, noSelection: true, onOnlySelection: false,
                                whenLoading: false,
                                onClick : handleRefreshRegistros,
                                title : 'Actualizar',
                                icon : <RefreshIcon  style={{color: styles.colorButtons.green}}/>
                            },
                            {
                                inRows: false, inToolbar: true, noSelection: true, onOnlySelection: false,
                                whenLoading: false,
                                onClick : handleNuevoRegistro,
                                title : 'Nuevo',
                                icon : <AddCircleIcon  style={{color: styles.colorButtons.blue}}/>
                            },
                            {
                                inRows: true, inToolbar: false, onOnlySelection: false,
                                whenLoading: cargandoSeleccionado,
                                onClick : handleEditarRegistro,
                                title : 'Editar',
                                icon : <EditIcon/>
                            },
                            {
                                inRows: true, inToolbar: false, onOnlySelection: false,
                                whenLoading: cargandoEliminar,
                                onClick : handleEliminarRegistro,
                                title : 'Eliminar',
                                icon : <DeleteIcon style={{color: styles.colorButtons.red}}/>
                            }
                        ]
                    }
                        />
                </Grid>
            </Grid>
            <FormRegister />
        </>
}