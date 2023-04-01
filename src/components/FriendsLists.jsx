import { useDogs } from "./DogContext"

export const FriendsList = () => {
  const { currentDog } = useDogs()

  if (!currentDog) return null
  return <div style={{
    background: '#333',
    borderRadius: '.75rem',
    padding: '1rem'
  }}>

    <h4>{currentDog.name} is friends with</h4>
    {currentDog.friends?.map(friend => (
      <div key={friend.id}>
        <b>{friend.name}</b>
      </div>
    ))}
  </div>
}