import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { sideMenus } from "./config/data";
import CloseIcon from "./admin-pages/Svg/CloseIcon";

const AdminDashboard = () => {
  const [ComponentId, setComponentId] = useState(0);
  const [showDrawer, setShowDrawer] = useState(false);

  const navigate = useNavigate();

  const handleClick = (id, url) => {
    setComponentId(id);
    setShowDrawer(false);
  };

  const token = JSON.parse(localStorage.getItem("admin_token"));

  const handleSignout = async () => {
    try {
      const res = await axios.get(
        "http://34.242.24.155:5000/api/adminauth/logout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res?.data?.success) {
        localStorage.removeItem("admin_token");
        toast.success("Logout successfully !");
        navigate("/");
      } else {
        toast.error("Logout failed try again !");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error(error?.response?.data?.message || "Invalid token !");
    }
  };

  return (
    <section className="">
      <div className="flex min-h-screen relative  lg:static">
        <div
          className="py-2 px-3  absolute top-4 left-2 flex flex-col gap-[5px] cursor-pointer lg:hidden"
          onClick={() => setShowDrawer(true)}
        >
          <div className="bg-black h-[2px] w-[20px]"></div>
          <div className="bg-black h-[2px] w-[20px]"></div>
          <div className="bg-black h-[2px] w-[20px]"></div>
        </div>

        <div
          className={`xl:w-[20%] lg:w-[25%]  w-[280px] md:h-auto h-full z-[11] bg-theme-color text-white xl:py-[20px] xl:px-[30px] px-[10px] py-[10px] transition-all duration-1000 delay-100 ease-linear
                 ${
                   showDrawer
                     ? "block  absolute top-0 left-0 min-h-screen is-show"
                     : "hidden lg:block"
                 }`}
        >
          <div
            className="relative text-white  flex flex-col gap-[5px] cursor-pointer lg:hidden  text-right mr-3 mt-2"
            onClick={() => setShowDrawer(false)}
          >
            <div className="">
              {" "}
              <CloseIcon />{" "}
            </div>
          </div>
          <div className="">
            <div className="flex justify-center items-center whitespace-pre-wrap py-[20px]">
              <h1 className="bold-32 text-center whitespace-nowrap text-xl">
                Admin Dashboard
              </h1>
            </div>
            <div className="bg-white h-[1px] w-[70%] mx-auto"></div>
            <div className="flex flex-col 2xl:gap-6 gap-5 pt-[60px]">
              {sideMenus.map((item, index) => (
                <div
                  key={index}
                  className={`pl-6 py-3 mx-5 rounded-md  flex gap-x-3 items-center cursor-pointer  transition-colors medium-16 bg-[#0f2439] 
                                    ${
                                      item.id === ComponentId
                                        ? "bg-theme-secondary text-green-800"
                                        : "hover:bg-theme-secondary hover:text-green-800 hover:rounded-md "
                                    }  `}
                  onClick={() => handleClick(item.id, item.url)}
                >
                  {item?.icon}
                  <p className=" capitalize whitespace-nowrap ">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-white h-[1px] w-[70%] mx-auto mt-[100px]"></div>
          </div>

          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer my-3 flex items-center transition-colors dash-menu gap-x-3  medium-16 hover:bg-theme-secondary hover:text-green-800 hover:rounded-md  bg-[#0f2439] }`}
            onClick={handleSignout}
          >
            {/* <LogoutIcon /> */}
            <div>
              <p>Sign Out</p>
            </div>
          </div>
        </div>
        <div className=" bg-[#f3f3f3] xl:w-[80%] lg:w-[75%] w-full">
          {sideMenus.map((item, index) => (
            <Fragment key={index}>
              {ComponentId === item.id && item.component}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
