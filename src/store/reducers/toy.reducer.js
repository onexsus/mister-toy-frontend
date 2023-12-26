import { toyService } from "../../services/toy.service.js"


// toy
export const SET_TOYS = 'SET_TOYS'


export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    isLoading: false,
}

export function toyReducer(state = initialState, action = {}) {
    let toys
    let shoppingCart
    switch (action.type) {
        // toy
        case SET_TOYS:
            return { ...state, toys: action.toys }
        default:
            return state
    }
}
