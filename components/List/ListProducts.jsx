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
import { padding } from 'tailwindcss-toggle'
import Radio from '@material-tailwind/react/Radio'
import { useRouter } from 'next/router'
import Dropdown from '@material-tailwind/react/Dropdown'
import DropdownItem from '@material-tailwind/react/DropdownItem'
import DropdownLink from '@material-tailwind/react/DropdownLink'
import SelectSearch from 'react-select-search'
import { filter } from 'next-pwa/cache'
const ListProducts = ({ color }) => {
  const router = useRouter()
  const [options, setOptions] = useState([])
  const [prods, setProds] = useState([])
  const [prod, setProd] = useState([])
  const [prod_actual, setProdActual] = useState([])
  const [unit_cost, setUnit_cost] = useState({
    unit_cost: '',
  })
  const [filterCategory, setFilterCategory] = useState([])
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
  const handleOption = (e) => {
    let value = e.currentTarget.value

    setFilterCategory(value)

    setFilterCategory({
      ...filterCategory,
      [e.target.name]: value,
    })

    console.log('catEE', filterCategory)
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

  const crearCategoria = () => {
    //  localStorage.removeItem('glob_token')
    setTimeout(() => {
      router.push('/admin/create_cat')
    }, 1000)
  }
  const crearProducto = () => {
    //  localStorage.removeItem('glob_token')
    setTimeout(() => {
      router.push('/admin/create_product')
    }, 1000)
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
        /* console.log(inven.products[index][j], 'i-->', index, 'j-->', j) */
        const element = inven.products[index][j]

        arr.push(element)
      }
    }
    setProds(arr)
    setCategory(inven.category)
  }

  const get_dataInventory = async () => {
    const options2 = []

    category.map((cate) => {
      options2.push(cate)

      console.log('Options', options)
    })
    setOptions(options2)
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

  useEffect(async () => {
    get_inventory()
    await get_dataInventory()
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1em',
          }}
        >
          <div>
            {/* <form action=""> */}
              <select name="" id="" onChange={handleOption}>
                <option value=''>all</option>
              {
                category?.map((i, id) => (
                  <>
                  <option value={i.name} key={id}>{i.name}</option>
                  </>
                ))
              }
              </select>
            {/* </form> */}
          </div>
          <select value={category}>
            {category.map((fbb) => (
              <option key={fbb} value={fbb}>
                {fbb.name}
              </option>
            ))}
            ;
          </select>
          <Button
            color='green'
            type='submit'
            onClick={crearProducto}
            ripple='light'
            rounded={false}
            block={false}
            iconOnly={false}
            style={{
              display: 'flex',
            }}
          >
            Agregar producto
            <Icon name='add' />
          </Button>

          <Button
            color='green'
            type='submit'
            onClick={crearCategoria}
            ripple='light'
            rounded={false}
            block={false}
            iconOnly={false}
            style={{
              display: 'flex',
            }}
          >
            Crear Categoria
            <Icon name='add' />
          </Button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
          }}
        >
          {prods.map((prod) => (
            <div
              style={{
                borderRadius: '6px',

                boxShadow: '0px 2px 4px rgba(0,0,0,0.4)',
                padding: '1em',
                margin: '1em',
              }}
            >
              <div>
                <img
                  src={prod.image}
                  /* className='bg-white rounded-md border'
                  alt='...'
                  width='100'
                  */
                  // objectFit='cover'
                  height='40px'
                />
              </div>
              <div className='content'>
                <p>{prod.name}</p>
                <p>{prod.stock} Disponibles</p>
                <p>{prod.unit_price} $</p>
              </div>
            </div>
          ))}

          {/* Projects table */}
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
