import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { verifyResetToken, updatePassword } from "../../api/usersAPI";
import Input from "../../components/common/inputs/Input";
import { validatePassword } from "./validations/validation";
import GeneralNote from "../../components/common/notifications/GeneralNote";
import { toast } from "react-toastify";
function PasswordReset() {
  const [newPassword, setNewPassword] = useState({
    password1: "",
    password2: "",
  });
  const handleDetails = ({ target }) => {
    let { name, value } = target;
    setNewPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  let navigate = useNavigate();
  let { resetToken } = useParams();

  const { mutate: updateUserPassword } = useMutation(updatePassword);

  let { data: verified, refetch: verifyToken } = useQuery(
    [resetToken],
    verifyResetToken,
    {
      onSuccess: (data) => {
        toast.success("Password Updated")
        navigate("/login");
      },
      enabled: false,
      refetchOnMount: false,
    }
  );
  const passwordsMatch = useCallback(() => {
    return validatePassword(newPassword.password1, newPassword.password2);
  }, [newPassword]);

  useEffect(() => {
    console.log(resetToken);
    if (!resetToken) {
      navigate("/login");
    } else {
      verifyToken();
    }
    return () => {};
  }, [resetToken]);
  return (
    <>
      {verified ? (
        <>
          <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="max-w-sm w-full bg-white rounded p-6 shadow-md ">
              <div className="flex flex-col gap-4">
                {!passwordsMatch() && (
                  <GeneralNote
                    message={"Passwords do not match"}
                    level={"warning"}
                  />
                )}
                <div>
                  <Input
                    name="password1"
                    value={newPassword.password1}
                    onChange={handleDetails}
                    label="Password"
                  />
                </div>

                <div>
                  <Input
                    name="password2"
                    type="text"
                    value={newPassword.password2}
                    onChange={handleDetails}
                    label="Enter Password Again"
                  />
                </div>

                <button
                  disabled={!passwordsMatch()}
                  onClick={() =>
                    updateUserPassword({
                      passwordResetToken: resetToken,
                      password: newPassword.password1,
                    })
                  }
                  className={`mt-4 text-white font-bold py-2 px-4 rounded ${
                    passwordsMatch() ? "bg-blue-400" : "bg-gray-400"
                  }`}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <p>Invalid reset token. contact your admin</p>
          <button onClick={() => navigate("/login")}>Login</button>
        </>
      )}
    </>
  );
}

export default PasswordReset;
