import React, { useState, useRef, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { useDispatchCart, useCart } from './ContextReducer';
const Cards = (props) => {

  let dispatch = useDispatchCart();
  const data = useCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const sizeRef = useRef();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  //  object.key is a js inbuilt function jo ki object me se key ki array nikal k de deta h
  //  aur hme pata h ki options ek object hai key - value ka
  const handleCart = async () => {

    let food = []
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;

        break;
      }
    }
    
    if (food !==[]) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size, img: props.foodItems.img })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size })



  }
  const finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(sizeRef.current.value);
  }, [])
  return (
    <div>
      <Card style={{ width: '18rem', border: "2px solid black , " }}>
        <Card.Img variant="top" src={props.foodItems.img} style={{ height: "140px", objectFit: "fill" }} />
        <Card.Body>
          <Card.Title>{props.foodItems.name}</Card.Title>
          <Card.Text>
            Some quick example text
          </Card.Text>
          <div className='container w-100'>
            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1} >{i + 1}</option>
                )
              })}
            </select>
            <select className='m-2 h-100 bg-success rounded' ref={sizeRef} onChange={(e) => setSize(e.target.value)}>

              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}

            </select>

            <div className=' h-100 fs-5'>
              Total Price : $ {finalPrice}/-
            </div>
            <hr></hr>
            <div className='d-flex'>
              <button className="btn btn-success mx-2" onClick={handleCart}>Add To Cart</button>

            </div>


          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Cards