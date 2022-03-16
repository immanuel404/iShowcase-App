import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ImgCRUD from './imgCrud';


class Editsell extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            details: '',
            features: '',
            price: '',
            phone: '',
            email: '',
            img:'',
            username: '',
            password: '',
            
            color: '',
            redirect: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.styleChange = this.styleChange.bind(this);
}


    // GET DATA
    componentDidMount() {
        axios.get('http://ishowcase.great-site.net/php/getbyid.php?id='+this.props.match.params.id)
        .then(response => {
            this.setState({
                title: response.data.title,
                details: response.data.details,
                features: response.data.features,
                price: response.data.price,
                phone: response.data.phone,
                email: response.data.email,
                img: response.data.img,
                username: response.data.username,
                password: response.data.password });
            })
            .catch(function(error) {
                console.log(error);
        })
    }

    // DISPLAY MAIN IMAGE
    imgGet(){
        if(this.state.img ){
            return <img className="imgget" src={ "http://ishowcase.great-site.net/php/uploads/"+this.state.img } alt="img"></img>
        }
    }


    // SETS NEW STATE ONCE TYPING
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }


    // UPDATE DATA
    onSubmit(e) {
      e.preventDefault();
      // IF SESSION SUBMIT UPDATE
      var session = sessionStorage.getItem('data');
      var check = this.state.password

      if(session === check){

            const obj = {
                details: this.state.details,
                features: this.state.features,
                price: this.state.price,
                phone: this.state.phone,
                email: this.state.email,
                password: this.state.password
            };
                axios.post('http://ishowcase.great-site.net/php/selledit.php?id='+
                this.props.match.params.id, obj)
                .then(res => document.querySelector("#editmessage").innerHTML = res.data);

      } else {
          console.log('CHEAT!!!');
          document.querySelector('#note').innerHTML = "You dont have access!";
      }
    }


    deleteItem() {
      // IF SESSION SUBMIT DELETE
      var session = sessionStorage.getItem('data');
      var check = this.state.password

      if(session === check){
        if(window.confirm("Are you sure you want to delete this product/item?")) {
            axios.get('http://ishowcase.great-site.net/php/deletesell.php?id=' +this.props.match.params.id)
            .then(
                this.setState({ redirect: true })
            )
            .catch(err => console.log(err))
            return true; }
        } else {
            console.log('CHEAT!!!');
            document.querySelector('#note').innerHTML = "You dont have access!";
        }
    }


    // CHANGE COLOR-THEME
    styleChange(){
      // IF SESSION CHANGE STYLE
      var session = sessionStorage.getItem('data');
      var check = this.state.password

      if(session === check){
        const style = {
            color: this.state.color
        };

        axios.post('http://ishowcase.great-site.net/php/styleChange.php?id='+this.props.match.params.id, style)
        .then(res => res.data);
        setInterval(() => { document.querySelector("#thememessage").innerHTML = "Your Color Theme Was Updated!" }, 1000);
        document.querySelector("#thememessage").innerHTML = "";

      } else {
            console.log('CHEAT!!!');
            document.querySelector("#thememessage").innerHTML = "You dont have access!";
      }
    }


    // FORM CONTROL
    OnlylettersDigits(e) {
        var regex1 = /[^a-z 0-9.,':;-@&+?%$!)(]/gi;
        var regex2 = /\bdelete|insert\b/gi;
        e.target.value = e.target.value.replace(regex1, "");
        e.target.value = e.target.value.replace(regex2, "");
     }
     OnlyDigits(e) {
        var regex = /[^0-9 +-]/gi;
        e.target.value = e.target.value.replace(regex, "");
     }


    render() {
    // REDIRECT ON SUBMIT
    if (this.state.redirect) {
      return window.location.assign('http://ishowcase.great-site.net/');
    }
        
        return (
            <div className="editsell">

                <div className="editcontent1">
                    <h2>{this.state.title}</h2>
                    <button onClick={this.deleteItem} className="deleteitem">Delete Item</button>
                </div>

                <div className="editform">
                    <form onSubmit={this.onSubmit}>
                    
                        <fieldset className="uk-fieldset">
                        <div className="uk-margin">

                            {/* Form Update */}
                            <label htmlFor="details">Details</label>
                            <textarea className="uk-textarea" rows="5" type="text" name="details" placeholder="Product details" value={this.state.details} onKeyUp={this.OnlylettersDigits} onChange={this.onChange}></textarea>

                            <label htmlFor="Features">Features</label>
                            <textarea className="uk-textarea" rows="5" type="text" name="features" placeholder="Product features" value={this.state.features} onKeyUp={this.OnlylettersDigits} onChange={this.onChange}></textarea>
                            
                            <label htmlFor="Price">Item Price</label>
                            <input  className="uk-input" type="text" name="price" placeholder="Price" value={this.state.price} onKeyUp={this.OnlyDigits} onChange={this.onChange}/>

                            <label htmlFor="phone">Tel / Phone</label>
                            <input  className="uk-input" type="text" name="phone" placeholder="Phone number" value={this.state.phone} onKeyUp={this.OnlyDigits} onChange={this.onChange}/>

                            <label htmlFor="email">Email</label>
                            <input  className="uk-input" type="text" name="email" placeholder="Email address" value={this.state.email} onKeyUp={this.OnlylettersDigits} onChange={this.onChange}/>
                            
                            <label htmlFor="password">Access code</label>
                            <input  className="uk-input" type="password" name="password" placeholder="Create an access code" value={this.state.password} onKeyUp={this.OnlylettersDigits} onChange={this.onChange}/>
                            
                            <input type="submit" className="button" value="update" onClick={this.onSubmit}/>
                            <p style={{color:'red'}} id="note"></p>
                            <p style={{color:'white'}} id="editmessage"></p>
                        </div>

                        <h5><Link style={{color:'black'}} to={ "/viewsell/"+this.props.match.params.id}>Back</Link></h5>
                        </fieldset>      
                    </form>
                </div>


                {/* THEMES PICKER: COLORS & SHAPE */}
                <div className="colorTheme">
                    <div style={{backgroundColor: "#e0b7e0"}} id="purple" onClick={this.styleChange} onMouseOver={() => this.setState({color:"#e0b7e0"})}></div>
                    <div style={{backgroundColor: "#86748C"}} id="black" onClick={this.styleChange} onMouseOver={() => this.setState({color:"#86748C"})}></div>
                    <div style={{backgroundColor: "#eee"}} id="white" onClick={this.styleChange} onMouseOver={() => this.setState({color:"#eee"})}></div>
                </div>
                <p id="thememessage"></p>

                
                {/* IMG UPLOAD-READ-DELETE */}
                <ImgCRUD obj= {this.props.match.params.id} pass= {this.state.password} />


                {/* MAIN-IMAGE */}
                { this.imgGet() }


                {/* Footer */}
                <div className="footer">
                    <div><Link to={'/'} className="logo">iShowcase</Link></div>
                    <div className="webName">
                        <a href="http://webcitizen.epizy.com/"> &copy;Webcitizen(2020).<br></br></a>
                        <a href="#One">Back to top</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default Editsell;
