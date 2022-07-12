import '../css/viewitem.css';
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import {Animated} from "react-animated-css";


const ViewItem = () => {

    const [data, setData] = useState([]);
    const [otherImgs, setOtherImgs] = useState([]);
    const [passwordInput, setPasswordInput] = useState();
    const params = useParams();


    useEffect(() => {
        // GET DATA
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost/10iShowcase-App/itemRead.php?id="+params.id);
            const res = await response.json();
            setData(res)
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchData();

        // GET OTHER IMAGES
        const fetchImages = async () => {
            try {
              const response = await fetch("http://localhost/10iShowcase-App/imgRead.php?id="+params.id);
              const res = await response.json();
              setOtherImgs(res)
            } catch (error) {
              console.log("error", error);
            }
        };
        fetchImages();
    });


    // DISPLAY MAIN-IMAGE
    const getImage = () => {
        if(data.img){
            return <img src={ "http://localhost/10iShowcase-App/uploads/"+data.img} alt="img"></img>
        } else {
            return <img src={"http://localhost/10iShowcase-App/uploads/default.jpg"} alt="img"></img>
        }
    }
    // DISPLAY OTHER IMAGES
    const OtherImages = () => {
        if({otherImgs}){
            return otherImgs.map((imgs, i) => {
                if(imgs.name){
                    return <div className="imglist" key={i}><img src={ "http://localhost/10iShowcase-App/uploads/"+imgs.name } alt="img"></img></div>
                } else { return null }
            })
        }
    }


    // TO SHOW & HIDE INPUT FIELD
    const inputArea = () =>{
        var input = document.getElementById('inputarea');
        input.classList.toggle('active');
    }
    const cancel = () => {
        var input = document.getElementById('inputarea');
        input.classList.toggle('active');
    }

    // ACCESS CODE VALIDATION
    const onChange = (e) => {
        let passwordVal = document.getElementById('enteredpassword').value;
        setPasswordInput(passwordVal);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(passwordInput === data.password){
            // SET SESSION
            sessionStorage.setItem('data', data.title);
            document.getElementById('GoToEdit').style.display = "block";
        }else {
            document.getElementById('message').innerHTML = "Wrong Password";
        }
    }


    // COLOR PICK
    let colorTheme = data.color ? data.color : "#eee";

    return (
        <div className="viewpage">
        <div className="cover" style={{ background: colorTheme}}>
            <div className="section1">
                {/* MAIN IMAGE */}
                <div className="imgarea">
                    { getImage() }
                </div>
                {/* TEXT AREA */}
                <div className="textarea">
                    <Animated animationIn="zoomInLeft" animationOut="fadeOut" isVisible={true}>
                        <h2>{data.title} ${data.price}</h2>
                    </Animated>
                    <p><b>Details:</b> {data.details}</p>
                    <p><b>Features:</b> {data.features}</p>
                    <p><b>Contact:</b> {data.phone} - {data.email}</p>
                    <button onClick={inputArea}>Edit</button>
                </div>
            </div>
            <div className="section2">
                {/* OTHER IMAGES */}
                { OtherImages() }
            </div>
        </div>


        {/* INPUT AREA: ACCESS_CODE */}
        <div id="inputarea">
            <input style={{marginBottom:'0px'}} className="uk-input" type="password" id="enteredpassword" name="enteredpassword" placeholder="Enter access code" onChange={onChange}></input>
            <p style={{marginBottom:'2px'}} id="message"></p>
            <input type="submit" className="button" value="Enter" onClick={onSubmit}/>
            <button onClick={cancel}>Cancel</button>
            <button id="GoToEdit"><Link to={"/edititem/"+params.id}><b>**Edit Page**</b></Link></button>
        </div>
        <h5 className="backLink"><Link to={"/"}>Go Back</Link></h5>


        {/* Footer */}
        <div className="footer">
            <div><Link to={'/'} className="logo">iShowcase</Link></div>
            <div className="webName">
                <a href="https://webcitizen.vercel.app/"> &copy;Webcitizen(2022).<br></br></a>
                <a href="#One">Back to top</a>
            </div>
        </div>
        </div>
    )
}
export default ViewItem;