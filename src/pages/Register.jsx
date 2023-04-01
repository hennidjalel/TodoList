import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'


const Register = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")

    const handelChange = (e) => {
        const { name, value } = e.target
        if (name === "email") return setEmail(value)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3001/authentification', { email })
            console.log(res.data)
            navigate("/login")
            // console.log(res.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='login' >
            <div className='login__container'>
                <h2>CREATE ACCOUNT</h2>
                <form className='d-flex flex-column gap-4' onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name='email'
                        placeholder='exemple@todo.com'
                        required
                        value={email}
                        onChange={handelChange}
                    />
                    <button type='submit'>SIGN UP</button>
                </form>
                <Link to="/login" className='link'>Do you have account ?</Link>
            </div>
        </div>
    )
}

export default Register