import React, { useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import "./Home.css";
import { useNavigate } from "react-router-dom";
function Home() {
 const navigator = useNavigate()
  const [imageUrl, setImageUrl] = useState("");
  console.log(imageUrl);
  const username = window.localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const onAdd = async (e) => {
    // setCartItems([...cartItems,{imageUrl : e.target.src , id : cartItems.length+1}])
    setImageUrl(e.target.src);
    try {
      const response = await fetch("https://wendor-b4xi.onrender.com/addcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageUrl, username }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
      } else if (response.status === 401) {
        navigator ("/login") // Redirect to login page
      }
    } catch (error) {
      console.log(error);
    }
    //    setImageUrl(e.target.src)
    //     axios.post('/api/cartItems', cartItems)
    //   .then(response => {
    //     console.log(response);
    //     // handle successful response
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     // handle error
    //   });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="chair">
          <section id="image">
            <article className="offer">
              <div id="per"> {Math.floor(Math.random() * 91) + 10}% </div>
              <div id="edit">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8nL8PXHktRJ37ue94R0uEniaa5snb4y3gQA&usqp=CAU"
                  alt="edit"
                />
              </div>
            </article>
            <div className="main-image">
              <img
                src="https://wendor.in/wp-content/uploads/2020/08/photo_2020-08-10_17-12-57.jpg"
                alt="chair"
                onClick={onAdd}
              />
            </div>
          </section>
          <div id="name">beverage vending machine</div>
          <div id="id"></div>
        </div>
        <div className="chair">
          <section id="image">
            <article className="offer">
              <div id="per"> {Math.floor(Math.random() * 91) + 10}% </div>
              <div id="edit">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8nL8PXHktRJ37ue94R0uEniaa5snb4y3gQA&usqp=CAU"
                  alt="edit"
                />
              </div>
            </article>
            <div className="main-image">
              <img
                src="https://wendor.in/wp-content/uploads/2022/12/@work.webp"
                alt="image"
                onClick={onAdd}
              />
            </div>
          </section>
          <div id="name">smart vending machine</div>
          <div id="id"></div>
        </div>
        <div className="chair">
          <section id="image">
            <article className="offer">
              <div id="per"> {Math.floor(Math.random() * 91) + 10}% </div>
              <div id="edit">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8nL8PXHktRJ37ue94R0uEniaa5snb4y3gQA&usqp=CAU"
                  alt="edit"
                />
              </div>
            </article>
            <div className="main-image">
              <img
                src="https://wendor.in/wp-content/uploads/2020/05/mini-Homecenter.jpg"
                alt="image"
                onClick={onAdd}
              />
            </div>
          </section>
          <div id="name">smart vending machine</div>
          <div id="id"></div>
        </div>
        <div className="chair">
          <section id="image">
            <article className="offer">
              <div id="per"> {Math.floor(Math.random() * 91) + 10}% </div>
              <div id="edit">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8nL8PXHktRJ37ue94R0uEniaa5snb4y3gQA&usqp=CAU"
                  alt="edit"
                />
              </div>
            </article>
            <div className="main-image">
              <img
                src="https://wendor.in/wp-content/uploads/2022/12/@work.webp"
                alt="image"
                onClick={onAdd}
              />
            </div>
          </section>
          <div id="name">smart vending machine</div>
          <div id="id"></div>
        </div>
        <div className="chair">
          <section id="image">
            <article className="offer">
              <div id="per"> {Math.floor(Math.random() * 91) + 10}% </div>
              <div id="edit">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8nL8PXHktRJ37ue94R0uEniaa5snb4y3gQA&usqp=CAU"
                  alt="edit"
                />
              </div>
            </article>
            <div className="main-image">
              <img
                src="https://wendor.in/wp-content/uploads/2022/12/Wendor-Assets-900-%C3%97-900-px-3.png"
                alt="image"
                onClick={onAdd}
              />
            </div>
          </section>
          <div id="name">smart vending machine</div>
          <div id="id"></div>
        </div>
        <div className="chair">
          <section id="image">
            <article className="offer">
              <div id="per"> {Math.floor(Math.random() * 91) + 10}% </div>
              <div id="edit">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8nL8PXHktRJ37ue94R0uEniaa5snb4y3gQA&usqp=CAU"
                  alt="edit"
                />
              </div>
            </article>
            <div className="main-image">
              <img
                src="https://wendor.in/wp-content/uploads/2022/12/Wendor-Assets-900-%C3%97-900-px-4.png"
                alt="image"
                onClick={onAdd}
              />
            </div>
          </section>
          <div id="name">smart vending machine</div>
          <div id="id"></div>
        </div>
        <div className="chair">
          <section id="image">
            <article className="offer">
              <div id="per"> {Math.floor(Math.random() * 91) + 10}% </div>
              <div id="edit">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8nL8PXHktRJ37ue94R0uEniaa5snb4y3gQA&usqp=CAU"
                  alt="edit"
                />
              </div>
            </article>
            <div className="main-image">
              <img
                src="https://wendor.in/wp-content/uploads/2022/12/Wendor-Assets-900-%C3%97-900-px-3.png"
                alt="image"
                onClick={onAdd}
              />
            </div>
          </section>
          <div id="name">smart vending machine</div>
          <div id="id"></div>
        </div>
        <div className="chair">
          <section id="image">
            <article className="offer">
              <div id="per"> {Math.floor(Math.random() * 91) + 10}% </div>
              <div id="edit">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8nL8PXHktRJ37ue94R0uEniaa5snb4y3gQA&usqp=CAU"
                  alt="edit"
                />
              </div>
            </article>
            <div className="main-image">
              <img
                src="https://wendor.in/wp-content/uploads/2022/12/Wendor-Assets-900-%C3%97-900-px-1.png"
                alt="image"
                onClick={onAdd}
              />
            </div>
          </section>

          <div id="name">smart vending machine</div>
          <div id="id"></div>
        </div>
      </div>
    </>
  );
}

export default Home;
