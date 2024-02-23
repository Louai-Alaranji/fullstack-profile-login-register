import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login'
import Profile from './Profile'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInEmail, setLoggedInEmail] = useState('');

    const handleLoginSuccess = (email) => {
      setIsLoggedIn(true);
      setLoggedInEmail(email);
    };

    return (
        <div>
            {isLoggedIn ? <Profile email={loggedInEmail} /> : <Login onLoginSuccess={handleLoginSuccess} />}
        </div>
    );
}


export default App
