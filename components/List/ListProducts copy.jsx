import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { margin } from 'tailwindcss/defaultTheme'
import TableDropdown from 'components/Dropdowns/TableDropdown.js'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Modal from '@material-tailwind/react/Modal'
import ModalHeader from '@material-tailwind/react/ModalHeader'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import Swal from 'sweetalert2'
import axios from 'axios'

const ListProducts = ({ color }) => {
  const [prods, setProds] = useState([])
  const [prod, setProd] = useState([])
  const [prod_actual, setProdActual] = useState([])
  const [unit_cost, setUnit_cost] = useState({
    unit_cost: '',
  })
  const [unit_price, setUnit_price] = useState({
    unit_price: '',
  })
  const [name, setUnit_name] = useState({
    name: '',
  })
  const [expiration_date, setExpiration_date] = useState({
    expiration_date: '',
  })
  const [category, setCategory] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [quantity, setQuantity] = useState({
    quantity: '',
  })
  let arr = []
  const handleQuantityChange = (e) => {
    let value = e.target.value
    setQuantity({
      ...quantity,
      [e.target.name]: value,
    })
  }
  const handleExpiration_date = (e) => {
    let value = e.target.value
    setExpiration_date({
      ...expiration_date,
      [e.target.name]: value,
    })
  }
  const handleUnitcostChange = (e) => {
    let value = e.target.value
    setUnit_cost({
      ...unit_cost,
      [e.target.name]: value,
    })
  }

  const runOnCHange = (id) => console.log('idddd', id)

  const handleUnitnameChange = (id, e) => {
    console.log('el id', id)
    //console.log('ele', e.target.value)

    //product/id

    //objecto = reponse
    //setProducto(objeto)

    /*producto = {
      name: objeto.name,
      valor: obj.name
    }*/

    let myId = prods.filter((prod) => prod.id === id)
    console.log('myId', myId)

    //  defaultValue = producto.name
    let value = e.target.value
    setUnit_name({
      ...name,
      [e.target.name]: value,
    })
  }
  const handleUnitPriceChange = (e) => {
    let value = e.target.value
    setUnit_price({
      ...unit_price,
      [e.target.name]: value,
    })
  }
  const handleProductChange = (e) => {
    let value = e.currentTarget.value
    console.log('products', value)
    let arr
    setProd(value)
    setProd({
      ...prod,
      [e.target.name]: value,
    })
  }
  const showAlertSuccess = () => {
    Swal.fire({
      title: 'Producto actualizado.',
      text: 'Se actualizo el producto correctamente.',
      icon: 'success',
      button: 'Aceptar',
    })
  }

  const showAlertWarning = () => {
    Swal.fire({
      title: 'Algo salio mal',
      text: 'No se pudo actualizar.',
      icon: 'warning',
      button: 'Aceptar',
    })
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
    setProds(arr)
    setCategory(inven.category)
  }

  const update_product = async (e) => {
    const new_sale_product = {
      //   id: prod.prods,
      quantity: quantity.quantity,
      name: name.name,
      unit_cost: unit_cost.unit_cost,
      unit_price: unit_price.unit_price,
      expiration_date: expiration_date.expiration_date,
    }
    console.log('Actualizar productos:', new_sale_product, ':', prod.prods)
    e.preventDefault()
    await axios
      .put(
        `http://localhost:4000/api/products/update-product/${prod.prods}`,
        new_sale_product,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('glob_token')}`,
          },
        }
      )

      .then((response) => {
        console.log(response)
        showAlertSuccess()
        //router.push('/admin/sales')
      })
      .catch(async (e) => {
        await showAlertWarning()
      })
      .catch((e) => console.error(e))
    await get_inventory()
  }

  useEffect(() => {
    get_inventory()
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
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          (color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white')
        }
      >
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'></div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                >
                  Categoria
                </th>

                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                >
                  Nombre
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                >
                  Fecha de expiración
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                >
                  Disponible
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                >
                  Precio unitario
                </th>

                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                  }
                >
                  Costo Unitario
                </th>
                <th>
                  <Button
                    color='green'
                    buttonType='filled'
                    size='regular'
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple='light'
                    onClick={(event) => setShowModal(true)}
                  >
                    <Icon name='edit' size='sm' />
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {category.map((cate) => {
                return (
                  <>
                    <tr>
                      <p className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                        {cate.name}
                      </p>
                    </tr>
                    {prods.map((prod) => (
                      <>
                        {cate.id === prod.id_category && category.length > 0 ? (
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
                              {prod.stock}
                            </td>
                            <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                              {prod.unit_price}
                            </td>
                            <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-m whitespace-nowrap p-4'>
                              {prod.unit_cost}
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
          </table>
          <form>
            <Modal
              size='large'
              active={showModal}
              toggler={() => setShowModal(false)}
            >
              <ModalHeader toggler={() => setShowModal(false)}>
                Editar producto
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
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {prods?.map((index) => {
                    return (
                      <>
                        {index.id === parseInt(prod.prods) ? (
                          <>
                            <div className='relative w-full mb-3'>
                              <label
                                className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                htmlFor='quantity_sale'
                              >
                                Nombre
                              </label>
                              <input
                                id='name'
                                name='name'
                                defaultValue={index.name}
                                type='text'
                                className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-40 ease-linear transition-all duration-150'
                                onChange={handleUnitnameChange}
                                onClick={(e) => runOnCHange(index.id)}
                              />
                            </div>

                            {/*  <option value=''>{prods.quantity}</option> */}
                            <div className='relative w-full mb-3'>
                              <label
                                className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                htmlFor='quantity_sale'
                              >
                                Cantidad
                              </label>
                              <input
                                id='quantity'
                                name='quantity'
                                defaultValue={index.quantity}
                                type='text'
                                className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-40 ease-linear transition-all duration-150'
                                onChange={handleQuantityChange}
                              />
                            </div>
                            <div className='relative w-full mb-3'>
                              <label
                                className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                htmlFor='quantity_sale'
                              >
                                Costo unitario
                              </label>
                              <input
                                id='unit_cost'
                                name='unit_cost'
                                defaultValue={index.unit_cost}
                                type='text'
                                className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-40 ease-linear transition-all duration-150'
                                onChange={handleUnitcostChange}
                              />
                            </div>
                            <div className='relative w-full mb-3'>
                              <label
                                className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                htmlFor='quantity_sale'
                              >
                                Precio unitario
                              </label>
                              <input
                                id='unit_price'
                                name='unit_price'
                                defaultValue={index.unit_price}
                                type='text'
                                className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-40 ease-linear transition-all duration-150'
                                onChange={handleUnitPriceChange}
                              />
                            </div>
                            {/*  <div className='w-full lg:w-6/12 px-4'>
                              <div className='relative w-full mb-3'>
                                <label
                                  className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                                  htmlFor='expiration_date'
                                >
                                  Fecha de Vencimiento
                                </label>
                                <input
                                  id='expiration_date'
                                  type='date'
                                  name='expiration_date'
                                  defaultValue={index.expiration_date}
                                  className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                  onChange={handleExpiration_date}
                                />
                              </div>
                            </div> */}
                          </>
                        ) : (
                          console.log('mal')
                        )}
                      </>
                    )
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='red'
                  type='submit'
                  onClick={update_product}
                  ripple='light'
                >
                  Actualizar
                </Button>
              </ModalFooter>
            </Modal>
          </form>
        </div>
      </div>
    </>
  )
}

/**
 * return (
                <>
        <>
          <p className={(color === "light" ? "text-blueGray-700" : "text-white")}>
            {cate.name}
          </p>

          <br />
        </>
        {prods.map((prod) => (
          <>
            {cate.id === prod.id_category &&
              category.length > 0 ? (
                <div className="flex">
                  <div style={{ display: "flex", alignItems: "center", gap: "40px" }} className="shadow-lg p-5 flex-auto">
                    <div className="image">
                      <img
                        alt="product image"
                        className="shadow-md rounded-1"
                        src={prod.image}
                        width="150"
                        height="150"

                      />
                    </div>
                    <div className="content">

                      <p className={"text-lg text-black mt-4 font-semibold" +
                        (color === "light" ? "text-blueGray-700" : "text-white")
                      }>
                        {prod.name}
                      </p>
                      <p className={"text-lg text-black mt-4 font-semibold" +
                        (color === "light" ? "text-blueGray-700" : "text-white")
                      }>
                        {moment(prod.expiration_date).format("DD-MMMM-YYYY")}
                      </p>
                      <p className={"text-lg text-black mt-4 font-semibold" +
                        (color === "light" ? "text-blueGray-700" : "text-white")
                      }>
                        Cantidad  <strong>{prod.stock}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                console.log("jeje")
              )}
          </>
        ))}
        <hr />
      </>
              );
 */
export default ListProducts
