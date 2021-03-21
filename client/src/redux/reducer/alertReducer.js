import { REMOVE_ALERT, SET_ALERT } from '../ActionTypes';

const initialState={
    message:null,
    messageType:null
}


const alertReducer=(state=initialState,action)=>{

    const {type,payload} = action;
    switch(type){
        case SET_ALERT:
            return{
                ...state,message:payload.message,messageType:payload.messageType
            }
        case REMOVE_ALERT:
            return {
                ...state,message:null,messageType:null
            }
        default:
            return state
    }
}

export default alertReducer;