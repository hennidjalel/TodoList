import { DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Collapse } from 'reactstrap';
import Collaps from '../collapse/Collaps';

const EditTask = ({ modal, isToggle, editTask, taskObject }) => {

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

    const handelSave = (e) => {
        e.preventDefault()
        const taskObject = {
            title: taskName,
            description: description,
            endDate: date
        }

    }

    useEffect(() => {
        setTaskName(taskObject.title)
        setDescription(taskObject.description)
        setDate(taskObject.endDate)

    }, [])



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
                    <Button color="primary" onClick={handelSave}>
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