import React from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { login } from "../../api/AuthAPI";
import useAuthStore from "../../stores/AuthStore";
import GeneralNote from "../../components/common/notifications/GeneralNote";
import Input from "../../components/common/inputs/Input";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate()
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(null)
  const { setAuthenticated } = useAuthStore((state) => state);
  const { data, mutate: doLogin } = useMutation(login, {
    onSuccess: (user) => {
      setAuthenticated(true, user)
      navigate('/')
    },
    onError: (data) => {
      setLoginError(data.response.data.message)
      setLoginDetails({ email: "", password: "" })
    },
  });

  const handleDetails = ({ target }) => {
    let { name, value } = target;
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLogin = () => {
    doLogin(loginDetails);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="max-w-sm w-full bg-white rounded p-6 shadow-md">
        {loginError && <GeneralNote message={loginError} level={"warning"} />}
     
        <div className="flex flex-col gap-4">
          <div>
            <Input name="email" placeholder="example@example.com" value={loginDetails.email} onChange={handleDetails} label="Email" />
           
          </div>

          <div>
          <Input name="password" type="password" value={loginDetails.password} onChange={handleDetails} label="Password" />
          </div>

          <button
            onClick={handleLogin}
            className="mt-4 bg-blue-400  text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
