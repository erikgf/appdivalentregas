import { useState } from "react";



const isEntregaRegistrandoValido = (entregaRegistrando, formatoEntregas) => {
    if (!Boolean(formatoEntregas)){
        return false;
    }
    const formatoEntregasSoloKey = ["local", ...formatoEntregas.map( item => item.key)];
    const keys = Object.keys(entregaRegistrando).filter( entregaKey => formatoEntregasSoloKey.includes(entregaKey));
    const valores = keys.map( _key => entregaRegistrando[_key]);

    for(let i=0; i< valores.length; i++){
        if (!Boolean(valores[i])){
            return false;
        }
    }

    return true;
};

const setDefaultValues = (setEntregaRegistrando) => {
    setEntregaRegistrando( prev => {
        const keys = Object.keys(prev);
        keys.forEach( item => prev[item] = null);
        return {
            ...prev
        };
    })
};

export const useGestionarTablaEntregasDespacho = ({ entregaRegistrando, setEntregaRegistrando, formatoEntregas }) => {
    const [entregas, setEntregas] = useState([]);

    const onSetInitEntregas = (arregloEntregas) => {
        setEntregas(arregloEntregas.map ( entrega =>  {
            return {
                ...entrega,
                editando: false,
                backend: true,
                checked: false
            }
        }));
    };

    //id, repartidor: {}, zona: {}, local : {}, status READONLY
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
            setDefaultValues(setEntregaRegistrando);
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

        setDefaultValues(setEntregaRegistrando);
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

        setDefaultValues(setEntregaRegistrando);
    };

    const onLimpiarEntregas = () => {
        setEntregas([])
    };

    return {
       entregas,
       entregaRegistrando,
       entregaRegistrandoValido : isEntregaRegistrandoValido(entregaRegistrando, formatoEntregas),
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