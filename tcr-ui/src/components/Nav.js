import React from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config/config';

export default function NavBar() {
  return (
    <div className="header bg-dark">
      <span id="registry-name">
        <strong>{config.name}</strong>
      </span>

      <span className="float-right">
        {/* <Nav>
          <NavItem>
            <NavLink to='/' className="nav-link">
              Listings
            </NavLink>
          </NavItem>
        </Nav>
        <Nav>
          <NavItem>
            <NavLink to='/apply' className="nav-link">
              Apply
            </NavLink>
          </NavItem>
        </Nav>
        <Nav>
          <NavItem>
            <NavLink to='/account' className="nav-link">
              Account
            </NavLink>
          </NavItem>
        </Nav>
        <Nav>
          <NavItem>
            <NavLink to='/remove' className="nav-link">
              Remove an Application
            </NavLink>
          </NavItem>
        </Nav> */}

        <ul className="nav">
          <li className="nav-item">
            <NavLink to='/' className="nav-link">
            <ion-icon name="list-box"></ion-icon> Experts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/apply' className="nav-link">
            <ion-icon name="create"></ion-icon> Apply
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/account' className="nav-link">
            <ion-icon name="person"></ion-icon> Account
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/remove' className="nav-link">
            <ion-icon name="trash"></ion-icon> Withdraw a Listing
            </NavLink>
          </li>
        </ul>
      </span>
    </div>
  )
}