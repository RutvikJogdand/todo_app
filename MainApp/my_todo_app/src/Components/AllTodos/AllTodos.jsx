import React, { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {get_todos, complete_todo, add_todo, edit_todo, delete_todo} from "./../../Redux/actions"
import { v4 as uuidv4 } from 'uuid'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from "./AllTodos.module.css"


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function AllTodos()
{
    const dispatch = useDispatch()
    const todosArr = useSelector(state => state.todoRoot.todos_arr)
    const [task, setTask] = useState("")
    const [tags, setTags] = useState("")
    // const [tagsArr, setTagsArr] = useState([])
    const [todoId, setTodoId] = useState("")

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    
    console.log(todosArr)
    useEffect(() => {
        
        dispatch(get_todos())
    }, [dispatch])
    
    const handleOpen = (id, title, tags) => {
       
        setTodoId(id)
        setOpen(true);
        
        tags = tags.join(",")

        setTask(title)
        // console.log(tags)
        setTags(tags)
    }

    const handleClose = () => {
        setOpen(false);
        setTask("")
        setTags("")
    }

    const handleComplete = (id, title, completed, creation_date, completion_date, tags) => {

        dispatch(complete_todo({id, title, completed, creation_date, completion_date, tags}))

    }

    const handleChange = (e) => {

        setTask(e.target.value)
    }
    
    const handleTagChange = (e) => {
        
        setTags(e.target.value)
    }

    const handleKey = (e) => {

        if(e.key === "Enter")
        {
            handleAdd()
        }

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

    const handleEdit = () => {

         if(todosArr)
        {
            let todoItem = todosArr.find(item => item.id === todoId)
            let allTags = tags.split(",") ;

            if(allTags[0] === "")
            {
                allTags = todoItem.tags
            }

            // console.log(allTags)

           

        
            dispatch(edit_todo({
                id: todoItem.id,
                title: task || todoItem.title,
                completed: todoItem.completed,
                creation_date: todoItem.creation_date,
                completion_date: todoItem.completion_date,
                tags:  allTags
            }))
            

            setTask("")
            setTags("")
            
        }

        setOpen(false);

    }

    const handleDelete = (id) => {


        dispatch(delete_todo(id))
    }
    // console.log(task, "TASK")
    // console.log(tags, "TAGS")
    return(
        <>
            <div onKeyPress={handleKey} className={styles.inputContainer}>
                <input className={styles.inputField} type="search" name="task" value={task} placeholder="Enter a task" onChange={handleChange} />
                <br/>
                <input className={styles.inputField} type="search" name="tags" value={tags} placeholder="Enter tags(comma seperated)" onChange={handleTagChange} />
                <br/>
                <button onClick={handleAdd}>Add</button>
                
            </div>
            <h2>Pending TODOs:</h2>
            <section className={styles.todosContainer}>
                {
                    todosArr && todosArr.filter(item => item.completed === false).map(item => { //completion_date

                        return(
                            <div key={uuidv4()} style={{backgroundColor: item.completed ? "#4caf50": "white"}}>
                                <small> Created: {new Date(item.creation_date).toUTCString() } </small>
                                {item.completed? <small>Completed: {new Date(item.completion_date).toUTCString()} </small> : ""} 
                                <br/> 
                                <small> {item.tags.map(item => {

                                    return(
                                        <small> #{item} </small>
                                    )
                                })}  </small>
                                <p> {item.title} </p>

                                <div className={styles.btnContainer}>
                                    <button onClick={() =>handleOpen(item.id, item.title, item.tags)} className="btn btn-info rounded-circle">
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                    <button onClick={() => handleComplete(item.id, item.title, item.completed, item.creation_date,  new Date().toLocaleDateString(), item.tags )} className="btn btn-success rounded-circle">
                                        <i className="fa fa-check"></i>
                                    </button>
                                    <button onClick={() =>handleDelete(item.id)} className="btn btn-danger rounded-circle">
                                        <i className="fa fa-close"></i>
                                    </button>
                                </div>                
                            </div>
                        )
                    })
                }

            </section>

            <h2>Completed TODOs:</h2>
            <section className={styles.todosContainer}>

                {
                    todosArr && todosArr.filter(item => item.completed === true).map(item => { //completion_date

                        return(
                            <div key={uuidv4()} style={{backgroundColor: item.completed ? "#4caf50": "white"}}>
                                <small> Created: {new Date(item.creation_date).toUTCString() } </small>
                                {item.completed? <small>Completed: {new Date(item.completion_date).toUTCString()} </small> : ""} 
                                <br/> 
                                <small> {item.tags.map(item => {

                                    return(
                                        <small> #{item} </small>
                                    )
                                })}  </small>
                                <p> {item.title} </p>

                                <div className={styles.btnContainer}>
                                    <button onClick={() =>handleOpen(item.id, item.title, item.tags)} className="btn btn-info rounded-circle">
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                    <button onClick={() => handleComplete(item.id, item.title, item.completed, item.creation_date,  new Date().toLocaleDateString(), item.tags )} className="btn btn-success rounded-circle">
                                        <i className="fa fa-check"></i>
                                    </button>
                                    <button onClick={() =>handleDelete(item.id)} className="btn btn-danger rounded-circle">
                                        <i className="fa fa-close"></i>
                                    </button>
                                </div>                
                            </div>
                        )
                    })
                }


            </section>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h3>Edit:</h3>
                    <input className={styles.inputField} type="search" name="task" value={task} placeholder="Enter a task" onChange={handleChange} /><br/>
                    <input className={styles.inputField} type="search" name="tags" value={tags} placeholder="Enter tags(comma seperated)" onChange={handleTagChange} /><br/>
                    <button onClick={handleEdit}>Edit</button>
                </div>
                </Fade>
            </Modal>
        </>
    )
}

export default AllTodos