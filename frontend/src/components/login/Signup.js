import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './signup.css';

const app_name = 'soccerdle-mern-ace81d4f14ec';
function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  } else {
    return 'http://localhost:5001/' + route;
  }
}

const SignUp = () => {
  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [error, setError] = useState('');

  const inputs = [
    {
      id: 0,
      name: 'name',
      type: 'text',
      placeholder: 'Enter your full name',
      errorMessage: 'Name is required!',
      label: 'Name',
      required: true,
    },
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Enter your username',
      errorMessage: 'Username is required',//"Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      //pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      errorMessage: 'It should be a valid email address!',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      errorMessage: 'Password should be minimum 6 characters',//'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: `^.{6,}$`,//`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`
      required: true,
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Enter your password again',
      errorMessage: "Passwords don't match!",
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
    },
  ];

  const doSignup = async (event) => {
    event.preventDefault();
    var obj = { name: values.name, email: values.email, username: values.username, password: values.password };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(buildPath('api/auth/signup'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      var res = JSON.parse(await response.text());

      if (res.error) {
        setError(res.error);
        return;
      } else if (res.errors) {
        setError(res.errors);
        return;
      } else {
        var user = {
          _id: res._id,
          name: res.name,
          email: res.email,
          username: res.username,
          score: res.score,
        };
        sessionStorage.setItem('user_data', JSON.stringify(user));
        window.location.href = '/';
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const input = inputs.find((input) => input.name === name);
    let isValid = true;

    if (input.required && value === '') {
      isValid = false;
    }
    if (input.pattern && !new RegExp(input.pattern).test(value)) {
      isValid = false;
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: !isValid });
  };

  return (
    <div className="signup-container">
      <form onSubmit={doSignup}>
        <h1>Sign Up</h1>
        {error === 'User created successfully, verification email sent' && (
          <Alert variant="success">
            <Alert.Heading>GOAL!</Alert.Heading>
            <p>User created successfully. Please check your email to verify your account.</p>
          </Alert>
        )}
        {error !== 'User created successfully, verification email sent' && error !== '' && (
          <Alert variant="danger">
            <Alert.Heading>Error!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}
        {inputs.map((input) => (
          <div key={input.id} className="form-group">
            <label>{input.label}</label>
            <input type={input.type} name={input.name} placeholder={input.placeholder} value={values[input.name]} onChange={onChange} required={input.required} pattern={input.pattern} />
            <div className="error" style={{ color: 'red', display: errors[input.name] ? 'block' : 'none' }}>
              {input.errorMessage}
            </div>
          </div>
        ))}
        <Button
          variant="primary"
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#90ee90',
            color: 'rgb(0, 0, 0)',
            fontSize: '15px',
            cursor: 'pointer',
            width: '150px',
            height: '40px',
            transition: 'background-color 0.3s',
            marginRight: '10px',
            marginTop: '10px',
            width: 'calc(100% - 20px)',
          }}
        >
          Sign up
        </Button>
        <div style={{ margin: '20px 0' }}></div> {}
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
      {(error !== 'Email already exists' || error !== 'Username already exists') && error === 'Internal Server Error' && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>Make sure every field is filled out</p>
      )}
    </div>
  );
};

export default SignUp;
