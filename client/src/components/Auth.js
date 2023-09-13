import { useState } from "react";

const Auth = () => {
    const [isLogIn, setIsLogin] = useState(true)
    const [error, setError] = useState(null)  
    
    const viewLogIn = (status) =>{
      setError(null)
      setIsLogin(status)
    }

    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2>{isLogIn ? 'Please log in' : 'Please sign up!'}</h2>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            {!isLogIn && <input type="password" placeholder="confirm password"/>}  
            <input type="submit" className="create"/>
            {error && <p>{error}</p>}
          </form>
          <div className="auth-options">
            <button onClick={() => viewLogIn(false)}>Sign Up</button>
            <butoon onClick={() => viewLogIn(true)}>Log In</butoon>
          </div>
        </div>
      </div>
    );
  }
  
  export default Auth;