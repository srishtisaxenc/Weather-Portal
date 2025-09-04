import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import forgotpsw from "../images/register.webp";
function PasswordReset() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  // const API_BASE = 'https://weather.com/weather';
   const API_BASE = 'http://localhost:8080/weather';
  const navigate = useNavigate();
  const sendOtp = async () => {
    if (!email.trim()) {
      alert(':x: Email is required');
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/sendotp`, null, {
        params: { email }
      });
      const message = res.data;
      if (message === 'Email not registered') {
        alert(':x: Email is not registered');
        return;
      }
      alert(message || ':incoming_envelope: OTP sent to email');
      setShowOtpSection(true);
      setEmailSent(true);
    } catch (error) {
      alert(':x: Failed to send OTP');
      console.error(error);
    }
  };
  const verifyOtp = async () => {
    if (!otp.trim()) {
      alert(':x: OTP is required');
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/verifyotp`, null, {
        params: { email, otp }
      });
      if (res.data === true) {
        alert(':white_tick: OTP verified');
        setShowPasswordSection(true);
        setShowOtpSection(false);
      } else {
        alert(':x: Invalid OTP');
      }
    } catch (error) {
      alert(':x: OTP verification failed');
      console.error(error);
    }
  };
  const resetPassword = async () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!newPassword.trim() || !confirmPassword.trim()) {
      alert(':x: All fields are required');
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      alert(':x: Password must be at least 6 characters and include 1 uppercase letter, 1 digit, and 1 special character');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert(':x: Passwords do not match');
      return;
    }
    try {
      const res = await axios.put(`${API_BASE}/${email}/password`, {
        password: newPassword
      });
      alert(res.data || ':lock: Password reset successful');
      // Clear state and redirect
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setShowOtpSection(false);
      setShowPasswordSection(false);
      setEmailSent(false);
      navigate('/');
    } catch (error) {
      if (error.response?.status === 404) {
        alert(':x: Email not registered');
      } else {
        alert(':x: Failed to reset password');
      }
      console.error(error);
    }
  };
  return (
    <MDBContainer fluid className="p-5" style={{ minHeight: '100vh' }}>
      <MDBRow className="align-items-center justify-content-center">
        <MDBCol md="6" lg="6" className="d-none d-md-block">
          <MDBCardImage
            src={forgotpsw}
            alt="Forgot Password Illustration"
            fluid
          />
        </MDBCol>
        <MDBCol md="6" lg="4">
          <h3 className="text-center fw-bold mb-4">Forgot Password</h3>
          {/* Email Input */}
          {!showPasswordSection && (
            <div className="mb-4">
              <MDBInput
                label="Email address"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={emailSent}
              />
              {!emailSent && (
                <MDBBtn block className="mt-3" onClick={sendOtp}>
                  Send OTP
                </MDBBtn>
              )}
            </div>
          )}
          {/* OTP Input */}
          {showOtpSection && !showPasswordSection && (
            <div className="mb-4">
              <MDBInput
                label="Enter OTP"
                type="text"
                size="lg"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <MDBBtn block className="mt-3" color="success" onClick={verifyOtp}>
                Verify OTP
              </MDBBtn>
            </div>
          )}
          {/* New Password Section with Cancel Button */}
          {showPasswordSection && (
            <div className="mb-4">
              <MDBInput
                label="New Password"
                type="password"
                size="lg"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <MDBInput
                label="Confirm Password"
                type="password"
                size="lg"
                className="mt-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="d-flex justify-content-between mt-3">
                <MDBBtn color="warning" onClick={resetPassword}>
                  Reset Password
                </MDBBtn>
                <MDBBtn color="secondary" onClick={() => navigate('/')}>
                  Cancel
                </MDBBtn>
              </div>
            </div>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default PasswordReset;




//----------------------------------------------------------------------

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCardImage,
//   MDBInput,
//   MDBBtn
// } from 'mdb-react-ui-kit';
// import forgotpsw from "../images/register.webp";
// function PasswordReset() {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showOtpSection, setShowOtpSection] = useState(false);
//   const [showPasswordSection, setShowPasswordSection] = useState(false);
//   const [emailSent, setEmailSent] = useState(false);
//   const [passwordError, setPasswordError] = useState('');
//   const API_BASE = 'https://weather.com/weather';
//   const navigate = useNavigate();
//   const sendOtp = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/sendotp`, null, {
//         params: { email }
//       });
//       alert(res.data || ':incoming_envelope: OTP sent to email');
//       setShowOtpSection(true);
//       setEmailSent(true);
//     } catch (error) {
//       alert(' Failed to send OTP');
//       console.error(error);
//     }
//   };
//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/verifyotp`, null, {
//         params: { email, otp }
//       });
//       if (res.data === true) {
//         alert('OTP verified');
//         setShowPasswordSection(true);
//         setShowOtpSection(false);
//       } else {
//         alert(' Invalid OTP');
//       }
//     } catch (error) {
//       alert(' OTP verification failed');
//       console.error(error);
//     }
//   };
//   const resetPassword = async () => {
//     if (newPassword.length < 6 || confirmPassword.length < 6) {
//       setPasswordError(':warning: Password must be at least 6 characters long');
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setPasswordError(':warning: Passwords do not match');
//       return;
//     }
//     try {
//       const res = await axios.put(`${API_BASE}/${email}/password`, {
//         password: newPassword
//       });
//       alert(res.data || ':lock: Password reset successful');
//       // Clear state and redirect
//       setEmail('');
//       setOtp('');
//       setNewPassword('');
//       setConfirmPassword('');
//       setShowOtpSection(false);
//       setShowPasswordSection(false);
//       setEmailSent(false);
//       setPasswordError('');
//       navigate('/');
//     } catch (error) {
//       alert(' Failed to reset password');
//       console.error(error);
//     }
//   };
//   return (
//     <MDBContainer fluid className="p-5" style={{ minHeight: '100vh' }}>
//       <MDBRow className="align-items-center justify-content-center">
//         <MDBCol md="6" lg="6" className="d-none d-md-block">
//           <MDBCardImage
//             src={forgotpsw}
//             alt="Forgot Password Illustration"
//             fluid
//           />
//         </MDBCol>
//         <MDBCol md="6" lg="4">
//           <h3 className="text-center fw-bold mb-4">Forgot Password</h3>
//           {/* Email Input */}
//           {!showPasswordSection && (
//             <div className="mb-4">
//               <MDBInput
//                 label="Email address"
//                 type="email"
//                 size="lg"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 readOnly={emailSent}
//               />
//               {!emailSent && (
//                 <MDBBtn block className="mt-3" onClick={sendOtp}>
//                   Send OTP
//                 </MDBBtn>
//               )}
//             </div>
//           )}
//           {/* OTP Input */}
//           {showOtpSection && !showPasswordSection && (
//             <div className="mb-4">
//               <MDBInput
//                 label="Enter OTP"
//                 type="text"
//                 size="lg"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <MDBBtn block className="mt-3" color="success" onClick={verifyOtp}>
//                 Verify OTP
//               </MDBBtn>
//             </div>
//           )}
//           {/* New Password Section */}
//           {showPasswordSection && (
//             <div className="mb-4">
//               <MDBInput
//                 label="New Password"
//                 type="password"
//                 size="lg"
//                 value={newPassword}
//                 onChange={(e) => {
//                   setNewPassword(e.target.value);
//                   setPasswordError('');
//                 }}
//               />
//               <MDBInput
//                 label="Confirm Password"
//                 type="password"
//                 size="lg"
//                 className="mt-3"
//                 value={confirmPassword}
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value);
//                   setPasswordError('');
//                 }}
//               />
//               {passwordError && (
//                 <div style={{ color: 'red', marginTop: '10px' }}>
//                   {passwordError}
//                 </div>
//               )}
//               <MDBBtn block className="mt-3" color="warning" onClick={resetPassword}>
//                 Reset Password
//               </MDBBtn>
//             </div>
//           )}
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }
// export default PasswordReset;