// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"


export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)
    
    function changeCount(diff) {
        console.log('Changing count by:', diff)
        dispatch({ type: 'CHANGE_BY', diff })
    }

    return (
        <section className="full hero-section">
            <div className="hero-bg">
                {/* <img src="" alt="" /> */}
            </div>
          <div className="hero-intro flex flex-column ">
          <h1>Welcome to Our Toy Store<br/>Where Every Dream Takes Flight!</h1>
          <p>Dive into our collection and find toys that spark imagination, foster learning, and bring heaps of fun to kids of all ages. From classic treasures to the latest innovations, there's something here to enchant every child.</p>
        <NavLink className="btn" to="/toy" >Go To Store</NavLink>
          </div>
        </section >
    )
}