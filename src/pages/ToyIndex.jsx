

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilterBy  } from '../store/actions/toy.actions.js'
import {ToyList} from '../cmps/ToyList.jsx'


export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(() => {
                showErrorMsg('Cannot show toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove Toy', err)
                showErrorMsg('Cannot remove Toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`toy updated to price: $${savedToy.price}`)
            })

            .catch(err => {
                console.log('Cannot update toy', err)
                showErrorMsg('Cannot update toy')
            })
    }

        return (
        <div>
            <h3>Mister Toy App</h3>
            <main>
                <ToyList 
                toys={toys} 
                onRemoveToy={onRemoveToy}
                onEditToy={onEditToy}
                />
            </main>
        </div>
    )

}