import { useDispatch, useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect } from 'react'
import { loadToys, removeToyOptimistic, setFilter } from '../store/actions/toy.actions'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { Link } from 'react-router-dom'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)

  useEffect(() => {
    loadToys()
  }, [filterBy])

async function onRemoveToy(toyId) {
  try {
    await removeToyOptimistic(toyId)
    showSuccessMsg('Toy removed')
  } catch (err) {
    console.log('Cannot remove toy', err)
    showErrorMsg('Cannot remove toy')
  }
}

function onSetFilter(filterBy) {
  setFilter(filterBy)
}

  return (
    <div>
      <h2>Mister Toy Store</h2>
      <main>
      <section className="filter-container">
          {user && user.isAdmin && (
            <button className="add-btn">
              <Link to="/toy/edit">Add toy 🧸</Link>
            </button>
          )}
          <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        </section>
        {!isLoading && (
          <ToyList toys={toys} user={user} onRemoveToy={onRemoveToy} />
        )}
        {isLoading && <div>Loading...</div>}
      </main>
    </div>
  )
}
