import Login from "./Login.jsx";
import { useState } from "react";

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
                  <span className="text-red-700">I</span>
                  <span className="text-blue-900">D</span>
                </h1>
                <p className="mb-4 text-lg sm:text-base lg:text-lg font-bold">
                  Tenant Profile and QR Code Rent Payment System
                </p>
                <p className="mb-8 text-sm sm:text-base font-semibold">
                  "Effortless Rent Management with Tenant Profiles and Secure QR
                  Code Payments for a Modern, Streamlined Leasing Experience."
                </p>
                <div className="flex flex-col sm:flex-row justify-center content-center gap-4 sm:gap-10">
                  <button
                    className="w-full sm:w-64 px-4 py-4 font-bold text-md text-white bg-buttonColor rounded-lg"
                    onClick={SwitchToggler}
                  >
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
