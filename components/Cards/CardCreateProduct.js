import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// components
export default function CardCreateProduct() {
  const router = useRouter();

  const [initProduct, setInitProduct] = useState({
    name: "",
    quantity: "",
    unit_cost: "",
    unit_price: "",
    expiration_date: "",
  })

  const [image, setImage] = useState();
  const [imageInput, setImageInput] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [supp, setSupp] = useState([]);
  const [id, setId] = useState(null);
  const [category, setCategory] = useState({
    category: ""
  })

  const handleSelectChange = (e) => {
    let value = e.target.value
    console.log('cat', value)

    setId(value)

    setCategory({
      ...category,
      [e.target.name]: value
    })
  }

  const handleSupChange = (e) => {
    let value = e.target.value
    console.log('supp', value)
    setSupp(value)

    setSupp({
      ...supp,
      [e.target.name]: value
    })
  }

  useEffect(() => {
    const img = document.querySelector("#image");
    setImageInput(img);

    get_inventory();
    get_suppliers()
  }, []);

  const handleChange = (e) => {
    setInitProduct({
      ...initProduct,
      [e.target.name]: e.target.value,
    });
  };

  const get_suppliers = async () => {
    const resp = await fetch("http://localhost:4000/api/supplier/get-supplier", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("glob_token")}`
      }
    })
    const data = await resp.json()
    setSuppliers(data.suppliers)
    console.log('supps', data)
  }

  const imgToS3 = async (e) => {
    e.preventDefault();

    const file = imageInput.files[0];

    // get secure url from our server
    const { url } = await fetch("http://localhost:4000/s3Url").then((res) =>
      res.json()
    );

    setImage(url.split("?")[0]);

    // post the image direclty to the s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    }).then(async () => {
      console.log("set image !!!!", image);
      const imageUrl = url.split("?")[0];
      await create_product(imageUrl);
      router.push("/admin/products");
    });

    // wait for aws response & get the img url


    // console.log("imageUrl !!!!!", imageUrl);

    // post requst to my server to store any extra data
  };

  const get_inventory = async () => {
    const resp = await fetch(
      "http://localhost:4000/api/inventory/get-inventory",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("glob_token")}`,
        },
      }
    );
    const inven = await resp.json();

    setInventory(inven.category);
    console.log("inven", inven.category);
  };

  const create_product = async (image) => {
    const new_product = { id_category: id, ...initProduct, image };
    console.log("newprod", new_product);
    // await imgToS3();

    await axios
      .post("http://localhost:4000/products/create-products", new_product, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("glob_token")}`,
        },
      })
      .then((data) => {
        console.log("data", data);
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Crea productos
            </h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Ajustes
            </button>
          </div>
          <img src={image}></img>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={imgToS3}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Información del producto
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    Selecciona la Categoría
                  </label>
                  <select
                    id="category"
                    name="category"
                    type="select"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleSelectChange}
                  >
                    {inventory.map((i, idx) => (
                        <option key={idx} value={i.id}>{i.name}</option>
                    ))}
                  </select>
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="supplier"
                  >
                    Selecciona el Proveedor
                  </label>
                  <select
                    id="supplier"
                    name="supplier"
                    type="select"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleSupChange}
                  >
                    {suppliers.map((i, idx) => (
                        <option key={idx} value={i.id}>{i.name} {i.lastname}</option>
                    ))}
                  </select>
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    Nombre del producto
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="unit_cost"
                  >
                    Costo Unitario
                  </label>
                  <input
                    id="unit_cost"
                    type="number"
                    name="unit_cost"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="quantity"
                  >
                    Cantidad
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="unit_price"
                  >
                    Precio Unitario
                  </label>
                  <input
                    id="unit_price"
                    type="number"
                    name="unit_price"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleChange}
                    placeholder="1000"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="expiration_date"
                  >
                    Fecha de Vencimiento
                  </label>
                  <input
                    id="expiration_date"
                    type="date"
                    name="expiration_date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleChange}
                    defaultValue="2021-24-09"
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="image"
                  >
                    Foto del Producto
                  </label>
                  <input
                    id="image"
                    type="file"
                    name="image"
                    accept="image/*"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleChange}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>

            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Crear producto
            </button>

            <hr className="mt-6 border-b-1 border-blueGray-300" />
          </form>
        </div>
      </div>
    </>
  );
}
