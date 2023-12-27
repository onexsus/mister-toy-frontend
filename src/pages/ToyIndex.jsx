import { useDispatch, useSelector } from "react-redux"
import { useEffect , useState } from "react"
import { NavLink } from 'react-router-dom'

import { toyService } from "../services/toy.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import {
  loadToys,
  removeToy,
  saveToy,
} from "../store/actions/toy.actions.js"
import { ToyList } from "../cmps/ToyList.jsx"
import { ToyFilter } from "../cmps/ToyFilter"
import { ToySort } from "../cmps/ToySort"

export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const [filterBy, setFilterBy] = useState(
    toyService.getDefaultFilter())
    const [sort, setSort] = useState(toyService.getDefaultSort())

  useEffect(() => {
    loadToys(filterBy, sort)
        .then(() => {
            console.log('toys:',toys);
            console.log('Loaded successfully')
        })
        .catch((err) => {
            showErrorMsg('Oops.. something went wrong, try again')
        })
}, [filterBy, sort])

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg("Toy removed")
      })
      .catch((err) => {
        console.log("Cannot remove Toy", err)
        showErrorMsg("Cannot remove Toy")
      })
  }

  function onEditToy(toy) {
    const price = +prompt("New price?")
    const toyToSave = { ...toy, price }

    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`toy updated to price: $${savedToy.price}`)
      })

      .catch((err) => {
        console.log("Cannot update toy", err)
        showErrorMsg("Cannot update toy")
      })
  }

  function onSetFilter(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
}

function onSetSort(sort) {
    setSort(sort)
}

  return (
    <div>
      <h3>Mister Toy App</h3>
      <main>
      <NavLink to="/toy/edit" className="btn-add">Add Toy</NavLink>
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <ToySort sort={sort} onSetSort={onSetSort} />
        <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
      </main>
    </div>
  )
}
