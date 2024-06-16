import React, { useState, useEffect } from 'react'
import Navbr from '../components/Navbr'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
// import Carousel from '../components/Carousel'
import axios from 'axios'
const Home = () => {
  const [search,setSearch]=useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {

    let res = await axios.post("http://localhost:4000/fooddata");
    setFoodItem(res.data[0]);
    setFoodCat(res.data[1]);

    // console.log(res.data[0],res.data[1]);
  };

  useEffect(() => {
    loadData();

  }, []);
  return (
    
    <div>
      <Navbr />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id="carousel" >
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
             
            </div>
          </div>


          <div className="carousel-item active">
            <img src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBhc3RhfGVufDB8fDB8fHww" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1585503913867-f3382c5d1122?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hvd21laW58ZW58MHx8MHx8fDA%3D" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      
      <div className="container">
        {foodCat.length > 0 ? foodCat.map((data) => {
          return (<div key={data._id} className='row mb-3'>

            <div className="fs-3 m-3">

              {data.CategoryName}
            </div>

            <hr />
            {foodItem.length > 0
              ?
              foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                .map((filterItems) => {
                  return (

                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mb-4'>
                      <Cards foodItems={filterItems} options={filterItems.options[0]} ></Cards>
                    </div>
                  )
                }) : <div> No such data found</div>
            }


          </div>)
        }) : ""


        }


      </div>
      <Footer />
    </div>
  )
}

export default Home