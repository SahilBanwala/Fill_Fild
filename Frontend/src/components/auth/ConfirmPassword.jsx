import React, { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import BaseContainer from "../form/BaseContainer";
import { Link } from "react-router-dom";
import { Input } from "../MovieMain/UserInput";
import { FiLogIn } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

export default function ConfirmPassword() {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  // isValid,  !isValid

  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }

    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }

    setIsValid(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.one.trim())
      return updateNotification("error", "Password is missing!");

    if (password.one.trim().length < 8)
      return updateNotification("error", "Password must be 8 characters long!");

    if (password.one !== password.two)
      return updateNotification("error", "Password do not match!");
    setLoading(true)
    const { error, message } = await resetPassword({
      newPassword: password.one,
      userId: id,
      token,
    });
    setLoading(false)

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    navigate("/auth/signin", { replace: true });
  };

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait we are verifying your token!
            </h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );

  if (!isValid)
    return (
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            Sorry the token is invalid!
          </h1>
        </Container>
      </FormContainer>
    );

  return (
    <BaseContainer>
      <form
        onSubmit={handleSubmit}
        className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
      >
        <div className="pb-2 pt-4">
          <Input
            value={password.one}
            onChange={handleChange}
            label="New Password"
            placeholder="New Password"
            name="one"
            type="password"
            bg={true}
            className="block w-full p-4 text-lg 
                        rounded-sm bg-black"
          />
        </div>
        <div className="pb-2 pt-4">
          <Input
            value={password.two}
            onChange={handleChange}
            label="Confirm Password"
            placeholder="Confirm Password"
            name="two"
            type="password"
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
        className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
      >
        {loading?<ClipLoader color="#36d7b7" />: <><FiLogIn />  Reset Password</> }
       
      </button>
        </div>
      </form>
    </BaseContainer>
  );
}
