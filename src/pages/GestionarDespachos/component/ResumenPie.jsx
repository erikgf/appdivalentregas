import { PieChart } from "@mui/x-charts";

export const ResumenPie = ( {data} ) => {
    return <PieChart
            series={[{ data : data.map( estado => {
                return {
                    id: estado.id,
                    label: estado.nombre,
                    value: estado.cantidad,
                    color: estado.hex_color
                }
            }), outerRadius: 80}]}
            height = {180}
            margin = {{ right: 5 }}
        />
};

/*
[
    { id : "T", label: 'EN TRÁNSITO', value: 33, color:"#1976d2"},
    { id : "P", label: 'POR ENTREGAR', value: 33,  color:"#ed6c02"},
    { id : "E", label: 'ENTREGADO', value: 33,  color:"green"},
]
*/