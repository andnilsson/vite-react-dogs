import { createContext, useContext, useEffect, useState } from "react"

export const DogContext = ({ children }) => {

  const [dogs, setDogs] = useState([])
  const [currentDog, setCurrentDog] = useState()

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(dogs))
  }, [dogs])

  useEffect(() => {
    let initState = localStorage.getItem(KEY)

    setDogs(JSON.parse(initState))
  }, [])

  const setDogById = async (id) => {
    setCurrentDog(dogs.find(x => x.id === id))
  }

  const toggleDogStatus = () => {

    if (!currentDog) return

    let { id, status } = currentDog
    let newStatus = status === 'home' ? 'away' : 'home'
    const dogIndex = dogs.findIndex(dog => dog.id === id);

    const updatedDogsArray = [...dogs];
    updatedDogsArray[dogIndex] = { ...updatedDogsArray[dogIndex], status: newStatus };
    setCurrentDog({ ...currentDog, status: newStatus })
    setDogs(updatedDogsArray)
  }

  const addDog = async dog => {
    let response = await fetch('https://dog.ceo/api/breeds/image/random')
    let data = await response.json()
    dog.img = data.message
    setDogs([...dogs, dog])
    console.log('??')
  }

  return <ctx.Provider value={{
    dogs,
    currentDog,
    setDogById,
    toggleDogStatus,
    addDog
  }}>{children}</ctx.Provider>
}


const ctx = createContext({
  dogs: [],
  currentDog: undefined,
  setDogById: () => { },
  toggleDogStatus: () => { },
  addDog: async dog => { }
})

export const useDogs = () => useContext(ctx)

const KEY = '__dogs'
