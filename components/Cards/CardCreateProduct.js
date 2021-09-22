import React, { useState, useEffect } from "react";
import axios from "axios";

// components
export default function CardCreateProduct() {
  const [initProduct, setInitProduct] = useState({
    name: "",
    quantity: "",
    unit_cost: "",
    unit_price: "",
    expiration_date: "",
  });

  const [image, setImage] = useState();
  const [imageInput, setImageInput] = useState(null);

  useEffect(() => {
    const img = document.querySelector("#image");
    setImageInput(img);
  }, []);

  const handleChange = (e) => {
    setInitProduct({
      ...initProduct,
      [e.target.name]: e.target.value,
    });
  };

  const imgToS3 = async (e) => {
    e.preventDefault();

    const file = imageInput.files[0];

    // get secure url from our server
    const { url } = await fetch("http://localhost:4000/s3Url").then((res) =>
      res.json()
    );

    // post the image direclty to the s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    })
      .then((response) => {
        console.log('rspns', response)
        create_product(image)
      });

    // wait for aws response & get the img url

    const imageUrl = url.split("?")[0];
    setImage(imageUrl)
    console.log("imageUrl", imageUrl);

    // post requst to my server to store any extra data
  };

  const create_product = async (image) => {
    const new_product = { ...initProduct, image };
    console.log("newprod", new_product);
    // await imgTos3();

    // await axios
    //   .post("http://localhost:4000/products/create-products", new_product, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${localStorage.getItem("glob_token")}`,
    //     },
    //   })
    //   .then((data) => console.log("data", data))
    //   .catch((e) => console.error(e));
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
          <img src="https://online-store-s3.s3.us-east-2.amazonaws.com/6a9966aaa1557f14360144508f430fa6.jpg"></img>
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
                    defaultValue="500"
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
                    defaultValue="1000"
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
