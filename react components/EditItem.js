import '../css/edititem.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImgsCRUD from './imgsCRUD';


class EditItem extends Component {
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

            urlID: '',
            redirect: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.colorChange = this.colorChange.bind(this);   
    }

    
    componentDidMount() {
        // GET URL PARAMETER ID
        let text = window.location.href;
        let urlArray = text.split("/");
        let paramIndex = urlArray.length-1;
        let urlID = urlArray[paramIndex];
        // console.log(urlID);

        // GET DATA
        axios.get("http://localhost/10iShowcase-App/itemRead.php?id="+urlID)
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
                password: response.data.password,
                urlID: urlID});
            })
            .catch(function(error) {
                console.log(error);
        })
    }


    // USER VALIDATION
    validUser(){
        var sessionID = sessionStorage.getItem('data');
        var userID = this.state.title
        if(!sessionID === userID) {
            this.setState({redirect: true});
        }
    }


    // SET-STATES
    onChange(e){
        // INPUT CONTROL
        if(e.target.value.match(/[^a-z 0-9.,!&@()+-]/gi) === null){
            this.setState({[e.target.name]: e.target.value});
            // console.log(e.target.value);
        }
    }
    // UPDATE DATA
    onSubmit(e) {
        e.preventDefault();
        // GET URL PARAMETER ID
        let text = window.location.href;
        let urlArray = text.split("/");
        let paramIndex = urlArray.length-1;
        let urlID = urlArray[paramIndex];
        // console.log(urlID);
        var sessionID = sessionStorage.getItem('data');
        var userID = this.state.title
        // IF SESSION VALID
        if(sessionID === userID){
                const obj = {
                    details: this.state.details,
                    features: this.state.features,
                    price: this.state.price,
                    phone: this.state.phone,
                    email: this.state.email,
                };
                axios.post('http://localhost/10iShowcase-App/itemUpdate.php?id='+urlID, obj)
                .then(res => document.querySelector("#msg1").innerHTML = res.data);
        } else {
            console.log('UNAUTHORIZED!');
            document.querySelector('#msg1').innerHTML = "You dont have access!";
        }
    }


    // DELETE DATA
    deleteItem() {
        // IF SESSION VALID
        var sessionID = sessionStorage.getItem('data');
        var userID = this.state.title
        
        if(sessionID === userID) {
            if (window.confirm("Are you sure you want to delete item?")) {
                axios.get('http://localhost/10iShowcase-App/itemDelete.php?id='+this.state.urlID)
                .then(
                    this.setState({redirect: true})
                )
                .catch(err => console.log(err))
                return true; }
        } else {
            console.log('UNAUTHORIZED!');
            document.querySelector('#msg1').innerHTML = "You dont have access!";
        }
    }


    // CHANGE THEME-COLOR
    colorChange(){
        // IF SESSION VALID
        var sessionID = sessionStorage.getItem('data');
        var userID = this.state.title
        
        if(sessionID === userID){
            const style = {
            color: this.state.color
        };
        axios.post('http://localhost/10iShowcase-App/themeColor.php?id='+this.state.urlID, style)
        .then(res => res.data);
        document.querySelector("#msg2").innerHTML = "Color Theme Updated!";
        setTimeout(() => { document.querySelector("#msg2").innerHTML = "." }, 1000);
      } else {
        console.log('UNAUTHORIZED!');
        document.querySelector('#msg2').innerHTML = "You dont have access!";
      }
    }


    render() {
    // REDIRECT ON SUBMIT
    if (this.state.redirect) { 
      return window.location.assign("http://localhost:3000/");
    }
        
        return (
            <div className="editsell">
                {/* VERIFY-USER */}
                { this.validUser() }
                <div className="editcontent1">
                    <h2>{this.state.title}</h2>
                    <button onClick={this.deleteItem} className="deleteitem">Delete Item</button>
                </div>
                
                <div className="editform">
                    <form>
                        <fieldset className="uk-fieldset">
                        <div className="uk-margin">

                            {/* Form Update */}
                            <label htmlFor="details">Details</label>
                            <textarea className="uk-textarea" rows="4" type="text" name="details" value={this.state.details} onChange={this.onChange}></textarea>

                            <label htmlFor="Features">Features</label>
                            <textarea className="uk-textarea" rows="4" type="text" name="features" value={this.state.features} onChange={this.onChange}></textarea>
                            
                            <label htmlFor="Price">Item Price</label>
                            <input  className="uk-input" type="text" name="price" value={this.state.price} onChange={this.onChange}/>

                            <label htmlFor="phone">Tel/Phone</label>
                            <input  className="uk-input" type="text" name="phone" value={this.state.phone} onChange={this.onChange}/>

                            <label htmlFor="email">Email</label>
                            <input  className="uk-input" type="text" name="email" value={this.state.email} onChange={this.onChange}/>
                            
                            <input type="submit" className="button" value="Update" onClick={this.onSubmit}/>
                            <p style={{color:'white'}} id="msg1"></p>
                        </div>

                        <h5><Link style={{color:'black'}} to={ "/viewitem/"+this.state.urlID}>Back</Link></h5>
                        </fieldset>
                    </form>
                </div>


                {/* THEME-COLOR-PICKER */}
                <div className="colorTheme">
                    <div style={{backgroundColor: "#f0c8f0"}} id="purple" onClick={this.colorChange} onMouseOver={() => this.setState({color:"#f0c8f0"})}></div>
                    <div style={{backgroundColor: "#4e3757"}} id="dark" onClick={this.colorChange} onMouseOver={() => this.setState({color:"#4e3757"})}></div>
                    <div style={{backgroundColor: "#eee"}} id="lightgray" onClick={this.colorChange} onMouseOver={() => this.setState({color:"#eee"})}></div>
                </div>
                <p id="msg2"></p>

                
                {/* IMGS UPLOAD-READ-DELETE */}
                <ImgsCRUD urlID={this.state.urlID} usertitle={this.state.title} mainImg={this.state.img} />


                {/* Footer */}
                <div className="footer">
                    <div><Link to={'/'} className="logo">iShowcase</Link></div>
                    <div className="webName">
                        <a href="https://webcitizen.vercel.app/"> &copy;Webcitizen(2022).<br></br></a>
                    </div>
                </div>
            </div>
        )
    }
}
export default EditItem;
