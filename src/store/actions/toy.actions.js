/* eslint-disable no-undef */
import { toyService } from "../../services/toy.service";
import { SET_TOYS, SET_IS_LOADING, REMOVE_TOY, TOY_UNDO, UPDATE_TOY, ADD_TOY, SET_FILTER } from "../reducers/toy.reducer";
import { store } from "../store";



export async function loadToys() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const filterBy = store.getState().toyModule.filterBy
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
        return toys
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

// Demo for Optimistic Mutation 
// ( Assuming the server call will work, so updating the UI first)
export async function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    try {
        await toyService.remove(toyId)
    } catch (err) {
        store.dispatch({ type: TOY_UNDO })
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (error) {
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export async function saveToy(toyToSave) {
    const type = toyToSave._id ? UPDATE_TOY : ADD_TOY
    try {
        const toy = await toyService.save(toyToSave)
        store.dispatch({ type, toy })
        return toy
    } catch (err) {
        console.log('toy action -> Cannot save toy', err)
        throw err
    }
}

export function setFilter(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}

// export function AddMsgToToy(toyId , msg) {
//     return toyService.addMsg(toyId, msg)
//         .then((savedMsg) => {
//             store.dispatch({ type: ADD_MSG_TO_TOY, toyId, savedMsg })
//             // store.dispatch({ type: UPDATE_TOY, toy })
//             return savedMsg
//         })
//         .catch(err => {
//             console.log('toy action -> Cannot save toy', err)
//             throw err
//         })
// }
