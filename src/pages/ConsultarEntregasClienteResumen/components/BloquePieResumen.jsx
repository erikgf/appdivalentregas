import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useProcesadorDatosEntregas } from "../hooks/useProcesadorDatosEntregas";
import { CircularLoader } from "../../../components";

const pieParams = { height: 200, margin: { right: 5 } };

export const BloquePieResumen = ({data : registros, cargando : cargandoRegistros, ir}) => {
    const { onProcesarDatosAPie } = useProcesadorDatosEntregas();
    const datosPie = onProcesarDatosAPie(registros);

    return  <>
            {
                Boolean(cargandoRegistros) &&
                    <CircularLoader />
            }
            {
                datosPie &&
                    <Box mt={2}>
                        <Typography variant="h6">Resultados: </Typography>
                        {
                            datosPie?.map(pie => {
                                return  <Box key={pie.id}>
                                            <Typography variant={pie.rotulo_variante}>{pie.rotulo_principal}</Typography>
                                            <Typography variant="body2">Totales: {pie.totales}</Typography>
                                            <PieChart
                                                series={[{ data: pie.valores, outerRadius: pie.outer_radius}]}
                                                onItemClick={(event, d) => ir({dataIndex: d.dataIndex, id_local: pie.id_local, id_zona: pie.id_zona})}
                                                {...pieParams}
                                            />
                                        </Box>
                            })
                        }
                    </Box>
            }
            
    </>
};