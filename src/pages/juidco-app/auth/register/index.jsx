import React from 'react';
import { Link } from 'react-router-dom';
import SendOTPForm from './SendOTPForm';
import VerifyOTPForm from './VerifyOTPForm';
import RegisterForm from './RegisterForm';

export default function Register() {
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState({
    otp: '',
    mobileNo: '',
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    aadhar: '',
    isSpeciallyAbled: 0,
    isArmedForce: 0,
    aadharDoc: null,
    photo: null
  });

  const makeRequest = (newData) => {
    console.log(newData);
    // setPage(1);
  };
  const handleNextStep = (newData, finalStep = false) => {
    setData({ ...data, ...newData });
    if (finalStep) {
      makeRequest(newData);
      return;
    }
    setPage(page + 1);
  };
  const handlePrevStep = (newData) => {
    setData({ ...data, ...newData });
    setPage(page - 1);
  };

  return (
    <div>
      {
        {
          0: (
            <SendOTPForm data={data} next={handleNextStep} setData={setData} />
          ),
          1: (
            <VerifyOTPForm
              data={data}
              setData={setData}
              next={handleNextStep}
              prev={handlePrevStep}
            />
          ),
          2: (
            <RegisterForm
              data={data}
              setData={setData}
              next={handleNextStep}
              prev={handlePrevStep}
            />
          )
        }[page]
      }
      <div className="text-center mt-4">
        <Link to="/juidco-app/auth/login" className="text-[#5846BE]">
          Click here to Login
        </Link>
      </div>
    </div>
  );
}
