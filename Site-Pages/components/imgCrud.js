import React, { Component } from 'react';
import axios from 'axios';


class ImgCRUD extends Component {

    constructor(props) {
        super(props);
        this.state ={
          file: '',
          file2: '',
          otherimgs: [],
        
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

        this.deleteImg = this.deleteImg.bind(this);
    }



    // UPLOAD MAIN IMAGES
    async onImgSubmit(e){
        e.preventDefault()
        // IF SESSION CHANGE STYLE
        var session = sessionStorage.getItem('data');
        var check = this.props.pass

        if(session === check){
            let res = await this.uploadFile(this.state.file);

            document.querySelector('#uploadmessage1').innerHTML = res.data.message;
            setInterval(() => { this.setState({ refresh: true }) }, 2000);
            
        } else {
        console.log('CHEAT!!!');
        document.querySelector('#uploadmessage1').innerHTML = "You dont have access!";
        }
    }

    onImgChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    async uploadFile(file){
        const formData = new FormData();
        formData.append('avatar',file)
        
        return await axios.post('http://ishowcase.great-site.net/php/imgupload.php?id='+this.props.obj, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }



    // UPLOAD OTHER IMAGES
    async onImgSubmitOther(e){
        e.preventDefault()
        // IF SESSION CHANGE STYLE
        var session = sessionStorage.getItem('data');
        var check = this.props.pass

        if(session === check){
            let res2 = await this.uploadFileOther(this.state.file);

            document.querySelector('#uploadmessage2').innerHTML = res2.data.message;
            setInterval(() => { this.setState({ refresh: true }) }, 2000);

        } else {
            console.log('CHEAT!!!');
            document.querySelector('#uploadmessage2').innerHTML = "You dont have access!";
        }
    }

    onImgChangeOther(e) {
        this.setState({ file2: e.target.files[0] })
    }

    async uploadFileOther(file){
        const formData2 = new FormData();
        formData2.append('avatar',file)
        
        return  await axios.post('http://ishowcase.great-site.net/php/imguploadtwo.php?id='+this.props.obj, formData2, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }



    // GET OTHER IMAGES
    componentDidMount() {
        axios.get('http://ishowcase.great-site.net/php/imglist.php?id='+this.props.obj)
        .then(response => {
            this.setState({ otherimgs: response.data });
            })
            .catch(function(error) {
                console.log(error);
            })
    }


    
    // DELETE IMAGE
    deleteImg(id) {
        if(window.confirm("Are you sure you want to delete this image?")) {
            axios.get('http://ishowcase.great-site.net/php/deleteimg.php?id='+id)
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
        return window.location.reload(true);
    }

        return (
            <div className="imgcrud">

                <div className="upload">
                    {/* UPLOAD MAIN IMAGE */}
                    <div className="main">
                        <form onSubmit={ this.onImgSubmit }>
                            <h4>Upload Main Item Image</h4>
                            <input type="file" onChange={ this.onImgChange } />
                            <button uk-tooltip="title: file name must contain only letters; pos: top-left" type="submit">Upload File</button>
                            <p style={{color:"purple"}} id="uploadmessage1"></p>
                        </form>
                    </div>
                    
                    {/* UPLOAD OTHER IMAGES */}
                    <div className="other">
                        <form onSubmit={ this.onImgSubmitOther }>
                            <h4>Upload Additional Images</h4>
                            <input type="file" onChange={ this.onImgChange } />
                            <button uk-tooltip="title: file name must contain only letters; pos: top-left" type="submit">Upload File</button>
                            <p style={{color:"purple"}} id="uploadmessage2"></p>
                        </form>
                    </div>
                </div>
                    
                {/* DISPLAY OTHER IMAGES */}
                <div className="uploadedimg"> 
                    { this.state.otherimgs ? this.state.otherimgs.map(imgs => {
                        return (<div className="upimgs" key={imgs.name}><img src={ "http://ishowcase.great-site.net/php/uploads/"+imgs.name } alt="img"></img><br></br>
                        <button style={{ border:"0px", background:"transparent"}} onClick={ () => {this.deleteImg(imgs.name) } }> X </button></div>)
                        }) : null
                    }
                </div>
            </div>
        )
    }
}
export default ImgCRUD;