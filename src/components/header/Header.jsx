import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../public/img/logo.jpg';
import { icons } from '../../utils/icons';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { getUser } from '../../services/login';

function Header() {
  const navigate = useNavigate();
  const [hasUser, setHasUser] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState({});
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = currentScrollPos > prevScrollPos;
      setPrevScrollPos(currentScrollPos);
      if (isScrolledDown && isVisible) {
        setIsVisible(false);
      } else if (!isScrolledDown && !isVisible) {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, prevScrollPos]);

  const handleLogOut = () => {
    localStorage.clear();
    setHasUser(false);
    navigate('/');
  };
  return (
    <div
      className={`sticky max-w-[1200px] top-0 left-0 right-0 w-full z-50  mx-auto transition-transform transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      onLoad={async () => {
        try {
          const data = await getUser();
          // get user from local storage to display
          const localUser = JSON.parse(localStorage.getItem('user'));
          setUser(() => localUser);
        } catch (e) {
          localStorage.clear();
        }
      }}
    >
      <div className="w-full flex justify-between p-2 bg-white dark:bg-white text-black bg-opacity-50">
        <div className="flex justify-center items-center font-sans text-xs">
          <ul className="flex justify-center items-center">
            <li className="flex justify-center items-center mr-4 ">
              <span className="text-orange-400 mr-2 font-bold ">
                <icons.CiLocationOn />
              </span>
              <span className="max-sm:hidden max-md:hidden font-bold">
                FPT Complex Đà Nắng
              </span>
            </li>
            <li className="flex justify-center items-center font-bold">
              <span className="text-btnprimary mr-2 ">
                <icons.AiOutlineMail />
              </span>
              <span>beautyboutique@gmail.com</span>
            </li>
          </ul>
        </div>

        <div className="text-black flex justify-center items-center font-sans text-xs">
          <ul className="flex justify-center items-center cursor-pointer">
            <li className="flex justify-center items-center mr-1 ">
              <a href="https://www.facebook.com/studiofotofusion">
                <icons.BsInstagram className="text-base" />
              </a>
            </li>
            <li className="flex justify-center items-center mr-1 ">
              <a href="https://www.facebook.com/studiofotofusion">
                <icons.AiOutlineFacebook className="text-base" />
              </a>
            </li>
            <li className="flex justify-center items-center mr-1 ">
              <a href="https://www.facebook.com/studiofotofusion">
                <icons.BsTwitter className="text-base" />
              </a>
            </li>
            <li className="flex justify-center items-center mr-1 ">
              <a href="https://www.facebook.com/studiofotofusion">
                <icons.AiOutlineYoutube className="text-base" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full  ">
        <div className="bg-white  rounded-lg  flex items-center justify-center">
          <div className="w-full border border-black rounded-lg">
            <Navbar className="w-full z-50 bg-opacity-10 rounded-lg dark:bg-white">
              <Navbar.Brand>
                <div className="avatar">
                  <div className="w-14 rounded-full">
                    <img alt={'sds'} src={logo} />
                  </div>
                </div>
                <span className="self-center whitespace-nowrap text-xl font-semibold text-black">
                  BEAUTY BOUTIQUE
                </span>
              </Navbar.Brand>

              <Navbar.Collapse className="text-black">
                <div className="text-black hover:text-red-500">
                  <Link to="/">HOME</Link>
                </div>

                <div className="text-black hover:text-red-500">
                  <Link to="/product">PRODUCT</Link>
                </div>

                <div className="text-black hover:text-red-500">
                  <Link to="/aboutus">ABOUT</Link>
                </div>
                <div className="text-black hover:text-red-500">
                  <Link to="/contact">CONTACT</Link>
                </div>
                <div className="text-black hover:text-red-500">
                  <Link to="/blogpost">BLOG</Link>
                </div>
              </Navbar.Collapse>
              {hasUser ? (
                <div className="flex md:order-2 text-black">
                  <div className="flex items-center justify-center">
                    <Link to="/cart">
                      <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center mr-2 hover:bg-btnprimary hover:text-[#B4E9D6] ">
                        <icons.BsCart4 />
                      </div>
                    </Link>
                  </div>
                  <Dropdown
                    arrowIcon={true}
                    inline
                    label={
                      <Avatar
                        alt="User settings"
                        img={`${
                          userImage
                            ? userImage
                            : 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png'
                        }`}
                        rounded
                      />
                    }
                  >
                  
                    <Dropdown.Header>
                      <span className="flex items-center justify-center text-xl m-2 ">
                        {user?.username ?? 'Anonymous User'}
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {user?.email ?? 'this user not have email yet'}
                      </span>
                    </Dropdown.Header>
                    {user?.roleName === 'ADMIN' && (
                      <Link to="/dashboard">
                        <Dropdown.Item>DASHBOARD</Dropdown.Item>
                      </Link>
                    )}

                    <Link to="/profile">
                      <Dropdown.Item>PROFILE</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Link to="/" onClick={handleLogOut}>
                      <Dropdown.Item>LOGOUT</Dropdown.Item>
                    </Link>
                  </Dropdown>
                </div>
              ) : (
                <Navbar.Collapse>
                  <div className="flex justify-center items-center">
                    <ul className="flex justify-center items-center ">
                      <li>
                        <Link to="/login">
                          <button className="btn btn-outline btn-success">
                            LOGIN
                          </button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/register">
                          <button className="btn btn-info ml-4">
                            REGISTER
                          </button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Navbar.Collapse>
              )}
            </Navbar>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
