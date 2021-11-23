import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

// components
export default function CardCreateCategory() {
  const [category, setCategory] = useState({
    name: '',
  })

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    })
  }

  const showAlertSuccess = () => {
    Swal.fire({
      title: 'Categoria Registrada.',
      text: 'La categoria ha sido registrada correctamente.',
      icon: 'success',
      button: 'Aceptar',
    })
  }

  const showAlertWarning = () => {
    Swal.fire({
      title: 'Algo salio mal',
      text: 'La categoria no pudo ser registrada en la tienda.',
      icon: 'warning',
      button: 'Aceptar',
    })
  }

  const create_category = async (e) => {
    e.preventDefault()
    await axios
      .post('http://localhost:4000/inventory/create-category', category, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
        },
      })
      .then((response) => {
        showAlertSuccess()
      })
      .catch((e) => {
        showAlertWarning()

        console.error(e)
      })
  }

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex justify-between'>
            <h6 className='text-blueGray-700 text-xl font-bold'>
              Crea una Categoría
            </h6>
            <button
              className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              type='button'
            >
              Ajustes
            </button>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
          <form onSubmit={create_category}>
            <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              Información de la Categoria
            </h6>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='name'
                  >
                    Nombre de la Categoria
                  </label>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    onChange={handleChange}
                    defaultValue='Despensa'
                  />
                </div>
              </div>
            </div>

            <button
              className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              type='submit'
            >
              Crear Categoría
            </button>

            <hr className='mt-6 border-b-1 border-blueGray-300' />
          </form>
        </div>
      </div>
    </>
  )
}
