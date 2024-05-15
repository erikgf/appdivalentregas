import { useEffect } from "react";
import { styles } from "../../assets/styles";
import { Grid } from "@mui/material";
import { TableManager } from "../../components";
import { MdAddCircle as AddCircleIcon, MdEdit as EditIcon, MdDelete as DeleteIcon, MdRefresh as RefreshIcon} from "react-icons/md";
import useConfirm from "../../hooks/useConfirm";
import { headCells } from "./data/headCells";
import { FormRegister } from "./components/FormRegister";
import { useCliente } from "./hooks/useCliente";

const tableTitle = "Gestionar Clientes";

export const Clientes = ()=>{
    const { registros, cargandoRegistros, cargandoEliminar, cargandoSeleccionado, 
                onListar, onEliminarRegistro, onNuevoRegistro, onLeerRegistro} = useCliente();
    const { confirm } = useConfirm();

    const handleNuevoRegistro = () =>{
        onNuevoRegistro();
    };

    const handleEditarRegistro = (a)=>{
        onLeerRegistro({id: a.id});
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
        onListar();
    }, []);

    return <>
            <Grid container spacing={2}>
                <Grid item xs = {12} md={8}>
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
                                onClick : () => {onListar()},
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
                        ]}
                        />
                </Grid>
            </Grid>
            <FormRegister />
        </>
}