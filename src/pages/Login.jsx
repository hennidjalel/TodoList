import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';



const Login = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    useEffect(() => {
        if (user) return navigate('/')
    }, [])

    const [email, setEmail] = useState("")

    const handelChange = (e) => {
        const { name, value } = e.target
        if (name === "email") return setEmail(value)

    }

    const notify = () => {
        toast.success('Successfully created!');
        console.log('toast test')
    };
    const notifyErr = () => {
        toast.error('error created!', { duration: 4000, position: 'top-center' });
        console.log('toast test')
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(`http://localhost:3001/authentification?email=${email}`)
            console.log(res.data)
            if (res.data.length === 0) return console.log('wrong email')
            localStorage.setItem('user', JSON.stringify(res.data[0]));
            // notify()
            navigate("/")
            // console.log(res.data[0])
        } catch (error) {
            notifyErr()
            console.log(error)
        }
    }

    return (
        <div className='login'>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <motion.div className='login__container'
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
            >
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

            </motion.div>
        </div>
    )
}

export default Login