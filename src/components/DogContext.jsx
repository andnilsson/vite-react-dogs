import { createContext, useContext, useEffect, useMemo, useState } from "react"

export const DogContext = ({ children }) => {

  const [dogs, setDogs] = useState([])
  const [currentDog, setCurrentDog] = useState()
  const [friends, setFriends] = useState([])

  const currentDogWithFriends = useMemo(() => {
    if (!currentDog) return undefined

    let allFriendKeys = friends.filter(x => x.indexOf(currentDog.id) > -1)

    let friendKeys = allFriendKeys.map(x => x.split(' ')).flat().filter(x => x !== currentDog.id)

    let currentFriends = dogs.filter(x => friendKeys.includes(x.id))

    return {
      ...currentDog,
      friends: currentFriends
    }

  }, [currentDog, friends, dogs])

  useEffect(() => {
    if (dogs.length > 0)
      localStorage.setItem(KEY, JSON.stringify(dogs))
  }, [dogs])

  useEffect(() => {
    if (friends.length > 0)
      localStorage.setItem(FRIENDSKEY, JSON.stringify(friends))
  }, [friends])

  useEffect(() => {
    let initDogsState = localStorage.getItem(KEY)
    let initFriendsState = localStorage.getItem(FRIENDSKEY)

    setDogs(initDogsState ? JSON.parse(initDogsState) : [])
    setFriends(initFriendsState ? JSON.parse(initFriendsState) : [])
  }, [])

  const setDogById = async (id) => {
    setCurrentDog(dogs.find(x => x.id === id))
  }


  const toggleFriends = async (dogFriendId) => {
    if (!currentDog || !dogFriendId) return

    const { id } = currentDog
    let key = [id, dogFriendId].sort().join(' ')
    let updatedFriends = [...friends]
    if (friends.some(x => x === key))
      updatedFriends = updatedFriends.filter(x => x !== key)
    else
      updatedFriends.push(key)

    setFriends(updatedFriends)

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
  }

  const removeDog = (dog) => {
    let updatedDogsArray = dogs.filter(x => x.id !== dog.id)
    setDogs([...updatedDogsArray])
  }

  return <ctx.Provider value={{
    dogs,
    currentDog: currentDogWithFriends,
    setDogById,
    toggleDogStatus,
    addDog,
    removeDog,
    toggleFriends
  }}>{children}</ctx.Provider>
}


const ctx = createContext({
  dogs: [],
  currentDog: undefined,
  setDogById: () => { },
  toggleDogStatus: () => { },
  addDog: async dog => { },
  removeDog: dog => { },
  toggleFriends: dogFriendId => { }
})

export const useDogs = () => useContext(ctx)

const KEY = '__dogs'
const FRIENDSKEY = '__friends'
