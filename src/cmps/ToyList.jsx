import { useSelector } from 'react-redux'
import { PreviewToy } from "./PreviewToy.jsx"
import { NavLink } from "react-router-dom"

export function ToyList({ toys, onRemoveToy }) {
  const user = useSelector(storeState => storeState.userModule.loggedinUser)
  return (
    <ul className="clean-list toy-list">
      {toys.map((toy) => {
        return (
          <div className="toy-card" key={toy._id}>
            <PreviewToy key={toy._id} toy={toy} onRemoveToy={onRemoveToy} />
            <section className="toy-prev-btns ">
              {user&&user.isAdmin&&<div className="flex justify-between">
              <NavLink to={`/toy/edit/${toy._id}`}>
                <button>Edit</button>
              </NavLink>
              <button
                onClick={() => {
                  onRemoveToy(toy._id)
                }}
              >
                Delete X
              </button>
              </div>}
              <div className="flex flex-column justify-between">
              <button>Add To Cart</button>
              <NavLink className="btn flex justify-center" to={`/toy/details/${toy._id}`}>
                Details
              </NavLink>
              </div>
              
              
            </section>
          </div>
        )
      })}
    </ul>
  )
}
