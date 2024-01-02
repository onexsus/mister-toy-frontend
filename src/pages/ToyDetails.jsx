import React, { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams ,NavLink } from "react-router-dom"

import { showErrorMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"

export function ToyDetails() {
  const [toy, setToy] = useState(null)

  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
  })

  function loadToy() {
    toyService
      .getById(toyId)
      .then(setToy)
      .catch((err) => {
        showErrorMsg("Cant load toy")
        navigate("/toy")
      })
  }

  if (!toy) return <div>Loading...</div>
  return (
    <section className="toy-details-container flex flex-column align-center">
        <h2>Toy Details</h2>
      <div className="toy-details">
        <img src={toy.url} alt={toy.name} />
        <div className="toy-info">
          <h3>
            Name: <span>{toy.name}</span>
          </h3>
          <h3>
            Price: <span>{toy.price} $</span>
          </h3>
          <h3>
            labels: <span>{toy.labels.join(" , ")}</span>
          </h3>
          <h3>
            In Stock: <span>{toy.inStock ? "yes" : "no"}</span>
          </h3>
          <div className="flex">
          <button>Add To Cart</button>
              <NavLink className="btn btn-details flex justify-center" to={`/toy`}>
                Back To Store
              </NavLink>
          </div>
        </div>
      </div>
      <div className="posts-container flex flex-column align-center">
        <h2>Posts</h2>
        <button>Add Post</button>
        <ul className="clean-list">
        {toy.posts ? (toy.posts.map(post=>{
            <li key={post.id}>

            </li>
        })):<h3>No Posts...</h3>}
        </ul>
      </div>
    </section>
  )
}
