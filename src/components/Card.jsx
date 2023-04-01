import { Checkbox, Divider } from 'antd'
import { useState } from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { CardBody, Collapse } from 'reactstrap'
import EditTask from '../modals/EditTask'
import axios from 'axios'

const Card = ({ taskObject, index, handelDelete }) => {
    const [checked, setChecked] = useState(true);
    const [modal, setModal] = useState(false)
    const isToggle = () => setModal(!modal)
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);






    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>

            <div className='cardTodo' key={index}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox style={{ marginRight: '1rem' }} checked={taskObject.completed} />
                    <div className='todoContent' onClick={toggle}>
                        <h3>{taskObject.title}</h3>
                    </div>
                    <div className='cardIcon d-flex h4 '>
                        <AiTwotoneEdit style={{ cursor: 'pointer' }} onClick={isToggle} />
                        <MdOutlineDeleteOutline style={{ cursor: 'pointer' }} color='red' onClick={() => handelDelete(taskObject.id)} />
                    </div>
                </div>
                <Collapse isOpen={isOpen}>
                    <Divider />
                    <div className='d-flex align-items-center'>
                        <CardBody style={{ width: '80%' }}>
                            {taskObject.description}
                        </CardBody>
                        <Divider type="vertical" />
                        <span>{taskObject.endDate}</span>
                    </div>
                </Collapse>
            </div>

            <EditTask modal={modal} isToggle={isToggle} taskObject={taskObject} />
        </div>
    )
}

export default Card