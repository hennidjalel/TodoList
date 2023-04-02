import { DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Collapse } from 'reactstrap';
import Collaps from '../collapse/Collaps';
import axios from 'axios';

const EditTask = ({ modal, isToggle, taskObject }) => {

    const todo = JSON.parse(localStorage.getItem('todo'));


    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState("")


    const handelChange = (e, dateString) => {
        if (e.target) {
            const { name, value } = e.target
            if (name === 'taskName') return setTaskName(value)
            if (name === "description") return setDescription(value)
            return
        }
        console.log(dateString)
        setDate(dateString)
    }


    useEffect(() => {
        setTaskName(taskObject.title)
        setDescription(taskObject.description)
        setDate(taskObject.endDate)

    }, [])

    const updateTodo = async (id) => {
        console.log(id)
        const updatedTaskObject = {
            title: taskName,
            description: description,
            endDate: date
        }
        try {
            const res = await axios.patch(`http://localhost:3001/todos/${id}`, updatedTaskObject)
            const indexToUpdate = todo.findIndex(todo => todo.id === id);

            if (indexToUpdate !== -1) {
                todo[indexToUpdate] = updatedTaskObject;
            }
            localStorage.setItem('todo', JSON.stringify(todo))
            console.log(todo)
            isToggle(false)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Modal isOpen={modal} toggle={isToggle}>
                <ModalHeader toggle={isToggle}>Edit Task</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Task Name</Label>
                            <Input
                                type='text'
                                name='taskName'
                                placeholder='What do you need to do today?'
                                value={taskName}
                                onChange={handelChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input
                                id="exampleText"
                                name="description"
                                type="textarea"
                                value={description}
                                onChange={handelChange}

                            />
                        </FormGroup>
                        <span>
                            End date:
                            <DatePicker
                                onChange={handelChange}
                            />
                        </span>
                        <Collaps />
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => updateTodo(taskObject.id)}>
                        Edit
                    </Button>{' '}
                    <Button color="secondary" onClick={isToggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

export default EditTask