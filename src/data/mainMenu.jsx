import {
    MdMap as MapIcon,
    MdStore as StoreIcon,
    MdManageAccounts as ManageAccountsIcon,
    MdBusAlert as CarIcon,
    MdOutbox as OutboxIcon,
    MdOutlineFileCopy as OutlineFileCopyIcon,
    MdAccountCircle as AccountCircleIcon
} from 'react-icons/md';

const mainMenu = [
    {
        name: "Mantenimientos",
        children: [
            {
                name: "Zonas",
                url: "/zonas",
                icon: MapIcon
            },
            {
                name: "Locales",
                url: "/locales",
                icon: StoreIcon
            },
            {
                name: "Clientes",
                url: "/clientes",
                icon: ManageAccountsIcon
            },
            {
                name: "Repartidores",
                url: "/repartidores",
                icon: CarIcon
            },
            {
                name: "Colaboradores",
                url: "/colaboradores",
                icon: AccountCircleIcon
            }
        ]
    },
    {
        name: "Gestión",
        children: [
            {
                name: "Gestionar Despachos",
                url: "/gestionar-despachos",
                icon: OutboxIcon
            },
            /*
            {
                name: "Consultar Despachos",
                url: "/consultar-entregas",
                icon: OutboxIcon
            },
            */
        ]
    },
    {
        name: "Reportes",
        children: [
            {
                name: "Reporte de Entregas",
                url: "/reporte-entregas",
                icon: OutlineFileCopyIcon
            }, 
        ]
    }
];

const clienteMenu = [
    {
        name: "Gestión",
        children: [
            {
                name: "Mis Entregas",
                url: "/consultar-entregas-cliente",
                icon: OutboxIcon
            },
            {
                name: "Mis Entregas Resumen",
                url: "/consultar-entregas-cliente-resumen",
                icon: OutboxIcon
            },
        ]
    },
];

const repartidorMenu = [
    {
        name: "Gestión",
        children: [
            {
                name: "Mis Despachos",
                url: "/consultar-entregas-repartidor",
                icon: OutboxIcon
            },
        ]
    },
];
/*
export const navigationNames = [];

mainMenu.forEach(e => {
    e.children.forEach( m => {
        navigationNames.push({
            key : m.url.substring(1),
            name: m.name
        });
    });
});
*/

export const getMenuMain = (idRol = 0) => {
    if ( idRol == 1){
        return mainMenu;
    }

    if ( idRol == 2){
        return clienteMenu;
    }

    if ( idRol == 3){
        return repartidorMenu;
    }

    return [];
};

export const navigationNames = (idRol = 0) => {
    const navNames = [];
    let typeMenu = getMenuMain(idRol);

    typeMenu.forEach(e => {
        e.children.forEach( m => {
            navNames.push({
                key : m.url.substring(1),
                name: m.name
            });
        });
    });

    return navNames;
};

/*
export const navigationNames = [
    { key: "rutas", name: "Rutas"},
    { key: "tiendas", name: "Tiendas"},
    { key: "tipo-bultos", name: "Tipo Bultos"},
    { key: "colaboradores", name: "Colaboradores"},
    { key: "usuarios", name: "Usuarios"},
    { key: "", name: "Registrar Recojos"},
    { key: "registrar-entregas", name: "Registrar Entregas"},
    { key: "registrar-recojos-masivos", name: "Reg. Recojos Masivos"},
    { key: "registrar-entregas-masivos", name: "Reg. Entregas Masivas"},
    { key: "reporte-entregas", name: "Reporte de Entregas"},
    { key: "atrasados", name: "Entregas Atrasadas"},
    { key: "generar-manifiesto-salida", name: "Generar Manifiesto Salida"},
]*/