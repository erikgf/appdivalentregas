import { useState } from "react";

const defaultEntregaValues = {
    zona : null,
    local: null,
    numero_cajas: "",
    numero_gavetas: "",
    numero_guias: ""
};


const isEntregaRegistrandoValido = (entregaRegistrando) => {
    return entregaRegistrando?.zona &&
            entregaRegistrando?.local &&
                entregaRegistrando?.numero_cajas.toString() != "" &&
                    entregaRegistrando?.numero_guias.toString() != "" &&
                        entregaRegistrando?.numero_gavetas.toString() != "";

};

export const useGestionarTablaEntregasDespacho = () => {
    const [entregas, setEntregas] = useState([]);
    const [entregaRegistrando, setEntregaRegistrando] = useState(defaultEntregaValues);

    const onSetInitEntregas = (arregloEntregas) => {
        setEntregas(arregloEntregas.map ( e =>  {
            return {
                ...e,
                editando: false,
                backend: true,
                checked: false
            }
        }));
    };

    //id, repartidor: {}, zona: {}, local : {}, cajas: #, guias: #, status READONLY
    const onAgregarEntrega = () => {
        if (Boolean(entregaRegistrando?.id)){
            setEntregas( entregas => {
                return entregas.map( entrega => {
                    if (entrega.id === entregaRegistrando.id){
                        return {
                            editando: false,
                            ...entrega,
                            ...entregaRegistrando
                        }
                    }
                    return entrega;
                })
            });
            setEntregaRegistrando(defaultEntregaValues);
            return;
        }

        const newId = new Date().getTime();
        setEntregas(
            [...entregas, 
                {
                    id: newId,
                    backend: false,
                    checked: false,
                    editando: false,
                    ...entregaRegistrando
                }]
        );

        setEntregaRegistrando(defaultEntregaValues);
    };


    const onAgregarEntregas = (arregloEntregas) => {
        setEntregas([
            ...entregas,
            ...arregloEntregas
        ])
    };

    const onToggleEntregas = (checked) =>{
        setEntregas(
            entregas.map(e => {
                return {
                    ...e, checked
                }
            })
        );
    };

    const onCheckEntrega = ({id, checked}) =>{
        setEntregas(
            entregas.map(e => {
                if (e.id === id){
                    return {
                        ...e, checked
                    }
                }

                return e;
            })
        );
    };

    const onQuitarEntrega = (id) => {
        setEntregas( (entregas) => {
            return entregas.filter( entrega =>  entrega.id != id)
        })
    };

    const onQuitarEntregas = () => {
        setEntregas( (entregas) => {
            return entregas.filter( entrega =>  !entrega.checked)
        })
    };

    const onActivarEditarEntrega = (id) => {
        setEntregas( entregas => {
            return entregas.map( entrega => {
                return {
                    ...entrega,
                    editando: entrega.id === id,
                }
            })
        });
        setEntregaRegistrando(entregas.find( entrega => entrega.id === id));
    };

    const onCancelarEditarEntregar = ()=>{
        setEntregas( entregas => {
            return entregas.map( entrega => {
                return {...entrega, editando: false};
            })
        });
        setEntregaRegistrando(defaultEntregaValues);
    };

    const onLimpiarEntregas = () => {
        setEntregas([])
    };

    return {
       entregas,
       entregaRegistrando,
       entregaRegistrandoValido : isEntregaRegistrandoValido(entregaRegistrando),
       setEntregaRegistrando,
       onAgregarEntrega,
       onQuitarEntrega,
       onToggleEntregas,
       onCheckEntrega,
       onAgregarEntregas,
       onQuitarEntregas,
       onActivarEditarEntrega,
       onCancelarEditarEntregar,
       onLimpiarEntregas,
       onSetInitEntregas
    };

};