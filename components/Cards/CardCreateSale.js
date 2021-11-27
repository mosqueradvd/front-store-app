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
import moment from 'moment'
import TableDropdown from 'components/Dropdowns/TableDropdown.js'
import Icon from '@material-tailwind/react/Icon'
import Swal from 'sweetalert2'
import Radio from '@material-tailwind/react/Radio'

export default function CardCreateSale() {
  let arr = []
  const [sales_current, setSale_Current] = useState([])
  const [clients_current_sale, setClients_SaleCurrent] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [toggle, setToggle] = useState(true)
  const toggleClass = ' transform translate-x-5'
  const router = useRouter()
  const [clients, setClients] = useState([])
  const [client, setClient] = useState([])
  const [shopcar, setShopCar] = useState([])
  const [shopcardebt, setShopCarDebt] = useState([])
  const [prod, setProd] = useState([])
  const [prods, setProds] = useState([])
  const [status, setStatus] = useState(1)

  const [sale, setSale] = useState({
    status: status,
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
    let value = e.currentTarget.value
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
  const showAlertSuccess = () => {
    Swal.fire({
      title: 'Producto agregado al carrito.',
      text: 'El producto ha sido agregado a la venta actual.',
      icon: 'success',
      button: 'Aceptar',
    })
  }

  const showAlertWarning = () => {
    Swal.fire({
      title: 'Algo salio mal',
      text: 'No hay stock disponible.',
      icon: 'warning',
      button: 'Aceptar',
    })
  }
  const showAlertSuccess2 = () => {
    Swal.fire({
      title: 'Recibo generado.',
      text: 'En la ruta de documentos.',
      icon: 'success',
      button: 'Aceptar',
    })
  }

  const showAlertWarning2 = () => {
    Swal.fire({
      title: 'Algo salio mal',
      text: 'No hay stock disponible.',
      icon: 'warning',
      button: 'Aceptar',
    })
  }
  console.log('status', status)
  const getcurrentSale = async () => {
    const resp = await fetch(
      'http://localhost:4000/api/sales/get-currentsale',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
        },
      }
    )
    const data = await resp.json()
    console.log('Sales_current', data.sales)
    console.log('Clients_current', data.clients)
    setSale_Current(data.sales)
    setClients_SaleCurrent(data.clients)
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

  const get_shop_cart = async () => {
    const resp = await fetch('http://localhost:4000/products/shop-car', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
      },
    })
    const data = await resp.json()
    setShopCar(data.arr)
    console.log('shop_cart', data.arr)
    await getcurrentSale()
  }

  const get_shop_cart_debt = async () => {
    const resp = await fetch('http://localhost:4000/products/shop-car-debt', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
      },
    })
    const data = await resp.json()
    setShopCarDebt(data.arr)
    console.log('shop_cart', data.arr)
    await getcurrentSale()
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
      .then(async (response) => {
        console.log(response)
        await showAlertSuccess()
        //router.push('/admin/sales')
      })
      .catch(async (e) => {
        await showAlertWarning()
      })
    await get_shop_cart()
  }
  const create_sale_product_debt = async (e) => {
    const new_sale_product = {
      id_product: prod.prods,
      quantity_sale: quantity_sale.quantity_sale,
    }
    console.log('Ventas productos:', new_sale_product)
    e.preventDefault()
    await axios
      .post('http://localhost:4000/api/sales/sale_debt', new_sale_product, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
        },
      })
      .then(async (response) => {
        console.log(response)
        await showAlertSuccess()
        //router.push('/admin/sales')
      })
      .catch(async (e) => {
        await showAlertWarning()
      })
    await get_shop_cart_debt()
      .then((response) => {
        console.log('data', response)
        //router.push('/admin/sales')
      })
      .catch((e) => console.error(e))
  }

  const generate_report_sale = async (e) => {
    e.preventDefault()
    await axios
      .get('http://localhost:4000/api/report/get-report/receipt', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
        },
      })
      .then(async (response) => {
        console.log('data', response)
        await showAlertSuccess2()
      })
      .catch(async (e) => {
        //console.error(e)
        await showAlertWarning2()
      })
  }

  const generate_report_debt = async (e) => {
    e.preventDefault()
    await axios
      .get('http://localhost:4000/api/report/get-report/receipt-debt', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
        },
      })
      .then(async (response) => {
        console.log('data', response)
        await showAlertSuccess2()
      })
      .catch(async (e) => {
        //console.error(e)
        await showAlertWarning2()
      })
  }

  const create_sale = async (e) => {
    console.log('client', client.client)
    console.log('sale', sale)

    const new_sale = { id_client: client.client, ...sale }
    console.log('Sale', new_sale)
    e.preventDefault()
    await axios.post('http://localhost:4000/api/sales/sale', new_sale, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
      },
    })
    await getcurrentSale()
    await get_shop_cart()
    await get_shop_cart_debt()
      .then((response) => console.log('data', response))
      .catch((e) => console.error(e))
  }
  const delete_product_car = async (e) => {
    console.log('id_product_delete', e.currentTarget.id)
    e.preventDefault()
    await axios.delete(
      `http://localhost:4000/api/sales/delete_sale_product/${e.currentTarget.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
        },
      }
    )
    await get_shop_cart()
      .then((response) => {
        console.log('data', response)
        //router.push('/admin/sales')
      })
      .catch((e) => console.error(e))
  }

  const delete_debt_product = async (e) => {
    console.log('id_product_delete', e.currentTarget.id)
    e.preventDefault()
    await axios.delete(
      `http://localhost:4000/api/sales/delete_sale_debt/${e.currentTarget.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
        },
      }
    )
    await get_shop_cart_debt()
      .then((response) => {
        console.log('data', response)
        //router.push('/admin/sales')
      })
      .catch((e) => console.error(e))
  }

  useEffect(async () => {
    get_clients()
    get_inventory()
    await get_shop_cart()
    await get_shop_cart_debt()
    await getcurrentSale()
  }, [])

  return (
    <>
      <link
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
        rel='stylesheet'
      />

      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css'
        integrity='sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=='
        crossOrigin='anonymous'
      />
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
                    <option value=''>Seleccione Cliente</option>
                    {clients?.map((i, idx) => (
                      <option key={idx} value={i.id}>
                        {i.name} {i.lastname}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  style={{
                    display: 'flex',
                    marginBottom: '20px',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Radio
                    style={{}}
                    color='lightBlue'
                    text='Venta'
                    id='venta'
                    name='option'
                    onClick={() => setStatus(1)}
                  />

                  <Radio
                    color='lightBlue'
                    text='Fiado'
                    id='fiado'
                    name='option'
                    onClick={() => setStatus(0)}
                  />
                </div>
              </div>
            </div>
            {/*  <Toggle /> */}
            {/* <div className='relative w-full mb-3'>
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
            </div> */}
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

            <>
              <label
                className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                htmlFor='quantity_sale'
              >
                Venta Actual
              </label>
              <tbody>
                {sales_current.map((sale) => {
                  return (
                    <>
                      {clients_current_sale.map((cli) => (
                        <>
                          {sale.id_client === cli.id &&
                          sales_current.length > 0 ? (
                            <tr>
                              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                                {cli.name} {cli.lastname}
                              </td>

                              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                                {sale.description}
                              </td>
                              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                                {moment(sale.date_sale).format('DD-MMM-YYYY')}
                              </td>
                              {sale.total_sale > 0 ? (
                                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                                  ${sale.total_sale}
                                </td>
                              ) : (
                                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                                  ${sale.total_debt}
                                </td>
                              )}

                              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                                {cli.phone}
                              </td>
                              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right'>
                                <TableDropdown />
                              </td>
                            </tr>
                          ) : (
                            console.log('jeje')
                          )}
                        </>
                      ))}
                    </>
                  )
                })}
              </tbody>

              {shopcar.length > 0
                ? shopcar.map((prod) => (
                    <>
                      <table className='items-center w-full bg-transparent border-collapse'>
                        <thead>
                          <tr>
                            {/*    <th className='px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left '></th>

                        <th className='px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left '>
                          Producto
                        </th>
                        <th className='px-6 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left '>
                          Producto
                        </th> */}
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <th className='border-t-1 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center'>
                              <img
                                src={prod.image}
                                className='bg-white rounded-md border'
                                alt='...'
                                width='150'
                                height='100'
                              />
                            </th>

                            <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                              {prod.name}
                            </td>

                            <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                              {moment(prod.expiration_date).format(
                                'DD-MMM-YYYY'
                              )}
                            </td>
                            <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                              {'$ ' + prod.price_sale}
                            </td>

                            <td>
                              <Button
                                color='red'
                                buttonType='filled'
                                size='regular'
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple='light'
                                onClick={(event) => delete_product_car(event)}
                                id={prod.id_carproduct}
                              >
                                <Icon name='delete' size='sm' />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  ))
                : shopcardebt.map((prod) => (
                    <>
                      <table className='items-center w-full bg-transparent border-collapse'>
                        <thead>
                          <tr>
                            {/*    <th className='px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left '></th>

                        <th className='px-6 align-middle py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left '>
                          Producto
                        </th>
                        <th className='px-6 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left '>
                          Producto
                        </th> */}
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <th className='border-t-1 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center'>
                              <img
                                src={prod.image}
                                className='bg-white rounded-md border'
                                alt='...'
                                width='150'
                                height='100'
                              />
                            </th>

                            <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                              {prod.name}
                            </td>

                            <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                              {moment(prod.expiration_date).format(
                                'DD-MMM-YYYY'
                              )}
                            </td>
                            <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                              {'$ ' + prod.price_sale}
                            </td>

                            <td>
                              <Button
                                color='red'
                                buttonType='filled'
                                size='regular'
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple='light'
                                onClick={(event) => delete_debt_product(event)}
                                id={prod.id_carproduct}
                              >
                                <Icon name='delete' size='sm' />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  ))}
            </>

            <Button
              className='bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
              type='submit'
              onClick={(e) => setShowModal(true)}
            >
              Crear Venta
            </Button>
            <ModalFooter>
              {status === 1 ? (
                <Button
                  color='green'
                  type='submit'
                  onClick={generate_report_sale}
                  ripple='light'
                >
                  Generar recibo
                </Button>
              ) : (
                <Button
                  color='red'
                  type='submit'
                  onClick={generate_report_debt}
                  ripple='light'
                >
                  Generar recibo
                </Button>
              )}
            </ModalFooter>
          </form>
          <form>
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
                  <div className='w-full lg:w-px-4'>
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
                        <option>Seleccione</option>
                        {prods?.map((i, idx) => (
                          <option key={idx} value={i.id}>
                            {i.name} - ${i.unit_price}
                          </option>
                        ))}
                      </select>
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
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-40 ease-linear transition-all duration-150'
                      onChange={handleQuantityChange}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                {status === 1 ? (
                  <Button
                    color='green'
                    type='submit'
                    onClick={create_sale_product}
                    ripple='light'
                  >
                    Agregar producto
                  </Button>
                ) : (
                  <Button
                    color='red'
                    type='submit'
                    onClick={create_sale_product_debt}
                    ripple='light'
                  >
                    Fiado
                  </Button>
                )}
              </ModalFooter>
            </Modal>
          </form>
          <hr className='mt-6 border-b-1 border-blueGray-300' />
        </div>
      </div>
    </>
  )
}
