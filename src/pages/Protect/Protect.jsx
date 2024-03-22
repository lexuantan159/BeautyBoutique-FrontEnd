import { useNavigate } from 'react-router';
import { getUser } from '../../services/login.js';
import { useEffect } from 'react';
function Protect({ children, setAuth }) {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        console.log('check thong tin cua user');
        await getUser();
        setAuth(() => true);
      } catch (err) {
        alert('You are not authorized to perform this action. Please login');
        navigate('/login');
      }
    }
    checkAuth();
  }, [navigate]);
  return <>{children}</>;
}

export default Protect;
