import '../css/createitem.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {Animated} from "react-animated-css";
import axios from 'axios';


class CreateItem extends Component {
  constructor(props){
    super(props);
    this.state = {
        title: '',
        details: '',
        features: '',
        price: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        color: '',
        redirect: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  // SET-STATES
  onChange(e){
    // INPUT CONTROL
    if(e.target.value.match(/[^a-z 0-9.,!&@()+-]/gi) === null){
      this.setState({[e.target.name]: e.target.value});
      // console.log(e.target.value);
    }
  }
  // SUBMIT FORM
  onSubmit(e) {
    e.preventDefault();

    if(this.state.title && this.state.username && this.state.price && this.state.password){
      const obj = {
          title: this.state.title,
          details: this.state.details,
          features: this.state.features,
          price: this.state.price,
          phone: this.state.phone,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          color: "#eee"
      };

      axios.post('http://localhost/10iShowcase-App/itemInsert.php', obj)
      .then(res =>
        {
          document.querySelector('#note').innerHTML = res.data;
          // IF SUBMISSION SUCCESS
          if(document.querySelector('#note').innerHTML === ''){
            setTimeout(() => {
              this.setState({ redirect: true })
            }, 2000);
            document.querySelector('#note').innerHTML = "Success!";
          }
          // IF SUBMISSION ERROR
          else {
            document.querySelector('#note').innerHTML = res.data;
          }
        });

    // INCOMPLETE INPUT
    } else {
        document.querySelector('#note').innerHTML = "Please, fill all the required fields.";
    }
  }


  render() {
    // REDIRECT ON-SUBMISSION
    if (this.state.redirect) {
      return  (<Navigate to="/"/>)
    }

    return (
          <div className="createsell">
            <div className="createform">
            {/* FORM AREA */}
            <form><fieldset className="uk-fieldset">
                <div className="uk-margin">
                <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible={true}>
                  <h3>ADD ITEM INFORMATION</h3>
                </Animated>
                 
                  <label htmlFor="title">Item Name</label> 
                  <input style={{marginBottom:'18px'}} className="uk-input" type="text" value={this.state.title} name="title" placeholder="*Product Name" onChange={this.onChange} />

                  <label htmlFor="details">Details</label>
                  <textarea style={{marginBottom:'18px'}} className="uk-textarea" rows="4" type="text" value={this.state.details} name="details" placeholder="*Product Details" onChange={this.onChange}></textarea>

                  <label htmlFor="Features">Features</label>
                  <textarea style={{marginBottom:'18px'}} className="uk-textarea" rows="4" type="text" value={this.state.features} name="features" placeholder="Product Features" onChange={this.onChange}></textarea>
                  
                  <label htmlFor="Price">Item Price</label>
                  <input style={{marginBottom:'18px'}} className="uk-input" type="text" value={this.state.price} name="price" placeholder="*Price" onChange={this.onChange} />

                  <label htmlFor="phone">Tel/Phone</label>
                  <input style={{marginBottom:'18px'}}  className="uk-input" type="text" value={this.state.phone} name="phone" placeholder="Phone Number" onChange={this.onChange} />

                  <label htmlFor="email">Email</label>
                  <input style={{marginBottom:'18px'}} className="uk-input" type="text" value={this.state.email} name="email" placeholder="Email Address" onChange={this.onChange} />

                  <label htmlFor="username">Username</label>
                  <input style={{marginBottom:'18px'}} className="uk-input" type="text" value={this.state.username} name="username" placeholder="*Enter Username" onChange={this.onChange} />
                  
                  <label htmlFor="password">Access Code</label>
                  <input style={{marginBottom:'18px'}} className="uk-input" type="password" value={this.state.password} name="password" placeholder="*Add Access Code" onChange={this.onChange} />
                  
                  <button type="submit" className="button"  id="submit" onClick={this.onSubmit}>Submit</button>
                  <p style={{color:'white'}} id="note"></p>
                </div>

                <h5><Link to={"/"}>Back</Link></h5>
            </fieldset></form>
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
}
export default CreateItem;