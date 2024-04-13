import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
import BaseContainer from "../form/BaseContainer";
import { Link } from "react-router-dom";
import { Input } from "../MovieMain/UserInput";
import { FiLogIn } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

const validateUserInfo = ({ name, email, password }) => {
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return  updateNotification("error", error);
     setLoading(true)
    const response = await createUser(userInfo);
    setLoading(false)
    if (response.error) return updateNotification("error","error");

    updateNotification("success","Registration Successfull Verify  to Continue");

    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,
    });
  };

  useEffect(() => {
    // we want to move our user to somewhere else
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);
  const [loading,setLoading] = useState(false)

  const { name, email, password } = userInfo;
  return (
    <BaseContainer>
      <form
        onSubmit={handleSubmit}
        className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
      >
        <div className="pb-2 pt-4">
          <Input
            value={name}
            onChange={handleChange}
            label="Name"
            placeholder="Name"
            name="name"
            bg={true} 
          />
        </div>
        <div className="pb-2 pt-4">
          <Input
            value={userInfo.email}
            onChange={handleChange}
            label="Email"
            placeholder="Email"
            name="email"
            bg={true}
            className="block w-full p-4 text-lg 
                        rounded-sm bg-black"
          />
        </div>
        <div className="pb-2 pt-4">
          <Input
            className="block w-full p-4 text-lg rounded-sm bg-black"
            value={userInfo.password}
            onChange={handleChange}
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            bg={true}
          />
        </div>

        <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
          <Link to="/auth/signin"> Already a User Sign In</Link>
        </div>
        <div className="px-4 pb-2 pt-4">
          <button
            onClick={handleSubmit}
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {loading ? (
              <ClipLoader color="#36d7b7" />
            ) : (
              <>
                <FiLogIn /> Sign Up
              </>
            )}
          </button>
        </div>
      </form>
    </BaseContainer>
  );
}
