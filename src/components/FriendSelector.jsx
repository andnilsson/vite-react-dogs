import { useState } from "react"
import { useDogs } from "./DogContext"

export const FriendSelector = () => {
  const { dogs, currentDog, toggleFriends } = useDogs()

  const [selected, setSelected] = useState("")

  const eligbleFriends = dogs.filter(x => x.id !== currentDog?.id)

  return <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }}>
    <span>pick a dog friend</span>
    <div>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        <option value={""} disabled hidden>---</option>
        {eligbleFriends.map(d => <option value={d.id} key={d.id}>{d.name}</option>)}
      </select>

      <button onClick={() => toggleFriends(selected)} disabled={!selected}>Pick as friend</button>
    </div>
  </div>
}