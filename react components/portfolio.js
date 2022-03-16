import React from 'react';
import { Link } from 'react-router-dom';
import soon from '../img/comingsoon.png';


const Portfolio = () => {

    return (
    <div className="portfolio">
        <div className="soon">
            <img alt="coming" src={soon}></img>
            <h1>COMING SOON!</h1>
            <h3>Create a personal portfolio</h3>
            <h3>Showcase your experiences, skills & achievements!</h3>
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

export default Portfolio;