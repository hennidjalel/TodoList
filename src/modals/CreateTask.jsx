import { Checkbox, DatePicker } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import Collaps from '../collapse/Collaps';

const CreateTask = ({ modal, toggle, tasks }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState("")
    const [checked, setChecked] = useState(false)




    const toggleChecked = () => {
        setChecked(!checked);
        console.log(checked)
    };

    const handelChange = (e, dateString) => {
        if (e.target) {
            const { name, value } = e.target
            if (name === 'taskName') return setTaskName(value)
            if (name === "description") return setDescription(value)
            if (name === "completed") return setChecked(checked)
            return
        }
        // console.log(dateString)
        setDate(dateString)


    }


    // Create new Todo

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
            toggle(false)
            console.log(tasks)
            tasks.setTaskList([...tasks.taskList, res.data])
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create Task</ModalHeader>
                <ModalBody>
                    <Form className='d-flex flex-column'>
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
                        {/* <Checkbox
                            onChange={handelChange}
                            name="completed"
                            checked={checked}
                            onClick={toggleChecked}
                        >
                            Completed
                        </Checkbox> */}
                        <Collaps />
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addTodo}>
                        Create
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

export default CreateTask