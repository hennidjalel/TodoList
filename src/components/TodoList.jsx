import { useState, useEffect } from "react";
import CreateTask from "../modals/CreateTask"
import axios from "axios";

import Card from "./Card";



const TodoList = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [taskList, setTaskList] = useState([]);

    const saveTask = (taskObject) => {
        let temporaryTask = taskList;
        temporaryTask.push(taskObject)
        localStorage.setItem("TodoList", JSON.stringify(temporaryTask))
        setTaskList(temporaryTask)
        setModal(false)
    }

    useEffect(() => {
        const todo = localStorage.getItem("TodoList")
        if (todo) {
            const task = JSON.parse(todo)
            setTaskList(task)
        }
        fetchData()
    }, [])


    // fetch data

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/todos?userId=${user.id}`)
            setTaskList(res.data)
            // console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    // Add New Todo

    const addTodo = async () => {
        const taskObj = {
            userId: user.id,
            title: taskName,
            description: description,
            endDate: date,
            completed: checked
        }
        try {
            const res = await axios.post('http://localhost:3001/todos', taskObj)
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    // Delete Todo

    const handelDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3001/todos/${id}`)
            console.log("================")
            const updatedTodo = taskList.filter(item => item.id !== id);
            setTaskList(updatedTodo)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className='header'>
                <h3>TodoList</h3>
                <button className='btn btn-primary' onClick={toggle}>Create Task</button>
            </div>

            <div className='taskContent'>
                {taskList && taskList.map((obj, index) => <Card taskObject={obj} index={index} handelDelete={handelDelete} />)}
            </div>

            <CreateTask tasks={{ taskList, setTaskList }} modal={modal} toggle={toggle} save={saveTask} />
        </div>
    )
}

export default TodoList