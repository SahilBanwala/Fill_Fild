import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendEmailVerificationToken, verifyUserEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import Submit from "../form/Submit";
import Title from "../form/Title";
import BaseContainer from "../form/BaseContainer";


const OTP_LENGTH = 6;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};


export default function EmailVerification() {

    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  console.log(profile)
  const isVerified = profile?.isVerified;
  console.log(`Is verified is ${isVerified}`)

  const inputRef = useRef();
  const { updateNotification } = useNotification();

  const { state } = useLocation();
  const user = state?.user;

  const navigate = useNavigate();

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;

    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(index);
    else focusNextInputField(index);

    setOtp([...newOtp]);
  };

  const handleOTPResend = async () => {
    const { error, message } = await resendEmailVerificationToken(user.id);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
  };

  const handleKeyDown = ({ key }, index) => {
    if (key === "Backspace") {
      focusPrevInputField(index);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) return updateNotification("error", "invalid OTP");

    // submit otp
    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
    });
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
    console.log(isLoggedIn,isVerified)
  }, [user, isLoggedIn, isVerified]);

  // if(!user) return null;

  return (
    <BaseContainer>
        <div className="w-full py-6 z-20">
         
          
         <p className="text-gray-100 ">{/* or use email your account */}</p>
         <form
           onSubmit={handleSubmit}
           className="sm:w-2/3 w-full px-4 lg: mx-auto"
         >
             <div className="pb-2 pt-4">
             <div>
         <Title>Please enter the OTP to verify your account</Title>
         <p className="text-center dark:text-dark-subtle text-light-subtle">
           OTP has been sent to your email
         </p>
       </div>

       <div className="flex justify-center items-center space-x-4 mt-5">
         {otp.map((_, index) => {
           return (
             <input
               ref={activeOtpIndex === index ? inputRef : null}
               key={index}
               type="number"
               value={otp[index] || ""}
               onChange={(e) => handleOtpChange(e, index)}
               onKeyDown={(e) => handleKeyDown(e, index)}
               className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle focus:border-white  rounded bg-transparent outline-none text-center text-white  font-semibold text-xl spin-button-none"
             />
           );
         })}
       </div>

       <div className="mt-10">
         <Submit value="Verify Account" />
        
       </div>
       <button
           onClick={handleOTPResend}
           type="button"
           className="w-full  dark:text-white flex items-center justify-center text-blue-500 font-semibold hover:underline mt-3"
         >
           I don't have OTP
         </button>
             </div>
         </form>
       </div>
    </BaseContainer>
   
  )
}
