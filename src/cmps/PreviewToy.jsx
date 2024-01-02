import { Link } from "react-router-dom"


export function PreviewToy({toy}){
  // let imgToy= 'src/assets/img/toys/panda-toy.png'
  return(
    <li className="toy-preview" key={toy._id}>
      <img src={toy.url}/>
      <Link to={`/toy/${toy._id}`} >
                <h3>{toy.name}</h3>
      </Link>
      <h3>Price: {toy.price} $</h3>
      <h3>In Stock: <span>{(toy.inStock) ? 'yes' : 'no'}</span></h3>
    </li>
  )
}