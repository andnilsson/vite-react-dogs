import { useDogs } from "./DogContext"
import { Link } from "react-router-dom";


export const ListDogs = () => {
  const { dogs } = useDogs()
  return <>
    {dogs.map(d => (
      <Link key={d.id} to={`/profile/${d.id}`}>
        <div>
          <b style={{
            color: d.status === 'home' ? 'green' : 'red'
          }}>{d.name}</b>
        </div>
      </Link>
    ))}

  </>
}