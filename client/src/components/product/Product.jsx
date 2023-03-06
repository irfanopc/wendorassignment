import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItems from "./CartItems";

function Product() {
  const [cartItems, setCartItems] = useState([]);
  const id = window.localStorage.getItem("id");
  const navigator =useNavigate()
  const token = window.localStorage.getItem("token");
  console.log(id, token);
  console.log(cartItems);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/cartitems/${id}`)
  //     .then((data) => {
  //        //console.log(data);
  //       let user = data.data.cartitems;
  //       //console.log(user);
  //       const products = user.map((obj) => {
  //         return {
  //           products: obj.products.map((prop) => prop),
  //         };
  //       });

  //       products.map((data) => {
  //         let user = data.products;
  //         return setCartItems(user);
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`https://wendor-b4xi.onrender.com/cartitems/${id}`, config)
      .then((data) => {
        //console.log(data);
        let user = data.data.cartitems;
        //console.log(user);
        const products = user.map((obj) => {
          return {
            products: obj.products.map((prop) => prop),
          };
        });

        products.map((data) => {
          let user = data.products;
          return setCartItems(user);
        });
      })
      .catch((error) => {
        console.log(error);
        if (error) navigator("/login");
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://wendor-b4xi.onrender.com/deleteitem/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);

      // Remove the deleted item from the cartItems state
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error.response.data);
    }
  };

  //console.log(cartItems);
  return (
    <div>
      <h1>cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <h1>{cartItems.length} item(s) in cart</h1>
      )}

      {cartItems.map((item) => (
        <CartItems
          key={item._id}
          imageUrl={item.imageUrl}
          id={item._id}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Product;
