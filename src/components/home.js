import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Animated} from "react-animated-css";

import svg from '../img/undraw.svg';
import svg2 from '../img/undraw2.svg';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = { 
      products: [] 
    };
  }


  // GET ALL ITEMS
  componentDidMount(){
    axios.get('http://ishowcase.epizy.com/php/sellread.php')
    .then(response => {
        this.setState({ products: response.data });
    })
    .catch(function (error) {
        console.log(error);
    })
  }


  // RETURN ITEMS & IMAGES
  productList(){
    if(this.state.products){
      return this.state.products.map((object, i) => {
        if(object.img){
          return <div key={i} className="homeview"><img src={ "http://ishowcase.epizy.com/php/uploads/"+object.img } alt="img"></img><h3><Link to={ "/viewsell/"+object.id }>{object.title}</Link></h3><p>${object.price}</p></div>
        } else {
          return <div key={i} className="homeview"><img src="http://ishowcase.epizy.com/php/uploads/default.jpg" alt="img"></img><h3><Link to={ "/viewsell/"+object.id }>{object.title}</Link></h3><p>${object.price}</p></div>
        }
      })
    }
  }


  render(){
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
            <h3>..this platform was created for you to showcase your goods & services to a wider audience.</h3>
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
          <h1 style={{color:'purple'}}>FOR SALE...</h1>
          <div className="gridlayout">
            { this.productList() }
          </div>
        </div>


        {/* Footer */}
        <div className="footer">
          <div><Link to={'/'} className="logo">iShowcase</Link></div>
          <div className="webName">
              <a href="http://webcitizen.epizy.com/"> &copy;Webcitizen(2020).<br></br></a>
              <a href="#One">Back to top</a>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;