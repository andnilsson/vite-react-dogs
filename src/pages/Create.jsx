import { useState } from "react"
import { Link } from "react-router-dom"
import shortid from "shortid"
import { useDogs } from "../components/DogContext"

export const CreatePage = () => {

  const { addDog } = useDogs()
  const [name, setName] = useState()
  const [done, setDone] = useState(false)
  const add = async () => {
    await addDog({
      name,
      id: shortid()
    })
    setDone(true)
    setName('')
    let timeout = setTimeout(() => {
      setDone(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }
  return <>
    <Link to='/'>go back</Link>
    <h1>this is the create page</h1>
    <input placeholder="Enter the dog name" value={name} onChange={e => setName(e.target.value)} />
    <p><button onClick={add}>create</button></p>
    {done && <span style={{ color: 'green' }}>Saved!</span>}
  </>
}