
export const useProcesadorDatosEntregas = () => {

    const onProcesarDatosAPie = (registros) => {
        if (!Boolean(registros)  || registros?.length <= 0){
            return null;
        }

        const arreglosDataPie = [];

        let totales = registros.length;
        let cantidad_T = registros.filter(e => e.id_estado === "T").length;
        let cantidad_P = registros.filter(e => e.id_estado === "P").length;
        let cantidad_E = registros.filter(e => e.id_estado === "E").length;

        arreglosDataPie.push({
            id: "**",
            rotulo_principal: 'ENTREGAS TOTALES',
            rotulo_variante: "h5",
            outer_radius: 100,
            totales,
            id_local : "*",
            id_zona : "*",
            valores: [
                { id : "T", label: 'EN TRÁNSITO', value: cantidad_T, color:"#1976d2"},
                { id : "P", label: 'POR ENTREGAR', value: cantidad_P,  color:"#ed6c02"},
                { id : "E", label: 'ENTREGADO', value: cantidad_E,  color:"green"},
            ]
        });
        
        const zonasDistintas = registros.filter((value, index, self) => {
            return self.findIndex(e => e.id_zona === value.id_zona) === index;
        }).map(e => {
            return e.zona;
        });

        zonasDistintas.forEach(zona => {
            const arregloZona = registros.filter(e => e.id_zona === zona.id);
            let totales = arregloZona.length;
            let cantidad_T = arregloZona.filter(e => e.id_estado === "T").length;
            let cantidad_P = arregloZona.filter(e => e.id_estado === "P").length;
            let cantidad_E = arregloZona.filter(e => e.id_estado === "E").length;

            arreglosDataPie.push({
                id: zona.id,
                rotulo_principal: `ZONA: ${zona.descripcion}`,
                rotulo_variante: "h6",
                outer_radius: 80,
                totales,
                id_local : "*",
                id_zona : zona.id,
                valores: [
                    { id : "T", label: 'EN TRÁNSITO', value: cantidad_T, color:"#1976d2"},
                    { id : "P", label: 'POR ENTREGAR', value: cantidad_P,  color:"#ed6c02"},
                    { id : "E", label: 'ENTREGADO', value: cantidad_E,  color:"green"},
                ]
            });

            const localesDistintos = arregloZona.filter((value, index, self) => {
                return self.findIndex(e => e.id_local === value.id_local) === index;
            }).map(e => {
                return e.local;
            });
    
            localesDistintos.forEach(local => {
                const arregloLocal = registros.filter(e => e.id_local === local.id);
                let totales = arregloLocal.length;
                let cantidad_T = arregloLocal.filter(e => e.id_estado === "T").length;
                let cantidad_P = arregloLocal.filter(e => e.id_estado === "P").length;
                let cantidad_E = arregloLocal.filter(e => e.id_estado === "E").length;
    
                arreglosDataPie.push({
                    id: `${zona.id}_${local.id}`,
                    rotulo_principal: `LOCAL: ${local.descripcion}`,
                    rotulo_variante: "h8",
                    outer_radius: 50,
                    id_local : local.id,
                    id_zona : zona.id,
                    totales,
                    valores: [
                        { id : "T", label: 'EN TRÁNSITO', value: cantidad_T, color:"#1976d2"},
                        { id : "P", label: 'POR ENTREGAR', value: cantidad_P,  color:"#ed6c02"},
                        { id : "E", label: 'ENTREGADO', value: cantidad_E,  color:"green"},
                    ]
                });
            });
        });

        return arreglosDataPie;
    };

    return {
        onProcesarDatosAPie
    };
};