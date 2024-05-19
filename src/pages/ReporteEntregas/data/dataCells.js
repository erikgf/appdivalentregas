export const headCells = [
    {
      id: 'fechaRegistro',
      align: 'left',
      disablePadding: true,
      label: 'FECHA REGISTRO',
    },
    {
      id: 'fechaRecojo',
      align: 'left',
      disablePadding: true,
      label: 'FECHA RECOJO',
    },
    {
      id: 'secuencia',
      align: 'left',
      disablePadding: false,
      label: 'SECUENCIA',
    },
    {
      id: 'gavetasCantidad',
      align: 'center',
      disablePadding: false,
      label: "GAVETAS"
    },
    {
      id: 'cajasCantidad',
      align: 'center',
      disablePadding: false,
      label: "CAJAS"
    },
    {
      id: 'paquetesCantidad',
      align: 'center',
      disablePadding: false,
      label: "PAQUETES"
    },
    {
      id: 'guiasCantidad',
      align: 'center',
      disablePadding: false,
      label: "GUÍAS"
    },
    {
        id: 'destino',
        align: 'left',
        disablePadding: false,
        label: 'DESTINO',
    },
    {
      id: 'fechaProgramadaEntrega',
      align: 'left',
      disablePadding: false,
      label: 'F. PROG. ENTREGA',
    },
    {
      id: 'fechaEntrega',
      align: 'left',
      disablePadding: true,
      label: 'FECHA ENTREGA',
    },
    {
      id: 'status',
      align: 'center',
      disablePadding: true,
      label: 'STATUS',
      style : ( item ) => {
        return {
          backgroundColor: item?.statusColor,
          color: 'white'
        };
      } 
    },
    {
      id: 'statusOnTime',
      align: 'center',
      disablePadding: false,
      label: "ON TIME",
      style : ( item ) => {
        return {
          backgroundColor: item?.statusOnTimeBackgroundColor,
          color: item?.statusOnTimeColor,
          fontWeight: 'bold'
        };
      } 
    },
  ];