import React, { useState, useEffect } from 'react'
import Button from '@material-tailwind/react/Button'
import axios from 'axios'
import { useRouter } from 'next/router'
import Toggle from './Toggle'
import Checkbox from '@material-tailwind/react/Checkbox'
import Modal from '@material-tailwind/react/Modal'
import ModalHeader from '@material-tailwind/react/ModalHeader'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'

export default function CardCreateSale() {
  let arr = []
  const [showModal, setShowModal] = useState(false)
  const [toggle, setToggle] = useState(true)
  const toggleClass = ' transform translate-x-5'
  const router = useRouter()
  const [clients, setClients] = useState([])
  const [client, setClient] = useState([])
  const [prod, setProd] = useState([])
  const [prods, setProds] = useState([])
  const [sale, setSale] = useState({
    status: '',
    description: '',
  })
  const [quantity_sale, setQuantity] = useState({
    quantity_sale: '',
  })
  const handleQuantityChange = (e) => {
    let value = e.target.value
    setQuantity({
      ...quantity_sale,
      [e.target.name]: value,
    })
  }
  const handleClientChange = (e) => {
    let value = e.target.value
    console.log('client', value)
    setClient(value)

    setClient({
      ...client,
      [e.target.name]: value,
    })
  }

  const handleProductChange = (e) => {
    let value = e.target.value
    console.log('products', value)
    setProd(value)

    setProd({
      ...prod,
      [e.target.name]: value,
    })
  }
  const handleSaleChange = (e) => {
    let value = e.target.value
    setSale({
      ...sale,
      [e.target.name]: value,
    })
  }

  const get_clients = async () => {
    const resp = await fetch('http://localhost:4000/client/get-client', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
      },
    })
    const data = await resp.json()
    setClients(data.client)
    console.log('clients', data.client)
  }

  const get_inventory = async () => {
    const resp = await fetch(
      'http://localhost:4000/api/inventory/get-inventory',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
        },
      }
    )
    const inven = await resp.json()

    for (let index = 0; index < inven.products.length; index++) {
      for (let j = 0; j < inven.products[index].length; j++) {
        console.log(inven.products[index][j], 'i-->', index, 'j-->', j)
        const element = inven.products[index][j]

        arr.push(element)
      }
    }
    console.log(arr)
    setProds(arr)
    /* setCategory(inven.category) */
  }

  const create_sale_product = async (e) => {
    const new_sale_product = {
      id_product: prod.prods,
      quantity_sale: quantity_sale.quantity_sale,
    }
    console.log('Ventas productos:', new_sale_product)
    e.preventDefault()
    await axios
      .post('http://localhost:4000/api/sales/sale_product', new_sale_product, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
        },
      })
      .then((response) => {
        console.log('data', response)
        router.push('/admin/sales')
      })
      .catch((e) => console.error(e))
  }

  const create_sale = async (e) => {
    console.log('client', client.client)
    console.log('sale', sale)

    const new_sale = { id_client: client.client, ...sale }
    console.log('Sale', new_sale)
    e.preventDefault()
    await axios
      .post('http://localhost:4000/api/sales/sale', new_sale, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
        },
      })
      .then((response) => console.log('data', response))
      .catch((e) => console.error(e))
  }

  useEffect(() => {
    get_clients()
    get_inventory()
  }, [])

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex justify-between'>
            <h6 className='text-blueGray-700 text-xl font-bold'>Crear Venta</h6>
            <button
              className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              type='button'
            >
              Ajustes
            </button>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
          <form onSubmit={create_sale}>
            <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
              Información de la venta
            </h6>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='client'
                  >
                    Selecciona el Cliente
                  </label>
                  <select
                    id='client'
                    name='client'
                    type='select'
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    onChange={handleClientChange}
                  >
                    {clients?.map((i, idx) => (
                      <option key={idx} value={i.id}>
                        {i.name} {i.lastname}
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
                Estado
              </label>
              <input
                id='status'
                name='status'
                type='number'
                className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                onChange={handleSaleChange}
              />
            </div>
            <div className='relative w-full mb-3'>
              <label
                className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                htmlFor='name'
              >
                Descripcion
              </label>
              <input
                id='description'
                name='description'
                type='text'
                className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                onChange={handleSaleChange}
              />
            </div>
            <Button
              className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              type='submit'
              onClick={(e) => setShowModal(true)}
            >
              Crear venta
            </Button>
          </form>
          <form onSubmit={create_sale_product}>
            <Modal
              size='large'
              active={showModal}
              toggler={() => setShowModal(false)}
            >
              <ModalHeader toggler={() => setShowModal(false)}>
                Informacion de la venta
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                        htmlFor='prods'
                      >
                        Selecciona el producto
                      </label>
                      <select
                        id='prods'
                        name='prods'
                        type='prods'
                        className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        onChange={handleProductChange}
                      >
                        {prods?.map((i, idx) => (
                          <option key={idx} value={i.id}>
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='quantity_sale'
                  >
                    Cantidad
                  </label>
                  <input
                    id='quantity_sale'
                    name='quantity_sale'
                    type='text'
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    onChange={handleQuantityChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='red'
                  buttonType='link'
                  onClick={(e) => setShowModal(false)}
                  ripple='dark'
                >
                  Close
                </Button>

                <Button color='green' type='submit' ripple='light'>
                  Save Changes
                </Button>
              </ModalFooter>
            </Modal>
          </form>
          <hr className='mt-6 border-b-1 border-blueGray-300' />
        </div>
      </div>
    </>
  )
}
