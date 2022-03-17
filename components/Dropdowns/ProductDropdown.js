import React from 'react'
import { createPopper } from '@popperjs/core'
import { useRouter } from 'next/router'

const ProductDropdown = () => {
  const router = useRouter()
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false)
  const btnDropdownRef = React.createRef()
  // dropdown props
  const popoverDropdownRef = React.createRef()
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    })
    setDropdownPopoverShow(true)
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
  }
  const crearProducto = () => {
    //  localStorage.removeItem('glob_token')
    setTimeout(() => {
      router.push('/admin/create_product')
    }, 1000)
  }
  const crearCategoria = () => {
    //  localStorage.removeItem('glob_token')
    setTimeout(() => {
      router.push('/admin/create_cat')
    }, 1000)
  }
  const consultaProducto = () => {
    //  localStorage.removeItem('glob_token')
    setTimeout(() => {
      router.push('/admin/products')
    }, 1000)
  }
  return (
    <>
      <a
        className='text-blueGray-500 block'
        href='#pablo'
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault()
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
        }}
      >
        <a
          href='#pablo'
          className={
            'text-xs uppercase py-3 font-bold block ' +
            (router.pathname.indexOf('/admin/dashboard') !== -1
              ? 'text-lightBlue-500 hover:text-lightBlue-600'
              : 'text-blueGray-700 hover:text-blueGray-500')
          }
        >
          <i
            className={
              'fas fa-tv mr-2 text-sm ' +
              (router.pathname.indexOf('/admin/dashboard') !== -1
                ? 'opacity-75'
                : 'text-blueGray-300')
            }
          ></i>{' '}
          Producto
        </a>
      </a>
      <div
        ref={popoverDropdownRef}
        className={dropdownPopoverShow ? 'block ' : 'hidden '}
      >
        {/*  <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a> */}
        <div className='h-0 my-2 border border-solid border-blueGray-100' />

        <ui>
          <li>
            <a
              href='#pablo'
              className={
                'text-blue py-2 px-4 font-normal block w-full whitespace-nowrap bg-200 text-white-700 ' +
                'bg-blue-500 hover:bg-blue-700 text-white font-bold'
              }
              onClick={crearProducto}
            >
              Crear Producto
            </a>
          </li>
          <li>
            <a
              href='#pablo'
              className={
                'text-white py-2 px-4 font-normal block w-full whitespace-nowrap bg-200 text-white-700 ' +
                'bg-blue-500 hover:bg-blue-700 text-white font-bold'
              }
              onClick={consultaProducto}
            >
              Consultar Producto
            </a>
          </li>
          <li>
            <a
              href='#pablo'
              className={
                'text-white py-2 px-4 font-normal block w-full whitespace-nowrap bg-200 text-white-700 ' +
                'bg-blue-500 hover:bg-blue-700 text-white font-bold'
              }
              onClick={crearCategoria}
            >
              Crear Categoria
            </a>
          </li>
        </ui>
      </div>
    </>
  )
}

export default ProductDropdown
