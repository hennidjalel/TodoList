import { useState } from 'react';
import { Collapse, Form, Input, FormGroup, Button } from 'reactstrap';
import { IoIosAdd } from 'react-icons/io'
const Collaps = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Button className='mb-1 d-flex align-items-center' size="sm" outline color='' onClick={toggle}> <IoIosAdd /> Add subtask</Button>
            <Collapse isOpen={isOpen}>
                <Form>
                    <FormGroup>
                        <Input
                            type='text'
                            placeholder='Write subtask'
                        />
                    </FormGroup>
                </Form>
            </Collapse>
        </div>
    )
}

export default Collaps