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