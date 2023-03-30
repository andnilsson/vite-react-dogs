import { createContext, useContext, useEffect, useState } from "react"

export const DogContext = ({ children }) => {

  const [dogs, setDogs] = useState(initDogs)
  const [currentDog, setCurrentDog] = useState()


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
    setCurrentDog({...currentDog, status: newStatus})
    setDogs(updatedDogsArray)
  }

  return <ctx.Provider value={{
    dogs,
    currentDog,
    setDogById,
    toggleDogStatus
  }}>{children}</ctx.Provider>
}


const ctx = createContext({
  dogs: [],
  currentDog: undefined,
  setDogById: () => { },
  toggleDogStatus: () => { }
})

export const useDogs = () => useContext(ctx)


const initDogs = [{
  id: '1',
  name: 'conny',
  img: "https://images.dog.ceo/breeds/shihtzu/n02086240_6463.jpg",
  status: 'home'
},
{
  id: '2',
  name: 'ronny',
  img: "https://images.dog.ceo/breeds/terrier-westhighland/n02098286_6123.jpg",
  status: 'away'
},
{
  id: '3',
  name: 'sonny',
  img: "https://images.dog.ceo/breeds/whippet/n02091134_14094.jpg",
  status: 'away'
}
]