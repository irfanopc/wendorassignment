function CartItems({ id, imageUrl, onDelete }) {
    const taskID = id;
  
    return (
      <div className="chair">
        <section id="image">
          <article className="offer">
            <div id="per">{Math.floor(Math.random() * 91) + 10}%</div>
            <div id="edit">
              <img
                src="https://www.svgrepo.com/show/21045/delete-button.svg"
                alt="delete"
                onClick={() => onDelete(taskID)}
              />
            </div>
          </article>
          <div className="main-image">
            <img src={imageUrl} alt="image" />
          </div>
        </section>
        <div id="name">beverage vending machine</div>
        <div id="id"></div>
      </div>
    );
  }
  

export default CartItems