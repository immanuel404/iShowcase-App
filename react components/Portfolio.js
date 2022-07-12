import React, { Component } from 'react';
import '../css/portfolio.css';
import soon from '../img/comingsoon.png';


class Portfolio extends Component {

    componentDidMount() {
        // SCROLL TO TOP
        window.scrollTo(0, 0)
    }

    render() {
        return (
        <div className="portfolio">
            <div className="soon">
                <img alt="coming" src={soon}></img>
                <h2>COMING SOON!</h2>
                {/* <h4>Create a personal portfolio</h4> */}
            </div>

            {/* Footer */}
            <div style={{marginTop: "500px"}} className="footer">
                <div><a href="http://ishowcase.epizy.com/" className="logo">iShowcase</a></div>
                <div className="webName">
                    <a href="https://webcitizen.vercel.app/"> &copy;webcitizen(2020)<br></br></a>
                    <a href="#One">Back to top</a>
                </div>
            </div>
        </div>
        )
    }
}

export default Portfolio;