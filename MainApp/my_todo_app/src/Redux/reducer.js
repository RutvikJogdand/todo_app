/* eslint-disable no-unused-vars */
import { GET_TODOS_REQUEST, GET_TODOS_SUCCESS, GET_TODOS_FAILURE,
    TODO_COMPLETE_REQUEST, TODO_COMPLETE_SUCCESS, TODO_COMPLETE_FAILURE } from "./actionTypes";

export const initTodoState = {

    todos_arr: [],
    single_task: {}
}

const todoReducer = (state = initTodoState, action) =>{

    switch(action.type)
    {
        case GET_TODOS_REQUEST:
            return{
                ...state,
                todos_arr: []
            }

        case GET_TODOS_SUCCESS:
            return{
                ...state,
                todos_arr: action.payload
            }  
            
        case GET_TODOS_FAILURE:
            return{
                ...state,
                todos_arr: []
            }    

        case TODO_COMPLETE_REQUEST:
            return{
                ...state,
                single_task: []
            }    

        case TODO_COMPLETE_SUCCESS:
            return{
                ...state,
                single_task: action.payload
            } 
            
        case TODO_COMPLETE_FAILURE:
            return{
                ...state,
                single_task: []
            }    

        default:
            return state    
    }
}

export default todoReducer