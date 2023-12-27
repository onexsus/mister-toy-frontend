import { Link } from "react-router-dom"


export function PreviewToy({toy,onRemoveToy,onEditToy}){
  return(
    <li className="toy-preview" key={toy._id}>
      <Link to={`/toy/${toy._id}`} >
                <h3>{toy.name}</h3>
      </Link>
      
      <h3>Price: {toy.price}</h3>
      <div>
                <button onClick={() => {
                    onRemoveToy(toy._id)
                }}>Delete X</button>
            </div>
    </li>
  )
}