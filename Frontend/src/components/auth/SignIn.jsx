import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
import BaseContainer from "../form/BaseContainer";
import { Input } from "../MovieMain/UserInput";
import { FiLogIn } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;
  const [loading ,setLoading] = useState(false)
 
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) updateNotification("error",error);
    setLoading(true)
    await handleLogin(userInfo.email, userInfo.password);
    setLoading(false)

  };

  


  useEffect(() => {
    // we want to move our user to somewhere else
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <BaseContainer>
    


      <Input
        value={userInfo.email}
        onChange={handleChange}
        label="Email"
        placeholder="Email"
        name="email"
        type="email"
        bg={true}
      />
      <Input
        value={userInfo.password}
        onChange={handleChange}
        label="Password"
        placeholder="Password"
        name="password"
        type="password"
        bg={true}
      />
      <div>
      <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
       
          <Link to="/auth/signup"> Not A User Sign Up</Link>
        </div>
        <div className=" text-center my-2 text-gray-400 hover:underline hover:text-gray-100">
          <Link to="/auth/forget-password"> Forgot Password</Link>
        </div>
        </div>
      <button 
        onClick={handleSubmit}
        className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 mt-5 rounded-lg w-full"
      >
        {loading?<ClipLoader color="#36d7b7" />: <><FiLogIn /> Sign In</> }
       
      </button>
    </BaseContainer>
  );
}
