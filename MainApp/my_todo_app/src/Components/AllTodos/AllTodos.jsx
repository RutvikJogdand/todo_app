import React, { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import {get_todos, complete_todo} from "./../../Redux/actions"
import { v4 as uuidv4 } from 'uuid'
import styles from "./AllTodos.module.css"

function AllTodos()
{
    const dispatch = useDispatch()
    const todosArr = useSelector(state => state.todoRoot.todos_arr)

    console.log(todosArr)
    useEffect(() => {

        dispatch(get_todos())
    }, [dispatch])

    const handleComplete = (id, title, completed, creation_date, completion_date, tags) => {

        dispatch(complete_todo({id, title, completed, creation_date, completion_date, tags}))

    }
    return(
        <section className={styles.todosContainer}>
            {
                todosArr && todosArr.sort((a,b) => new Date(b.creation_date).toUTCString() - new Date(a.creation_date).toUTCString() ).map(item => { //completion_date

                    return(
                        <div key={uuidv4()} style={{backgroundColor: item.completed ? "#4caf50": "white"}}>
                            <small> Created: {new Date(item.creation_date).toUTCString() } </small>
                             {item.completed? <small>Completed: {new Date(item.completion_date).toUTCString()} </small> : ""}  
                            <p> {item.title} </p>

                            <div className={styles.btnContainer}>
                                 <button onClick={() => handleComplete(item.id, item.title, item.completed, item.creation_date,  new Date().toLocaleDateString(), item.tags )} className="btn btn-success rounded-circle">
                                    <i className="fa fa-check"></i>
                                </button>
                                <button className="btn btn-danger rounded-circle">
                                    <i className="fa fa-close"></i>
                                </button>
                            </div>                
                        </div>
                    )
                })
            }

        </section>
    )
}

export default AllTodos