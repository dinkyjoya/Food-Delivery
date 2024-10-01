import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { otpVerification } from "../Redux/Action";
import { useNavigate } from "react-router-dom";
import "./OtpVerify.css";
import { toast, Toaster } from "sonner";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.User.isLoading);
  const success = useSelector((state) => state.User.success);
  const error = useSelector((state) => state.User.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(otpVerification(otp, navigate));
  };

 
  console.log(success)
  console.log(error)
  // useEffect(() => {
  //   if (success) {
  //     toast.success(success);
  //   }
  // }, [success]);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  //   console.log("error", error);
  // }, [error]);

  return (
    <div className="body-img">
      <Toaster richColors position="top-right"></Toaster>
      <div className="form-container">
        <div className="col-1">
          <div className="image-layer">
            <img
              src="/images/white-outline.png"
              alt="white-outline"
              className="form-image-main"
            />
            <img
              src="/images/food-delivery.png"
              alt="delivery"
              className="form-image delivery"
              width={400}
              height={400}
            />
          </div>
          <p className="featured-words">Take a seat, grab a treat</p>
        </div>

        <div className="col-2">
          <div className="otp-form">
            <div className="form-title">
              <h2>OTP VERIFICATION</h2>
            </div>

            <form onSubmit={handleSubmit} className="form-inputs">
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Otp"
                  id="otp"
                  name="otp"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  required
                />
                <i className="fa-solid fa-envelope"></i>
              </div>
              <button type="submit" className="input-submit">
                Otp Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
