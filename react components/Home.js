import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {Animated} from "react-animated-css";
import svg from '../img/undraw.svg';
import svg2 from '../img/undraw2.svg';


const Home = () => {

  const [products, setProducts] = useState([]); 


  useEffect(() => {
    // GET DATA
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/10iShowcase-App/itemReadAll.php");
        const res = await response.json();
        setProducts(res)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  });


  // RETURN ITEMS
  const productList = () => {
    if(products.length === 0){
      console.log("Empty Object");
    } else {
      return products.map((object, i) => {
        if(object.img) {
          return <div key={i} className="homeview"><img src={"http://localhost/10iShowcase-App/uploads/"+object.img } alt="img"></img><h3><Link to={`/viewitem/${object.id}`}>{object.title}</Link></h3><p>${object.price}</p></div>
        } else {
          return <div key={i} className="homeview"><img src="http://localhost/10iShowcase-App/uploads/default.jpg" alt="img"></img><h3><Link to={`/viewitem/${object.id}`}>{object.title}</Link></h3><p>${object.price}</p></div>
        }
      })
    }
  }


  return (
    <div className="homepage">
      {/* Section1 */}
      <div className="home1">
        <div className="icon1">
          <img alt="vector" src={svg}></img>
        </div>
        <div className="text1">
        <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible={true}>
          <h1><br></br>BRING YOUR PRODUCTS ONLINE!</h1>
          </Animated>
          <h3>..this platform was created to allow you showcase your goods & services to a wider audience.</h3>
        </div>
      </div>

      {/* Section2 */}
      <div className="home2">
        <div className="text2">
          <h1><br></br>Showcase & Share!</h1>
          <h3>Easily share your listed products on social media with a simple press of button.</h3>
          <h3>No registeration or login required.. it's quick & simple to use.</h3>
          <h3>CLICK the "add-items" link on the menu to get started:-)</h3>
        </div>
        <div className="icon2">
          <img alt="vector" src={svg2}></img>
        </div>
      </div>

      {/* Section3 */}
      <div className="home3">
        <h2 style={{color:'purple'}}>FOR SALE...</h2>
        <div className="gridlayout">
          {productList()}
        </div>
      </div>
      

      {/* Footer */}
      <div className="footer">
        <div><a href="http://ishowcase.epizy.com/" className="logo">iShowcase</a></div>
        <div className="webName">
            <a href="https://webcitizen.vercel.app/"> &copy;webcitizen(2022)<br></br></a>
            <a href="#One">Back to top</a>
        </div>
      </div>
    </div>
  );
}
export default Home;