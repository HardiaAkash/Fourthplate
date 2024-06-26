import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

import { Link } from "react-router-dom";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const resetToken = params.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/adminauth/resetPassword",
        { password: password },
        {
          headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${resetToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password change successful!");
        setLoading(false);
        navigate("/login");
      } else {
        toast.error("Invalid password!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Failed please try again!");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center lg:min-h-screen  ">
      <div className="md:px-[50px] w-full mx-auto">
        <div className="relative flex flex-col 2xl:gap-x-20 xl:gap-x-10 gap-x-7 min-h-screen justify-center lg:shadow-none  items-center lg:flex-row space-y-8 md:space-y-0 w-[100%] px-[10px]bg-white lg:px-[40px] py-[20px] md:py-[40px] ">
          <div className="w-[100%] lg:w-[60%] xl:w-[50%]">
            <form action="" className="" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 justify-center p-8 lg:p-14 md:max-w-[80%] lg:w-full lg:max-w-[100%] mx-auto ">
                <div className="text-left ">
                  <p className="mb-2 2xl:text-[40px] md:text-[35px] text-[30px] leading-[38px] font-bold">
                    Reset your password
                  </p>
                  <p className=" md:text-[16px] text-[15px] font-[400] leading-[26px] mt-2 mb-4 text-[#494949]">
                    Please enter a new password to access admin dashboard
                  </p>
                </div>
                <div className="md:py-2">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="login-input w-full mt-2 custom-input"
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="login_button"
                  >
                    {isLoading ? "Loading.." : "Reset password"}
                  </button>

                  <Link to="/login">
                    <div className="text-[16px] font-medium underline text-center py-3 cursor-password">
                      Login
                    </div>
                  </Link>
                </div>
              </div>
            </form>
          </div>
          {/* <RightSection /> */}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
