import {PreviewToy} from './PreviewToy.jsx'
import { NavLink } from 'react-router-dom';



export function ToyList({toys,onRemoveToy}){
  return(
    <ul className="clean-list">
             {
              toys.map(toy=>{
             return <div className="toy-card" key={toy._id} >
                <PreviewToy
                   key={toy._id} 
                   toy={toy}
                   onRemoveToy={onRemoveToy}
                   />
                   <section className="toy-prev-btns">
                            <NavLink to={`/toy/edit/${toy._id}`}><button>Edit</button></NavLink>
                            <NavLink to={`/toy/details/${toy._id}`}><button>Details</button></NavLink>
                  </section>
                  </div>
              })
             }
    </ul>
  )
}