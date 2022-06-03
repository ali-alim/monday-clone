import logo from "./../images/crm-logo.png"
import {useNavigate} from 'react-router-dom'


const Nav = () => {

  const navigate = useNavigate()
  
  return (
    <nav>
      <div className="logo-container">
        {/* <img src={logo} alt="logo" /> */}
        <img src="https://i.pinimg.com/736x/f4/67/f1/f467f1fd1243bd0fdb16c3272e36ae45.jpg" alt="logo" />
      </div>
      <div className="controls-container">
        <div className="icon" onClick={() => navigate('/ticket')}>&#10133;</div>
        <div className="icon" onClick={() => navigate('/')}>❮❮</div>
      </div>
    </nav>
  );
};

export default Nav;
