import React from 'react';
import { Link } from 'react-router-dom';

import home from '../img/home.png';
import logout from '../img/logout.png';
import folio from '../img/portfolio.png';
import sell from '../img/sell.png';


const Navbar = () => {

    function toggle() {
      var tog = document.getElementById('toggle');
      var nav = document.getElementById('navigate');
      nav.classList.remove('activate');
      tog.classList.toggle('active');
      nav.classList.toggle('active');
    }
    function mobiletoggle() {
      var nav = document.getElementById('navigate');
      nav.classList.add('activate');
      nav.classList.toggle('active');
    }

    return (
    <div id="One" className="menu-area">

      <div className="navbar">
        <div><Link to={'/'} className="logo">iShowcase</Link></div>
        <div id="toggle" onClick={toggle}></div>
	    </div>

        <div id="navigate">
            <ul>
                <li onClick={mobiletoggle}><Link to={'/'}><img alt="house" src={home}></img>  home</Link></li>
                <li onClick={mobiletoggle}><Link to={'/createsell'}><img alt="items" src={sell}></img>  add-items</Link></li>
                <li onClick={mobiletoggle}><Link to={'/portfolio'}><img alt="port" src={folio}></img>  add-portfolio</Link></li>
                <li onClick={mobiletoggle}><Link to={'/'}><img alt="out" src={logout}></img>  logout</Link></li>
            </ul>
        </div>

    </div>
  );
}

export default Navbar;