import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router'


function Payment() {
  const router = useRouter()
  const [debts, setDebts] = useState([])
  const [debt, setDebt] = useState([])
  const [pay, setPay] = useState({
    valuePayment:''
  })

  const handlePaymentChange = (e) => {
    let value = e.target.value
    setPay({
      ...pay,
      [e.target.name]: value,
    })
  }

  const handleDebtChange = (e) => {
  let value = e.target.value
  console.log('Debt', value)
    setDebt(value)

    setDebt({
      ...debt,
      [e.target.name]: value,
    })
  }
  const getDebts = async () => {
    const resp = await fetch('http://localhost:4000/api/sales/get-debts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
      },
    })
    const data = await resp.json()
    setDebts(data.Debt)
   
  }
  const createNewPayment = async(e) =>{
    console.log('los debts',debt)
    const newPay = {
      id_debt: debt.debt,
      payment: parseInt(pay.valuePayment)
    }
    console.log('Pay',newPay)
    e.preventDefault()

    await axios
    .post('http://localhost:4000/api/sales/payment', newPay, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
      },
    })
    .then((response) => {
      console.log('data', response)
      router.push('/admin/debts')
    })
    .catch((e) => console.error(e))
  }
  useEffect(() => {
    getDebts()
  }, [])
  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex justify-between'>
            <h6 className='text-blueGray-700 text-xl font-bold'>Crear Abono a la Deuda</h6>
            <button
              className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              type='button'
            >
              Ajustes
              </button>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
          <form onSubmit={createNewPayment}>
            <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              Información del abono
              </h6>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='debt'
                  >
                    Selecciona la deuda
                    </label>
                  <select
                    id='debt'
                    name='debt'
                    type='select'
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    onChange={handleDebtChange}
                  >
                    {debts?.map((i, idx) => (
                      <option key={idx} value={i.id}>
                        {moment(i.date_sale).format("DD-MMM-YYYY")} - {i.description} - {i.total_debt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/*  <Toggle /> */}
            <div className='relative w-full mb-3'>
              <label
                className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                htmlFor='name'
              >
                Valor
                </label>
              <input
                id='valuePayment'
                name='valuePayment'
                type='text'
                className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
               onChange={handlePaymentChange}
              />
            </div>
            <button
              className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              type='submit'
              
            >
              Crear venta
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Payment
