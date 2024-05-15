import { createSlice } from "@reduxjs/toolkit";
import { loadStorage, saveStorage} from "../../assets/localStorager";
import { axiosPrivate } from "../../api/axios";

const sessionLoadStorage = loadStorage();

const defaultInitialState = {
    user : Boolean(sessionLoadStorage) ? sessionLoadStorage.user : null,
    token : Boolean(sessionLoadStorage) ? sessionLoadStorage.token : null,
    cargandoLogin: false,
    messageLogin : null
};

export const authSlice = createSlice({
   name : 'auth',
   initialState : defaultInitialState,
   reducers : {
        startLogin : (state) =>{
            state.cargandoLogin = true;
        },
        okLogin : (state, {payload})=>{
            state.cargandoLogin = false;
            state.messageLogin = null;
            state.user = payload.user;
            state.token = payload.token;
            saveStorage(payload);
        },
        errorLogin : (state, {payload})=>{
            state.messageLogin = payload;
        },
        startLogOut: (state) =>{
            state.user = null;
            state.token = null;

            saveStorage(null);
        },
        clearErrorLogin : ( state )=>{
            state.messageLogin = null;
        },
        finallyLogin: (state) => {
            state.cargandoLogin = false;
        }
   }
});

export const {
    startLogin,
    okLogin,
    errorLogin,
    clearErrorLogin,
    startLogOut,
    finallyLogin
} = authSlice.actions;