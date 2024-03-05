import './signup.css';

import React, { useState } from 'react'; // Import React and useState hook from React library

function SignUp() { // Define SignUp functional component
    // State variables to store user input
    const [username, setUsername] = useState(''); // State variable to store username, initialized as an empty string
    const [email, setEmail] = useState(''); // State variable to store email, initialized as an empty string
    const [password, setPassword] = useState(''); // State variable to store password, initialized as an empty string

    // Function to handle form submission
    const handleSubmit = (event) => { // Define handleSubmit function, triggered on form submission
        event.preventDefault(); // Prevent default form submission behavior
        // Send user data to backend or perform desired actions
        console.log('Submitting:', { username, email, password }); // Log user data to console
    };

    return (
        <div className=".container"> {/* Container div for sign-in page */}
            <h2>Sign Up</h2> {/* Heading for sign-in page */}
            {/* Sign-in form */}
            <form onSubmit={handleSubmit}> {/* Form element with handleSubmit function on form submission */}
                {/* Username input */}
                <div className="form-group"> {/* Div for username input */}
                    <label htmlFor="username">Username:</label> {/* Label for username input field */}
                    <input
                        type="text" // Input type text
                        id="username" // Input id attribute
                        value={username} // Input value bound to username state variable
                        onChange={(e) => setUsername(e.target.value)} // OnChange event handler to update username state
                        required // Input field is required
                    />
                </div>
                {/* Email input */}
                <div className="form-group"> {/* Div for email input */}
                    <label htmlFor="email">Email:</label> {/* Label for email input field */}
                    <input
                        type="email" // Input type email
                        id="email" // Input id attribute
                        value={email} // Input value bound to email state variable
                        onChange={(e) => setEmail(e.target.value)} // OnChange event handler to update email state
                        required // Input field is required
                    />
                </div>
                {/* Password input */}
                <div className="form-group"> {/* Div for password input */}
                    <label htmlFor="password">Password:</label> {/* Label for password input field */}
                    <input
                        type="password" // Input type password
                        id="password" // Input id attribute
                        value={password} // Input value bound to password state variable
                        onChange={(e) => setPassword(e.target.value)} // OnChange event handler to update password state
                        required // Input field is required
                    />
                </div>
                {/* Submit button */}
                <button type="submit">Sign In</button> {/* Button to submit form */}
            </form>
        </div>
    );
}

export default SignUp; // Export SignUp component for use in other parts of the application