import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { saveToy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const imgsToy= toyService.getToyImg()

export function ToyEdit() {
  const labels = useSelector((storeState) => storeState.toyModule.lables)
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!toyId) return
    toyService.getById(toyId).then((toy) => {
      setToyToEdit(toy)
    })
  }, [])

  function handleChange(ev) {
    const field = ev.target.name
    let value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
    if (ev.target.type === 'select-multiple')
      value = Array.from(ev.target.selectedOptions, (option) => option.value)
    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
  }

  function onSave(ev) {
    ev.preventDefault()

    const newToy = {
      ...toyToEdit,
      inStock: toyToEdit.inStock === 'true' ? true : false,
    }

    saveToy(newToy)
      .then(() => {
        showSuccessMsg('Toy saved successfully')
        navigate('/toy')
      })
      .catch((err) => {
        showErrorMsg('Can not save toy, please try again')
      })
  }

  function getYesNo() {
    return toyToEdit.inStock
  }

  if (!toyToEdit) return <div>Loading...</div>
  return (
    <section className='edit-continer'>
      <h1 className='title'>Toy Edit</h1>
    <form onSubmit={onSave} className='edit-form' action=''>
      <div>
        <label className='flex justify-between'>
          <span>Name :</span>
          <input
            className='edit-input name-input'
            value={toyToEdit.name}
            onChange={handleChange}
            type='text'
            name='name'
          />
        </label>
      </div>
      <div>
        <label className='flex justify-between'>
          <span>Price :</span>
          <input
            className='edit-input price-input'
            value={toyToEdit.price}
            onChange={handleChange}
            type='number'
            name='price'
          />
        </label>
      </div>
      <div>
        <label  className='flex justify-between'>
          <span>Labels :</span>
        <select
          multiple
          value={toyToEdit.labels || []}
          onChange={handleChange}
          name='labels'
          className='edit-input'
          >
          <option value={'all'}>All</option>
          <>
            {labels.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </>
        </select>
            </label>
      </div>
      <div>
        <label  className='flex justify-between'>
        <span>Image : </span>
        <select
        value={toyToEdit.url || imgsToy[1].url}
        onChange={handleChange}
        name='url'
        className='edit-input'
        >

          <>
            {imgsToy.map((img) => (
              <option key={img.name} value={img.url}>
                {img.name}
              </option>
            ))}
          </>
        </select>
        </label>
      </div>
      <div>
        <label  className='flex justify-between'>
          <span> Stock :</span>
        <select
          value={getYesNo() || '1'}
          onChange={handleChange}
          name='inStock'
          className='edit-input'
        >
          <option value={'1'} disabled>
            In Stock
          </option>
          <option value='true'>Yes</option>
          <option value='false'>No</option>
        </select>
        </label>
      </div>
      <button onClick={onSave} className='save-toy-btn'>
        Save
      </button>
    </form>
      <div className='flex  flex-column toy-prev-edit'>
        <div><img src={toyToEdit.url || imgsToy[1].url}/></div>
        <div><img src=''/></div>
        <h3>{toyToEdit.name}</h3>
        <h3>Price : {toyToEdit.price}$</h3>
        <button>Add To Cart</button>
        <button>Details</button>
      </div>
    </section>
  )
}
