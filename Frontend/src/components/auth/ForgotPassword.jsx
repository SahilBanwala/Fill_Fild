import React, { useState } from "react";
import { forgetPassword } from "../../api/auth";
import { useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
import BaseContainer from "../form/BaseContainer";
import { Link } from "react-router-dom";
import { Input } from "../MovieMain/UserInput";
import { ClipLoader } from "react-spinners";
import { FiLogIn } from "react-icons/fi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { updateNotification } = useNotification();
  const [loading,setLoading] = useState(false)

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email))
      return updateNotification("error", "Invalid email!");
    setLoading(true)
    const { error, message } = await forgetPassword(email);
    setLoading(false)
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
  };
  return (
    <BaseContainer>
      <form
        onSubmit={handleSubmit}
        className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
      >
        <div className="pb-2 pt-4">
          <Input
            onChange={handleChange}
            value={email}
            label="Email"
            placeholder="john@email.com"
            name="email"
            bg={true}
            className="block w-full p-4 text-lg 
                        rounded-sm bg-black"
          />
        </div>
        <div className="flex justify-between pt-4">
          <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
            <Link to="/auth/signup">Sign Up</Link>
          </div>
          <div className="text-right  text-gray-400 hover:underline hover:text-gray-100">
            <Link to="/auth/signin">Sign In</Link>
          </div>
        </div>
        <div className="px-4 pb-2 pt-4">
        <button 
        onClick={handleSubmit}
        className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 mt-4 rounded-lg w-full"
      >
        {loading?<ClipLoader color="#36d7b7" />: <><FiLogIn /> Reset Password</> } 
       
      </button>
        </div>
      </form>
    </BaseContainer>
  );
}
