import React from 'react'

export default function filteredProducts({products, filter}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',

      }}
    >
      {
        products?.filter((prod => filter.category == prod.id_category)).map(
          (filtered, index) => (
            <div
              style={{
                borderRadius: '6px',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.4)',
                padding: '1em',
                margin: '1em',
                width: '280px'
              }}
              key={index}
            >
              <div>
                <img
                  src={filtered.image}
                  height='100px'
                />
              </div>
              <div className='content'>
                <p>{filtered.name}</p>
                <p>{filtered.stock} Disponibles</p>
                <p>{filtered.unit_price} $</p>
              </div>
            </div>
          )
        )
      }

    </div>
  )
}
