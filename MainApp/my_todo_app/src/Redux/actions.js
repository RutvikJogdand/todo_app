/* eslint-disable no-unused-vars */
import { GET_TODOS_REQUEST, GET_TODOS_SUCCESS, GET_TODOS_FAILURE,
    TODO_COMPLETE_REQUEST, TODO_COMPLETE_SUCCESS, TODO_COMPLETE_FAILURE } from "./actionTypes";
import axios from "axios"

export const get_todos_req = () => ({
    type: GET_TODOS_REQUEST
})

export const get_todos_success = (payload) => ({
    type: GET_TODOS_SUCCESS,
    payload
})

export const get_todos_failure = (payload) => ({
    type: GET_TODOS_FAILURE,
    payload
})

export const get_todos = () => (dispatch) => {

    dispatch(get_todos_req())
    axios
    .get("http://localhost:3000/tasks")
    .then((res) => {

        // console.log(res)

        dispatch(get_todos_success(res.data))
    })
    .catch((err) => {

        console.log(err)

        dispatch(get_todos_failure(err))
    })
}

// Todo complete requests:
export const complete_todo_req = () => ({
    type: TODO_COMPLETE_REQUEST
})

export const complete_todo_success = (payload) => ({
    type: TODO_COMPLETE_SUCCESS,
    payload
})

export const complete_todo_failure = (payload) => ({
    type: TODO_COMPLETE_FAILURE,
    payload
})

export const complete_todo = (payload) => (dispatch) => {

    // dispatch(complete_todo_req())
    console.log(payload)

    axios
    .put(`http://localhost:3000/tasks/${payload.id}`,{ id: payload.id ,title: payload.title, completed: !payload.completed, creation_date: payload.creation_date, completion_date: payload.completion_date, tags: payload.tags  })
    .then((res) => {

        
        
        console.log(res.data)
        dispatch(get_todos_req())
        axios
        .get("http://localhost:3000/tasks")
        .then((res) => {

            // console.log(res)

            dispatch(get_todos_success(res.data))
        })
        .catch((err) => {

            console.log(err)

            dispatch(get_todos_failure(err))
        })
    })
    .catch((err) => {

        console.log(err)

        dispatch(complete_todo_failure(err))
    })
}