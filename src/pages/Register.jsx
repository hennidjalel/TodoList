import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { motion } from 'framer-motion';

const Register = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        if (user) return navigate('/')
    }, [])


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
        <div className='login'>
            <motion.div className='login__container'
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
            >
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
            </motion.div>
        </div>
    )
}

export default Register