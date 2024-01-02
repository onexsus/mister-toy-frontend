import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { LabelSelect } from './LabelSelect.jsx'
import { InStock } from './InStock.jsx'
import { SortBy } from './SortBy.jsx'
import { FilterInput } from './FilterInput.jsx'
import { utilService } from '../services/util.service.js'

export function ToyFilter({ filterBy, onSetFilter }) {
  const labels = useSelector((storeState) => storeState.toyModule.lables)
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  onSetFilter = useRef(utilService.debounce(onSetFilter))

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { byName, inStock, sortBy, byLable } = filterByToEdit
  return (
    <section className="toy-filter">
      <FilterInput handleChange={handleChange} byName={byName} />
      <LabelSelect
        handleChange={handleChange}
        labels={labels}
        byLable={byLable}
      />
      <InStock inStock={inStock} handleChange={handleChange} />
      <SortBy sortBy={sortBy} handleChange={handleChange} />
    </section>
  )
}
