import { Typography } from "@mui/material";
import { TableManager } from "../../../components";
import { MdDelete as DeleteIcon, MdRemoveRedEye as EyeIcon, MdAddCircle as AddCircleIcon } from "react-icons/md";
import useConfirm from "../../../hooks/useConfirm";
import { headCells } from "../data/dataCells";
import { CabeceraBuscar } from "./CabeceraBuscar";
import { useVerDespacho } from "../hooks/useVerDespacho";
import { useGestionarDespachos } from "../hooks/useGestionarDespachos";
import { styles } from "../../../assets/styles";

const tableTitle = "Lista de Despachos/Día";

export const ListaDespachos = ()=>{
    const { cargandoRegistros, registros, cargandoEliminando, 
                onListarDespachos, onIniciarNuevoRegistro, onEliminarRegistro } = useGestionarDespachos();
    const { cargandoRegistro, onLeerDespacho } = useVerDespacho();
    const { confirm } = useConfirm();

    const handleEliminarRegistro = async (item)=>{
        const isConfirmed = await confirm({
            title: `Eliminar Registro.`, 
            description: '¿Desea eliminar el registro seleccionado? Esta acción es irreversible.'
        });

        if (isConfirmed){
            onEliminarRegistro({id: item.id});
            return;
        }
    };

    const handleLeerRegistro = (item) => {
        onLeerDespacho({idDespacho: item.id});
    };

    const handleNuevoRegistro = ()=>{
        onIniciarNuevoRegistro();
    };

    return <TableManager
                tableTitle={tableTitle}
                rows =  {registros} 
                loadingData = { cargandoRegistros }
                headCells = { headCells }
                isSearchAllowed = {true}
                isSelectableRows = { false }
                registersPerPage= {30}
                strechTable = { true }
                onActions={[
                    {
                        inRows: true,
                        title: "ver Registro",
                        onClick: handleLeerRegistro,
                        onLoading: cargandoRegistro,
                        icon: <EyeIcon color="#00689f" />
                    },
                    {
                        inRows: true,
                        whenLoading: cargandoEliminando,
                        title: "Eliminar",
                        onClick: handleEliminarRegistro,
                        icon: <DeleteIcon color="red"/>
                    },
                    {
                        inRows: false, inToolbar: true, noSelection: true, onOnlySelection: false,
                        whenLoading: false,
                        onClick : handleNuevoRegistro,
                        title : 'Nuevo Registro',
                        icon : <AddCircleIcon  style={{color: styles.colorButtons.blue, fontSize:42}}/>
                    },
                ]}
                >
                <Typography ml={2} mb={1} variant="body2" >Mostrando <b>{registros?.length}</b> registros:</Typography>
                <CabeceraBuscar onListar = {onListarDespachos} />
            </TableManager>
}