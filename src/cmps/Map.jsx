import React from 'react'
import GoogleMapReact from 'google-map-react'
import { useState } from 'react'

function Marker() {
  return <div style={{ height: '1em', width: '1em', borderRadius: '50%', background: 'red' }}></div>
}

const API_KEY = 'AIzaSyB0dUlJsQSAuB636Yc1NGBUaJbwvYjfS1s'
export function Map() {
  const [center, setCenter] = useState({ lat: 32.794, lng: 34.9896 })
  const zoom = 10
  const branches = [
    {
      city: 'Haifa',
      id: 101,
      position: {
        lat: 32.794,
        lng: 34.9896,
      },
    },
    {
      city: 'Hadera',
      id: 102,
      position: {
        lat: 32.437408,
        lng: 34.925621,
      },
    },
    {
      city: 'Tel Aviv',
      id: 103,
      position: {
        lat: 32.0853,
        lng: 34.781769,
      },
    },
  ]

  return (
    <div>
      {branches.map((branch) => {
        return (
          <button key={branch.city} onClick={() => setCenter(branch.position)}>
            {branch.city}
          </button>
        )
      })}
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact bootstrapURLKeys={{ key: API_KEY }}  center={center} defaultZoom={zoom}>
          {branches.map((branch) => {
            return <Marker lat={branch.position.lat} lng={branch.position.lng} key={branch.id} />
          })}
        </GoogleMapReact>
      </div>
    </div>
  )
}
