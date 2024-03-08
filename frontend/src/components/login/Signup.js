import './signup.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'; 

function SignUp() {
    // var SignUpName;
    // var SignUpPassword;
    // var SignUpUsername;
    // var SignUpEmail;
    const [SignUpName, setSignUpName] = useState("");
    const [SignUpPassword, setSignUpPassword] = useState("");
    const [SignUpUsername, setSignUpUsername] = useState("");
    const [SignUpEmail, setSignUpEmail] = useState("");
    const [message, setMessage] = useState("");

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
        const response = await fetch("http://localhost:5001/api/auth/signup", {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        });
        var res = JSON.parse(await response.text());
  
        if (res.error) {
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
          alert("Successfully created account");
        }
      } catch (e) {
        alert(e.toString());
        return;
      }
    };
    const goHome = () => {
        window.location.href = "/"; // Navigate to the home page
    };

    return (
        <div className="signup-container"> 
            <h2>Sign Up</h2> 
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
                        // ref={(c) => (SignUpUsername = c)}
                        onChange={(e) => setSignUpUsername(e.target.value)}
                        required
                    />
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
                style={{ position: 'fixed', top: '67vh', right: '50.4vw', padding: '10px 20px', backgroundColor: '#90ee90', color: 'rgb(0, 0, 0)', fontSize: '15px', width: '100px', height: '40px', transition: 'background-color 0.3s', border: 'none', margin: '13px 0'}}
                >Sign Up</Button>
                <Button onClick = {goHome}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#db2e2e'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ed6d6d'}
                style={{ position: 'fixed', top: '67vh', right: '45.3vw', padding: '10px 20px', backgroundColor: '#ed6d6d', color: 'rgb(0, 0, 0)', fontSize: '15px', width: '100px', height: '40px', transition: 'background-color 0.3s', border: 'none',margin: '13px 0'}}
                >Home</Button>
                <Button onClick = {aboutus}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4CAF50'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#90ee90'}
                style={{ position: 'fixed', top: '10.5vh', right: '4vw', padding: '10px 20px', backgroundColor: '#90ee90', color: 'rgb(0, 0, 0)', fontSize: '15px', width: '150px', height: '40px', transition: 'background-color 0.3s', border: 'none'}}
                >About Us</Button>
                
            </form>
        </div>
    );
}

export default SignUp; // Export SignUp component for use in other parts of the application