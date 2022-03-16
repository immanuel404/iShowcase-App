import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
            img: '',
            username: '',
            password: '',
            color: '',
            radius: '',

            imglist: [],

            enteredpassword: '',
            redirect: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


     componentDidMount() {
        //  RETURN DATA
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
                password: response.data.password,
                color: response.data.color,
                radius: response.data.radius });
            })
            .catch(function(error) {
                console.log(error);
        })
        // RETURN LIST OF IMAGES
        axios.get('http://ishowcase.great-site.net/php/imglist.php?id='+this.props.match.params.id)
        .then(response => {
            this.setState({ imglist: response.data });
            })
            .catch(function(error) {
                console.log(error);
            })
     }

     
     // DISPLAY MAIN IMAGE
     imgGet(){
        // const rad = this.state.radius;
        if(this.state.img ){
            return <img src={ "http://ishowcase.great-site.net/php/uploads/"+this.state.img } alt="img"></img>
        }
     }

    
     // DISPLAY LIST OF IMAGES
     imageList(){
         if(this.state.imglist){
            return this.state.imglist.map((img, i) => {
                if(img.name){
                    return <div className="imglist" key={i}><img src={ "http://ishowcase.great-site.net/php/uploads/"+img.name } alt="img"></img></div>
                } else {return null}
            })
        }
     }



     // TO SHOW & HIDE INPUT FIELD
     inputArea() {
        var input = document.getElementById('inputarea');
        input.classList.toggle('active');
     }
     cancel() {
        var input = document.getElementById('inputarea');
        input.classList.toggle('active');
     }



     // ACCESS CODE VALIDATION
     onChange(e){
        this.setState({[e.target.name]: e.target.value});
        document.getElementById('message').innerHTML = "";
     }
     onSubmit(e) {
        e.preventDefault();
        if(this.state.enteredpassword === this.state.password){
            console.log("access granted");
            this.setState({redirect: true});
            sessionStorage.setItem('data', this.state.password);
        } else {
            document.getElementById('message').innerHTML = "wrong password";
        }
     }
     


    render() {

        if (this.state.redirect) {
            return (<Redirect to={'/editsell/'+this.props.match.params.id}/>)
        }

        let colorTheme = this.state.color ? this.state.color : "#eee";
        let other = this.state.color === null || "#eee"  ? "black" : "white";

        return (
        <div className="viewpage">

            <div className="cover" style={{ background: colorTheme, color: other }}>
                <div className="section1">

                    {/* MAIN IMAGE */}
                    <div className="imgarea">
                        { this.imgGet() }
                    </div>

                    {/* TEXT AREA */}
                    <div className="textarea">
                        <Animated animationIn="zoomInLeft" animationOut="fadeOut" isVisible={true}>
                            <h2>{this.state.title} ${this.state.price}</h2>
                        </Animated>
                        <p><b>Details:</b> {this.state.details}</p>
                        <p><b>Features:</b> {this.state.features}</p>
                        <p><b>Contact:</b> {this.state.phone} | {this.state.email}</p>
                        <button onClick={this.inputArea}>Edit</button>
                    </div>
                    
                </div>
                
                <div className="section2">
                    {/* RETURN IMAGES_ */}
                    { this.imageList() }
                </div>
                <div className="sharethis-inline-share-buttons"></div>
            </div>


            {/* INPUT AREA: ACCESS_CODE */}
            <div id="inputarea">
                <input className="uk-input" type="password" name="enteredpassword" placeholder="input access code" onChange={this.onChange}></input>
                <p id="message"></p>
                <input type="submit" className="button" value="Enter" onClick={this.onSubmit}/>
                <button onClick={this.cancel}>Cancel</button>
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
        )
    }
}

export default Createsell;