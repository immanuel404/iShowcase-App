import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {Animated} from "react-animated-css";
import axios from 'axios';

class Createsell extends Component {
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

        redirect: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

    
    onChange(e){
      this.setState({[e.target.name]: e.target.value});
    }


    onSubmit(e) {
      e.preventDefault();
      if(this.state.title && this.state.username && this.state.password){
        const obj = {
            title: this.state.title,
            details: this.state.details,
            features: this.state.features,
            price: this.state.price,
            phone: this.state.phone,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };

        axios.post('php/sellinsert.php', obj)
        .then(res => 
          {
            document.querySelector('#note').innerHTML = res.data;
            if( document.querySelector('#note').innerHTML === '' ){
              this.setState({ redirect: true })
            } else {
              document.querySelector('#note').innerHTML = res.data;
            }
          });

      } else {
          document.querySelector('#note').innerHTML = "Kindly, fill all fields.";
      }
    }

    
    // FORM CONTROL
    OnlylettersDigits(e) {
      var regex = /[^a-z 0-9.,+-@]/gi;
      e.target.value = e.target.value.replace(regex, "");
      
   }
   OnlyDigits(e) {
      var regex = /[^0-9 +-.]/gi;
      e.target.value = e.target.value.replace(regex, "");
   }



  render() {    
    // REDIRECT ON SUBMIT
    if (this.state.redirect) {
      return (<Redirect to={'/'}/>)
    }

    return (
          <div className="createsell">
            <div className="createform"> 
            {/* FORM AREA */}
            <form><fieldset className="uk-fieldset">
                <div className="uk-margin">
                <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible={true}>
                  <h3>ITEM INFORMATION</h3>
                </Animated>
                 
                  <label htmlFor="title">Title</label>
                  <input  className="uk-input" type="text" value={this.state.title} name="title" placeholder="Short Product title" onKeyUp={this.OnlylettersDigits} onChange={this.onChange} required/>

                  <label htmlFor="details">Details</label>
                  <textarea className="uk-textarea" rows="5" type="text" value={this.state.details} name="details" placeholder="Product details" onKeyUp={this.OnlylettersDigits} onChange={this.onChange}></textarea>

                  <label htmlFor="Features">Features</label>
                  <textarea className="uk-textarea" rows="5" type="text" value={this.state.features} name="features" placeholder="Product features" onKeyUp={this.OnlylettersDigits} onChange={this.onChange}></textarea>
                  
                  <label htmlFor="Price">Item Price</label>
                  <input  className="uk-input" type="text" value={this.state.price} name="price" placeholder="Price" onKeyUp={this.OnlyDigits} onChange={this.onChange} />

                  <label htmlFor="phone">Tel / Phone</label>
                  <input  className="uk-input" type="text" value={this.state.phone} name="phone" placeholder="Phone number" onKeyUp={this.OnlyDigits} onChange={this.onChange} />

                  <label htmlFor="email">Email</label>
                  <input  className="uk-input" type="text" value={this.state.email} name="email" placeholder="Email address" onKeyUp={this.OnlylettersDigits} onChange={this.onChange} />

                  <label htmlFor="username">Username</label>
                  <input  className="uk-input" type="text" value={this.state.username} name="username" placeholder="Give your username" onKeyUp={this.OnlylettersDigits} onChange={this.onChange} />
                  
                  <label htmlFor="password">Access code</label>
                  <input  className="uk-input" type="password" value={this.state.password} name="password" placeholder="Create an access code" onKeyUp={this.OnlylettersDigits} onChange={this.onChange} />
                  
                  <button type="submit" className="button" onClick={this.onSubmit}>Submit</button>
                  <p style={{color:'red'}} id="note"></p>
                </div>

                <h5><Link to={ "/"}>Back</Link></h5>
            </fieldset></form>
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

export default Createsell;
