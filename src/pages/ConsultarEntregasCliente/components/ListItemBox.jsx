import { Box, Chip, Grid, ListItemButton, Typography } from "@mui/material";

export const ListItemBox = ({item})=>{
    return  <ListItemButton>
                <Box sx={{width: "100%"}}>
                    <Typography  variant="h7" fontWeight={'bold'}>
                       Zona: {item.zona.descripcion}
                    </Typography>
                    <Typography  variant="h6" fontWeight={'bold'}>
                       Local: {item.local.descripcion}
                    </Typography>
                    <Grid container spacing={1}  mb={1}>
                        <Grid item xs={12} sm={4} md={3}>
                            <Typography  variant="body2" >Fecha En Tránsito: {item.fecha_en_transito}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Typography  variant="body2" >Fecha de Reparto: {item.fecha_por_entregar ?? '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Typography  variant="body2" >Fecha Entregado: {item.fecha_entregado ?? '-'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        {
                            item?.valores?.map( valor => (
                                <Grid key={valor.key} item xs={4} sm={4} md={3}>
                                    <Typography  variant="body2" >{valor.label}: {valor.value}</Typography>
                                </Grid>
                            ))
                        }
                    </Grid>
                    {
                        Boolean(item.observaciones) &&
                            <Typography  variant="body2" >Observaciones: {item.observaciones}</Typography>
                    }
                    <Chip  sx={{marginTop: 1, width : { xs: '100%', sm: 'auto'}}} label={item.estado.nombre} color={item.estado.color}/>
                </Box>
            </ListItemButton>
};