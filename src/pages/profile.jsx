import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useDogs } from "../components/DogContext"

export const Profile = () => {
  const { id } = useParams()
  const { dogs, currentDog, setDogById, toggleDogStatus } = useDogs()
  useEffect(() => {
    if(dogs.length <1 ) return
    setDogById(id)
  }, [id, dogs])


  if (!currentDog) return <span>Missing {id}</span>

  return <>
    <div>
      <Link to={'/'}>Go back</Link>
      <h1>{currentDog.name}</h1>
    </div>
    <img src={currentDog.img} alt={currentDog.name} />
    <div>
      {currentDog.name} currently is <b>{currentDog.status}</b>
    </div>

    <button onClick={toggleDogStatus}>Change status to {currentDog.status === 'home' ? 'away' : 'home'}</button>

  </>
}