import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import Button from '@material-tailwind/react/Button'
import Swal from 'sweetalert2'
export default function CardReport() {
  const showAlertSuccess = () => {
    Swal.fire({
      title: 'Reporte generado.',
      text: 'En la ruta de documentos',
      icon: 'success',
      button: 'Aceptar',
    })
  }

  const showAlertWarning = () => {
    Swal.fire({
      title: 'No se genero el reporte',
      text: 'Revisar.',
      icon: 'warning',
      button: 'Aceptar',
    })
  }
  const generate_report = async (e) => {
    e.preventDefault()
    await axios
      .get('http://localhost:4000/api/report/get-report', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
        },
      })
      .then(async (response) => {
        console.log('data', response)
        await showAlertSuccess()
      })
      .catch(async (e) => {
        //console.error(e)
        await showAlertWarning()
      })
  }

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex justify-between'>
            <h6 className='text-blueGray-700 text-xl font-bold'>Reporte</h6>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
          <form>
            <div className='w-full lg:w-6/12 px-4'></div>
            <ModalFooter>
              <Button
                className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                type='submit'
                onClick={generate_report}
              >
                Generar Reporte
              </Button>
            </ModalFooter>
          </form>

          <hr className='mt-6 border-b-1 border-blueGray-300' />
        </div>
      </div>
    </>
  )
}
