import { Box, Chip, Divider, Grid, IconButton, List, ListItem, Paper, Typography } from "@mui/material";
//import { useRecojo } from "../hooks/useRecojo";
import { BlockVacio, CircularLoader, TableManager } from "../../../components";
import { MdDelete as DeleteIcon, MdRemoveRedEye as EyeIcon } from "react-icons/md";
import useConfirm from "../../../hooks/useConfirm";
import { headCells } from "../data/dataCells";
import { CabeceraBuscar } from "./CabeceraBuscar";
import { useState } from "react";

const tableTitle = "Consulta de Despachos";

const registros = [
    { id: 1, fechaRegistro: '2024-04-06', fechaEntrega: '-', diasTope: 5, cliente: 'CLIENTE REGISTRADO 1', local: "ZONA 1 - LOCAL 11", repartidor: "REPARTIDOR NUMERO NUMERO 1", num_guias: 15, cajas: 10, observaciones: '-', status: 'EN REPARTO'},
    { id: 2, fechaRegistro: '2024-04-06', fechaEntrega: '-', diasTope: 5, cliente: 'CLIENTE REGISTRADO 1', local: "ZONA 1 - LOCAL 11", repartidor: "REPARTIDOR NUMERO NUMERO 1", num_guias: 10, cajas: 8, observaciones: '-', status: 'EN REPARTO'},
    { id: 3, fechaRegistro: '2024-04-06', fechaEntrega: '-', diasTope: 5, cliente: 'CLIENTE REGISTRADO 1', local: "ZONA 1 - LOCAL 11", repartidor: "REPARTIDOR NUMERO NUMERO 1", num_guias: 22, cajas: 17, observaciones: '-', status: 'EN REPARTO'},
    { id: 4, fechaRegistro: '2024-04-06', fechaEntrega: '-', diasTope: 6, cliente: 'CLIENTE REGISTRADO 1', local: "ZONA 1 - LOCAL 21", repartidor: "REPARTIDOR NUMERO NUMERO 1", num_guias: 13, cajas: 13, observaciones: '-', status: 'EN REPARTO'},
    { id: 5, fechaRegistro: '2024-04-06', fechaEntrega: '-', diasTope: 6, cliente: 'CLIENTE REGISTRADO 1', local: "ZONA 1 - LOCAL 21", repartidor: "REPARTIDOR NUMERO NUMERO 1", num_guias: 10, cajas: 10, observaciones: '-', status: 'EN REPARTO'},
    { id: 6, fechaRegistro: '2024-04-06', fechaEntrega: '-', diasTope: 8, cliente: 'CLIENTE REGISTRADO 1', local: "ZONA 1 - LOCAL 21", repartidor: "REPARTIDOR NUMERO NUMERO 1", num_guias: 10, cajas: 12, observaciones: '-', status: 'EN REPARTO'},
    { id: 7, fechaRegistro: '2024-04-06', fechaEntrega: '-', diasTope: 8, cliente: 'CLIENTE REGISTRADO 2', local: "ZONA 1 - LOCAL 31", repartidor: "REPARTIDOR NUMERO NUMERO 2", num_guias: 13, cajas: 11, observaciones: '-', status: 'EN REPARTO'},
    { id: 8, fechaRegistro: '2024-04-06', fechaEntrega: '-', diasTope: 8, cliente: 'CLIENTE REGISTRADO 2', local: "ZONA 2 - LOCAL 21", repartidor: "REPARTIDOR NUMERO NUMERO 2", num_guias: 10, cajas: 10, observaciones: '-', status: 'EN REPARTO'},
    { id: 9, fechaRegistro: '2024-04-06', fechaEntrega: '-', diasTope: 8, cliente: 'CLIENTE REGISTRADO 2',  local: "ZONA 2 - LOCAL 21",repartidor: "REPARTIDOR NUMERO NUMERO 2", num_guias: 15, cajas: 9, observaciones: '-', status: 'EN REPARTO'},
    { id: 100, fechaRegistro: '2024-04-06', fechaEntrega: '-', diasTope: 8, cliente: 'CLIENTE REGISTRADO 2', local: "ZONA 2 - LOCAL 21", repartidor: "REPARTIDOR NUMERO NUMERO 2", num_guias: 14, cajas: 8, observaciones: '-', status: 'EN REPARTO'},
];
const cargandoRegistros = false;

export const ListaEntregas = ()=>{
    //const { registros, cargandoRegistros, onEliminarRegistro } = useRecojo();
    const { confirm } = useConfirm();

    const handleEliminarRegistro = async (item)=>{
        const isConfirmed = await confirm({
            title: `Eliminar Registro. Guía: ${item.serieGuia}-${item.numeroGuia}`, 
            description: '¿Desea eliminar el registro seleccionado? Esta acción es irreversible.'
        });

        if (isConfirmed){
            //onEliminarRegistro(item);
            return;
        }
    };

    return <>
        {
            Boolean(cargandoRegistros) &&
                <CircularLoader />
        }
        {
            registros.length <= 0
            ?   (!Boolean(cargandoRegistros) && <BlockVacio />)
            :   <TableManager
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
                            title: "Eliminar",
                            onClick: (item) => {handleEliminarRegistro(item)},
                            icon: <DeleteIcon />
                        }
                    ]}
                    >
                    <Typography ml={2} mb={1} variant="body2" >Mostrando <b>{registros?.length}</b> registros:</Typography>
                    <CabeceraBuscar />
                </TableManager>
    }
    </>
}