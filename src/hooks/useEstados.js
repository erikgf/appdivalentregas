const ESTADOS = [
    {id: "T", descripcion: "EN TRANSITO", color: "primary"},
    {id: "P", descripcion:" POR ENTREGAR", color: "warning"},
    {id: "E", descripcion:" ENTREGADO", color: "success"},
];

export const useEstados = () => {

    const getNombreEstado = (idEstado) => {
        return ESTADOS.find(e => e.id === idEstado);       
    }

    return {
        getNombreEstado   
    }
};