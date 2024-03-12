import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../public/img/logo.jpg';
import { icons } from '../../utils/icons';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';

//Navigator
const Navigator = () => {
  return (
    <div style={{ paddingTop: '20px' }}>
      <div
        style={{
          backgroundColor: '#FBFCF3',
          borderTop: '1px solid #ddd',
          paddingTop: '20px',
          position: 'relative',
          width: '1200px',
          height: 'auto !important',
          background: '',
          zoom: 1,
          clear: 'both',
        }}
      >
        <div>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '255px',
                height: '255px',
                marginLeft: '9px',
                paddingBottom: '20px',
              }}
            >
              <strong>CATEGORY</strong>
              <ul>
                <li style={{ paddingTop: '10px' }}>
                  <a href="/category">Face Makeup</a>
                </li>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">Eye Makeup</a>
                </li>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">Lips Makeup</a>
                </li>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">Nail</a>
                </li>
              </ul>
            </div>
            <div
              style={{
                width: '255px',
                height: '255px',
                marginLeft: '35px',
                paddingBottom: '20px',
              }}
            >
              <strong>MY ACCOUNT</strong>
              <ul>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">My Account</a>
                </li>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">Customer Service</a>
                </li>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">Shipping</a>
                </li>
              </ul>
            </div>
            <div
              style={{
                width: '255px',
                height: '255px',
                marginLeft: '35px',
                paddingBottom: '20px',
              }}
            >
              <strong>CORPORATE INFORMATION</strong>
              <ul>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">About Us</a>
                </li>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">Contact Us</a>
                </li>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">Site Map</a>
                </li>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">Mobile Version</a>
                </li>
              </ul>
            </div>
            <div
              style={{
                width: '255px',
                height: '255px',
                marginLeft: '65px',
                paddingBottom: '20px',
              }}
            >
              <strong>POLICIES</strong>
              <ul>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">Privacy</a>
                </li>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">Return</a>
                </li>
                <li style={{ paddingTop: '10px' }}>
                  <a href=" ">Terms Of Use</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//Footer
const Footerr = () => {
  return (
    <div id="footer">
      <div
        style={{
          width: '1200px',
          height: '200px',
          margin: '-50px auto',
          position: 'relative',
          backgroundColor: 'black',
          color: '#FFFFFF',
        }}
      >
        <div style={{ float: 'left', width: '200px', height: '333px' }}>
          <img alt={'sds'} src={logo} />
        </div>
        <div style={{ width: '730px', float: 'right', lineHeight: '20px' }}>
          <ul
            style={{
              borderRight: '1px solid #646464',
              float: 'left',
              padding: '0 15px 0 0',
              margin: '0 15px 0 0',
              color: '#e0e0e0',
              fontSize: '12px',
              display: 'flex',
            }}
          >
            <li style={{ paddingLeft: '0', important: true }}>
              SILICON2 CO.,LTD - STYLE
            </li>
            <li>CEO Pham Yen Ngoc</li>
            <li style={{ borderRight: '0', important: true }}>
              Business Licence No. 214-87-03359
            </li>
          </ul>
          <address>
            #907, Phase S. H-SQUARE, 680 Sampyeong-Dong, Bundang-Gu,
            Seongnam-City, Gyeonggi-Do, Korea
          </address>
          <div className="copyright">
            Copyright © Since 2024 All Rights Reserved.
          </div>
          <div style={{ marginTop: '10px' }}>
            <li className="flex justify-center items-center mr-1 ">
              <a href="https://www.facebook.com/studiofotofusion">
                <icons.BsInstagram />
              </a>
            </li>
            <li className="flex justify-center items-center mr-1 ">
              <a href="https://www.facebook.com/studiofotofusion">
                <icons.AiOutlineFacebook />
              </a>
            </li>
            <li className="flex justify-center items-center mr-1 ">
              <a href="https://www.facebook.com/studiofotofusion">
                <icons.BsTwitter />
              </a>
            </li>
            <li className="flex justify-center items-center mr-1 ">
              <a href="https://www.facebook.com/studiofotofusion">
                <icons.AiOutlineYoutube />
              </a>
            </li>
          </div>
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    </div>
  );
};

export default function Footer() {
  return (
    <div>
      <Navigator />
      <Footerr />
    </div>
  );
}
