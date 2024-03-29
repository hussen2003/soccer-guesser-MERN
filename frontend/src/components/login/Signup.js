import './signup.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'; 
import Alert from'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const app_name = 'soccerdle-mern-ace81d4f14ec'
function buildPath(route)
{
  if (process.env.NODE_ENV === 'production')
  {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  }
  else
  {
    return 'http://localhost:5001/' + route;
  }
}

function SignUp() {
    const [SignUpName, setSignUpName] = useState("");
    const [SignUpPassword, setSignUpPassword] = useState("");
    const [SignUpUsername, setSignUpUsername] = useState("");
    const [SignUpEmail, setSignUpEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(true);

    const aboutus = async (event) => {
      event.preventDefault();
      setMessage("success?");
      window.location.href = "/AboutPage";
    }

    const doSignup = async (event) => {
      event.preventDefault();
      var obj = { name: SignUpName, email: SignUpEmail, username: SignUpUsername, password: SignUpPassword }; // maybe SignUpName.target.value
      var js = JSON.stringify(obj);
      try {
        const response = await fetch(buildPath('api/auth/signup'), {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        });
        var res = JSON.parse(await response.text());
  
        if (res.error) {
          setError(res.error);
          return;
        } else {
          var user = {
            _id: res._id,
            name: res.name,
            email: res.email,
            username: res.username,
            score: res.score,
          };
          localStorage.setItem("user_data", JSON.stringify(user));
          setMessage("success?");
          window.location.href = "/";
          //alert(res.error);
          setError(error);
        }
      } catch (e) {
        alert(e.toString());
        return;
      }
    };
    const goHome = () => {
        window.location.href = "/"; 
    };

    return (
        <div className="signup-container"> 
            <h2>Sign Up</h2> 
            {(error!=="Username already exists") && (error === "Internal Server Error") && (<p style={{ color: 'red' , fontWeight: 'bold'}}>Make sure every field is filled out</p>)}
            {(error==="User created successfully, verification email sent") && (<Alert variant="success">
              <Alert.Heading>GOAL!</Alert.Heading>
              <p>
                User created successfully. Navigate to your email to verify your account.
              </p>
              <hr />
              <p className="mb-0">
                Click the red Home button below to Log back in! 
              </p>
            </Alert>)}
            <form onSubmit={doSignup}> 
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name" 
                        value={SignUpName} 
                        // ref={(c) => (SignUpName = c)}
                        onChange={(e) => setSignUpName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username" 
                        value={SignUpUsername} 
                        onChange={(e) => setSignUpUsername(e.target.value)}
                        required
                    />
                    {error && (error==="Username already exists") && (<p style={{ color: 'red' , fontWeight: 'bold'}}>{error}</p>)}
                </div>
                <div className="form-group"> 
                    <label htmlFor="email">Email:</label> 
                    <input
                        type="email" 
                        id="email" 
                        value={SignUpEmail} 
                        // ref={(c) => (SignUpEmail = c)}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group"> 
                    <label htmlFor="password">Password:</label> 
                    <input
                        type="password" 
                        id="password" 
                        value={SignUpPassword} 
                        // ref={(c) => (SignUpPassword = c)}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        required
                    />
                </div>
                <Button onClick = {doSignup}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4CAF50'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#90ee90'}
                style={{ position: 'relative', top: '1vh', right: '5px', padding: '10px 20px', backgroundColor: '#90ee90', color: 'rgb(0, 0, 0)', fontSize: '15px', width: '100px', height: '40px', transition: 'background-color 0.3s', border: 'none', margin: '13px 0'}}
                >Sign Up</Button>
                <Button onClick = {goHome}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#db2e2e'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ed6d6d'}
                style={{ position:'relative', top: '1vh', right: '-10px', padding: '10px 20px', backgroundColor: '#ed6d6d', color: 'rgb(0, 0, 0)', fontSize: '15px', width: '100px', height: '40px', transition: 'background-color 0.3s', border: 'none',margin: '13px 0'}}
                >Home</Button>
                <Button onClick = {aboutus}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4CAF50'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#90ee90'}
                style={{ position: 'relative', top: '-61vh', right: '-42vw', padding: '10px 20px', backgroundColor: '#90ee90', color: 'rgb(0, 0, 0)', fontSize: '15px', width: '150px', height: '40px', transition: 'background-color 0.3s', border: 'none'}}
                >About Us</Button>
                
            </form>
        </div>
    );
}

export default SignUp; // Export SignUp component for use in other parts of the application