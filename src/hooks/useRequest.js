import { useState } from "react";

export const useRequest = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(null);

    return {
        data, setData,
        error, setError,
        cargando, setCargando
    }
};