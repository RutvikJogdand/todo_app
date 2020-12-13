/* eslint-disable no-unused-vars */
import { GET_TODOS_REQUEST, GET_TODOS_SUCCESS, GET_TODOS_FAILURE,
    TODO_COMPLETE_REQUEST, TODO_COMPLETE_SUCCESS, TODO_COMPLETE_FAILURE,
    ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE,
    EDIT_TODO_REQUEST, EDIT_TODO_SUCCESS, EDIT_TODO_FAILURE,
    DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE } from "./actionTypes";
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

        
        complete_todo_success(res.data)
        dispatch(get_todos())
        // console.log(res.data)
       
    })
    .catch((err) => {

        console.log(err)

        dispatch(complete_todo_failure(err))
    })
}

// Add todo actions

export const add_todo_req = () => ({
    type: ADD_TODO_REQUEST
})

export const add_todo_success = (payload) => ({
    type: ADD_TODO_SUCCESS,
    payload
})

export const add_todo_failure = (payload) => ({
    type: ADD_TODO_FAILURE,
    payload
})

export const add_todo = (payload) => (dispatch) => {

    // console.log(payload)
    dispatch(add_todo_req())
    axios.post('http://localhost:3000/tasks', {
        id: payload.id,
        title: payload.title, 
        completed: payload.completed, 
        creation_date: payload.creation_date, 
        completion_date: payload.completion_date, 
        tags: payload.tags 
      })
      .then((response) => {

        dispatch(get_todos())
        console.log(response);
      }, (error) => {
        console.log(error);
      });
}

// Edit todo actions

export const edit_todo_req = () => ({
    type: EDIT_TODO_REQUEST
})

export const edit_todo_success = (payload) => ({
    type: EDIT_TODO_SUCCESS,
    payload
})

export const edit_todo_failure = (payload) => ({
    type: EDIT_TODO_FAILURE,
    payload
})

export const edit_todo = (payload) => (dispatch) => {

    dispatch(edit_todo_req())
    axios.put(`http://localhost:3000/tasks/${payload.id}`, {
        id: payload.id,
        title: payload.title, 
        completed: payload.completed, 
        creation_date: payload.creation_date, 
        completion_date: payload.completion_date, 
        tags: payload.tags 
      })
      .then((response) => {

        dispatch(get_todos())
        console.log(response);
      }, (error) => {
        console.log(error);
      });
}

// Delete Todo actions

export const delete_todo_req = () => ({
    type: DELETE_TODO_REQUEST
})

export const delete_todo_success = (payload) => ({
    type: DELETE_TODO_SUCCESS,
    payload
})

export const delete_todo_failure = (payload) => ({
    type: DELETE_TODO_FAILURE,
    payload
})

export const delete_todo = (payload) => (dispatch) => {

    dispatch(delete_todo_req())
    axios.delete(`http://localhost:3000/tasks/${payload}`)
      .then((response) => {

        dispatch(get_todos())
        dispatch(delete_todo_success(response.data))
        console.log(response);
      }, (error) => {

        dispatch(delete_todo_failure(error))
        console.log(error);
      });

}