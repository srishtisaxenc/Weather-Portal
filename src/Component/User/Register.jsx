
import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import register1 from "../images/register.webp";
import "../Style/Register.css"

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = [];

    // Check for empty fields
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      newErrors.push('All fields are required.');
      return newErrors; // stop here if any field is empty
    }

    // Name validation
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      newErrors.push('Name must contain only letters and spaces.');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.push('Enter a valid email address.');
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.push(
        'Password must be at least 6 characters and include 1 uppercase letter, 1 digit, and 1 special character.'
      );
    }

    // Confirm password match
    if (password !== confirmPassword) {
      newErrors.push('Passwords do not match.');
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      try {
        // const response = await axios.post('http://localhost:8082/weather/add', {
         const response = await axios.post('http://localhost:8080/weather/add', {
       // const response = await axios.post('https://weather.com/weather/add', {
          name,
          emailid: email,
          password
        });

        console.log('✅ Registered:', response.data);
        alert('✅ Registration successful!');
        navigate('/');
      } catch (error) {
        if (error.response?.data?.error) {
          // alert(`⚠️ Registration failed: ${error.response.data.error}`);
           alert(`❌ Something went wrong. `);
        } else {
          alert('❌ Something went wrong.');
        }
        console.error('Registration error:-', error);
      }
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(value.length < 6 ? 'Password must be at least 6 characters.' : '');
  };

  return (
    <MDBContainer fluid>
      {/* <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}> */}
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md='10'
              lg='6'
              className='order-2 order-lg-1 d-flex flex-column align-items-center'
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Firstname Lastname'
                  id='form1'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Your Email'
                  id='form2'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className='mb-1 position-relative'>
                  <MDBInput
                    label='Password'
                    id='form3'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    className='pr-5'
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '16px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      zIndex: 2,
                      color: '#6c757d'
                    }}
                  >
                    <MDBIcon fas icon={showPassword ? 'eye-slash' : 'eye'} />
                  </span>
                </div>
                {passwordError && (
                  <div className="text-danger mb-3">• {passwordError}</div>
                )}

                <div className='mb-4 position-relative'>
                  <MDBInput
                    label='Repeat your password'
                    id='form4'
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={password.length < 6}
                    className='pr-5'
                  />
                  <span
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '16px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      zIndex: 2,
                      color: '#6c757d'
                    }}
                  >
                    <MDBIcon fas icon={showConfirm ? 'eye-slash' : 'eye'} />
                  </span>
                </div>

                <MDBBtn className='mb-3' size='lg' type='submit'>
                  Register
                </MDBBtn>


                <MDBBtn
                  color="secondary"
                  className="mb-3 me-2"
                  size="lg"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  <MDBIcon fas icon="arrow-left" className="me-2" />
                  Back
                </MDBBtn>


                {errors.length > 0 && (
                  <div className="text-danger mt-2">
                    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                      {errors.map((err, idx) => (
                        <li key={idx}>• {err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </form>
            </MDBCol>

            <MDBCol
              md='10'
              lg='6'
              className='order-1 order-lg-2 d-flex align-items-center'
            >
              <MDBCardImage
                // src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
                src={register1}
                fluid
              />
            </MDBCol>
          </MDBRow>
       </MDBCardBody>
      {/* </MDBCard> */}
    </MDBContainer>
  );
}

export default Register;




