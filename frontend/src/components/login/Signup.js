import './signup.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'; 

function SignUp() {
    var SignUpName;
    var SignUpPassword;
    var SignUpUsername;
    var SignUpEmail;
    const [message, setMessage] = useState("");

    const doSignup = async (event) => {
      event.preventDefault();
      var obj = { name: SignUpName.value, email: SignUpEmail.value, username: SignUpUsername.value, password: SignUpPassword.value };
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
        <div className="container"> 
            <h2>Sign Up</h2> 
            <div style={{ margin: '10px 0' }}></div> { }
            <form onSubmit={doSignup}> 
                <div className="form-group">
                    <label htmlFor="username">Name:</label>
                    <input
                        type="text"
                        id="name" 
                        value={SignUpName} 
                        ref={(c) => (SignUpName = c)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username" 
                        value={SignUpUsername} 
                        ref={(c) => (SignUpUsername = c)}
                        required
                    />
                </div>
                <div className="form-group"> 
                    <label htmlFor="email">Email:</label> 
                    <input
                        type="email" 
                        id="email" 
                        value={SignUpEmail} 
                        ref={(c) => (SignUpEmail = c)}
                        required
                    />
                </div>
                <div className="form-group"> 
                    <label htmlFor="password">Password:</label> 
                    <input
                        type="password" 
                        id="password" 
                        value={SignUpPassword} 
                        ref={(c) => (SignUpPassword = c)}
                        required
                    />
                </div>
                <Button type="submit" variant="outline-primary" onClick={doSignup}>Sign Up</Button>{' '}
                <Button variant="secondary" onClick={goHome} className='homne-button'> Home </Button>
                
            </form>
        </div>
    );
}

export default SignUp; // Export SignUp component for use in other parts of the application