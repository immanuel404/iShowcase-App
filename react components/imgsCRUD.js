import React, { Component } from 'react';
import axios from 'axios';


class ImgsCRUD extends Component {
    constructor(props) {
        super(props);
        this.state ={
          file: '',
          file2: '',
          otherImgs: [],
          refresh: false
        };
        // MAIN IMAGE
        this.onImgSubmit = this.onImgSubmit.bind(this)
        this.onImgChange = this.onImgChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        // OTHER IMAGES
        this.onImgSubmitOther = this.onImgSubmitOther.bind(this)
        this.onImgChangeOther = this.onImgChangeOther.bind(this)
        this.uploadFileOther = this.uploadFileOther.bind(this)
        // SHOW OTHER IMAGES
        this.otherImages = this.otherImages.bind(this)
        // DELETE IMAGE
        this.deleteImg = this.deleteImg.bind(this)
    }

    
    // GET OTHER IMAGES
    componentDidUpdate() {
        axios.get('http://localhost/10iShowcase-App/imgRead.php?id='+this.props.urlID)
        .then(response => {
            this.setState({ otherImgs: response.data });
        })
        .catch(function(error) {
            console.log(error);
        })
    }


    // UPLOAD MAIN IMAGE
    async onImgSubmit(e){
        e.preventDefault()
        // VALIDATE-USER
        var sessionID = sessionStorage.getItem('data');
        var userID = this.props.usertitle

        if(sessionID === userID){
            let res = await this.uploadFile(this.state.file);
            document.querySelector('#uploadmessage1').innerHTML = res.data.message;
            setInterval(() => { this.setState({ refresh: true }) }, 1500); 
        } else {
        console.log('UNAUTHORIZED!');
        document.querySelector('#uploadmessage1').innerHTML = "You dont have access!";
        }
    }
    // ON-IMG-UPLOAD
    onImgChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    // UPLOAD IMAGE
    async uploadFile(file){
        const formData = new FormData();
        formData.append('avatar',file)
        
        return await axios.post('http://localhost/10iShowcase-App/imgUpload.php?id='+this.props.urlID, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }


    // UPLOAD OTHER IMAGES
    async onImgSubmitOther(e){
        e.preventDefault()
        // VALIDATE-USER
        var sessionID = sessionStorage.getItem('data');
        var userID = this.props.usertitle

        if(sessionID === userID){
            let res2 = await this.uploadFileOther(this.state.file);
            document.querySelector('#uploadmessage2').innerHTML = res2.data.message;
            setInterval(() => { this.setState({ refresh: true }) }, 2000);
        } else {
            console.log('UNAUTHORIZED!');
            document.querySelector('#uploadmessage2').innerHTML = "You dont have access!";
        }
    }
    // ON-IMGS-UPLOAD
    onImgChangeOther(e) {
        this.setState({ file2: e.target.files[0] })
    }
    // UPLOAD OTHER-IMAGES
    async uploadFileOther(file){
        const formData2 = new FormData();
        formData2.append('avatar',file)
        
        return  await axios.post('http://localhost/10iShowcase-App/imgUpload2.php?id='+this.props.urlID, formData2, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }



    // DISPLAYS OTHER IMAGES
    otherImages() {
        if(this.state.otherImgs === 0){
        console.log("No-Other-Images");
        } else {
        return this.state.otherImgs.map((imgs, i) => {
            return (<div key={i}><img src={"http://localhost/10iShowcase-App/uploads/"+imgs.name} alt="img"></img>
            <button onClick={ () => { this.deleteImg(imgs.name) } }> X </button></div>)
        })
        }
    }

    
    // DELETE IMAGE
    deleteImg(name) {
        if(window.confirm("Are you sure you want to delete this image?")) {
            axios.get('http://localhost/10iShowcase-App/imgDelete.php?id='+name)
            .then(
                this.setState({ refresh: true })
            )
            .catch(err => console.log(err))
            return true;
        }
    }

    
    render() {  
    // REDIRECT ON SUBMIT
    if (this.state.refresh) {
        console.log("state change");
    }

    return (
        <div className="imgCrud">
            <div className="uploadArea">
                {/* UPLOAD MAIN IMAGE */}
                <div className="main">
                    <form onSubmit={ this.onImgSubmit }>
                        <h4>Upload Main Image</h4>
                        <input type="file" onChange={ this.onImgChange } />
                        <button uk-tooltip="title: file name must contain only letters; pos: top-left" type="submit">Upload File</button>
                        <p style={{color:"purple"}} id="uploadmessage1"></p>
                    </form>
                </div>       
                {/* UPLOAD OTHER IMAGES */}
                <div className="other">
                    <form onSubmit={ this.onImgSubmitOther }>
                        <h4>Upload Other Images</h4>
                        <input type="file" onChange={ this.onImgChange } />
                        <button uk-tooltip="title: file name must contain only letters; pos: top-left" type="submit">Upload File</button>
                        <p style={{color:"purple"}} id="uploadmessage2"></p>
                    </form>
                </div>
            </div>
                
            {/* DISPLAY ALL IMAGES */}
            <div className='uploadedImg'>
                <div className='mainImg'>
                    { this.props.mainImg ? <p style={{margin:"0px"}}>main image</p> : null }
                    { this.props.mainImg ? <img src={"http://localhost/10iShowcase-App/uploads/"+this.props.mainImg} alt="img"></img> : null}
                </div>
                <div className='otherImg'> 
                    { this.otherImages() }
                </div>
            </div>
        </div>
        )
    }
}
export default ImgsCRUD;