import { useState, useEffect } from "react";
import CreateTask from "../modals/CreateTask"
import axios from "axios";

import Card from "./Card";
import { LogoutOutlined } from '@ant-design/icons'
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


const TodoList = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear('user');
        navigate('/login');
    };

    const [taskList, setTaskList] = useState([]);

    const saveTask = (taskObject) => {
        let temporaryTask = taskList;
        temporaryTask.push(taskObject)
        localStorage.setItem("TodoList", JSON.stringify(temporaryTask))
        console.log(temporaryTask)
        setTaskList(temporaryTask)
        setModal(false)
    }

    useEffect(() => {
        const todo = localStorage.getItem("TodoList")
        // console.log(todo)
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
            console.log(res.data)
            localStorage.setItem("todo", JSON.stringify(res.data))
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
                <Button
                    className="header__btn"
                    type="primary"
                    shape="round"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                >
                    Logout
                </Button>

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