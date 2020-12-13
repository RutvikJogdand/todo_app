import React, { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {get_todos, complete_todo, add_todo} from "./../../Redux/actions"
import { v4 as uuidv4 } from 'uuid'
import styles from "./AllTodos.module.css"

function AllTodos()
{
    const dispatch = useDispatch()
    const todosArr = useSelector(state => state.todoRoot.todos_arr)
    const [task, setTask] = useState("")
    const [tags, setTags] = useState("")
    const [tagsArr, setTagsArr] = useState([])

    // console.log(todosArr)
    useEffect(() => {

        dispatch(get_todos())
    }, [dispatch])

    const handleComplete = (id, title, completed, creation_date, completion_date, tags) => {

        dispatch(complete_todo({id, title, completed, creation_date, completion_date, tags}))

    }

    const handleChange = (e) => {

        setTask(e.target.value)
    }
    
    const handleTagChange = (e) => {
        
        setTags(e.target.value)
    }

    const handleAdd = () => {

        let allTags = tags.trim().split(",")
        setTask("")
        setTags("")

        if(task && tags)
        {
            dispatch(add_todo({id: uuidv4(),title: task,completed: false,creation_date: new Date().toLocaleDateString(), completion_date: "", tags: allTags}))

        }
        else
        {
            alert("You left some fields blank")
        }


    }

    // console.log(task, "TASK")
    // console.log(tags, "TAGS")
    return(
        <>
            <div className={styles.todosContainer}>
                <input type="search" name="task" value={task} placeholder="Enter a task" onChange={handleChange} />
                <input type="search" name="tags" value={tags} placeholder="Enter tags(comma seperated)" onChange={handleTagChange} />
                <button onClick={handleAdd}>Add</button>
            </div>
            <section className={styles.todosContainer}>
                {
                    todosArr && todosArr.sort((a,b) => a.creation_date - b.creation_date ).map(item => { //completion_date

                        return(
                            <div key={uuidv4()} style={{backgroundColor: item.completed ? "#4caf50": "white"}}>
                                <small> Created: {new Date(item.creation_date).toUTCString() } </small>
                                {item.completed? <small>Completed: {new Date(item.completion_date).toUTCString()} </small> : ""}  
                                <p> {item.title} </p>

                                <div className={styles.btnContainer}>
                                    <button className="btn btn-info rounded-circle">
                                        <i className="fa fa-pencil"></i>
                                    </button>
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
        </>
    )
}

export default AllTodos