import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useRef } from 'react';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")

    const handelChange = (e) => {
        const { name, value } = e.target
        if (name === "email") return setEmail(value)

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(`http://localhost:3001/authentification?email=${email}`)
            console.log(res.data)
            if (res.data.length === 0) return console.log('wrong email')
            localStorage.setItem('user', JSON.stringify(res.data[0]));
            navigate("/")
            // console.log(res.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <h2>SIGN IN TO YOUR ACCOUNT</h2>
                <form className='d-flex flex-column gap-4' onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name='email'
                        placeholder='exemple@todo.com'
                        required
                        value={email}
                        onChange={handelChange}
                    />
                    <button type='submit'>SIGN IN</button>
                </form>
                <Link to="/register" className='link'>Create an account</Link>
            </div>
        </div>
    )
}

export default Login