import Login from "./Login.jsx";
import { useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const Home = () => {
  const [isHome, isLogin] = useState(true);

  const SwitchToggler = () => {
    isLogin(!isHome);
  };

  return (
    <>
      <div
        className="hero min-h-screen font-mono"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-neutral-content text-center w-full">
          <div className="max-w-lg sm:px-6 lg:px-8 w-full">
            {isHome ? (
              <>
                <h1 className="mb-5 text-8xl sm:text-4xl lg:text-5xl font-bold">
                  Tru
                  <span className="text-error">I</span>
                  <span className="text-info">D</span>
                </h1>
                <p className="mb-4 text-lg sm:text-base lg:text-lg font-bold">
                  A QR Code Rent Payment System
                </p>
                <p className="mb-8 text-sm sm:text-base font-semibold">
                  "Effortless Rent Management with Tenant Profiles and Secure QR
                  Code Payments for a Modern, Streamlined Leasing Experience."
                </p>
                <div className="flex flex-col sm:flex-row justify-center content-center gap-4 sm:gap-10">
                  <button
                    className="flex justify-center gap-2 text-white btn btn-info rounded-full"
                    onClick={SwitchToggler}
                  >
                    <IoIosArrowDroprightCircle />
                    Get Started
                  </button>
                </div>
              </>
            ) : (
              <Login />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
