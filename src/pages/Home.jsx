import React, { useEffect } from 'react'
import TodoList from '../components/TodoList'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) return navigate('/login')
  }, [])
  return (
    <div>
      <TodoList />
    </div>
  )
}

export default Home