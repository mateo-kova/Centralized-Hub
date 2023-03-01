/* eslint-disable react-hooks/exhaustive-deps */
import Button from "components/Button";
import Input from "components/Input";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function SignInPage(props: {
  startLoading: Function;
  closeLoading: Function;
  pageLoading: boolean;
}) {
  const [email, setEmail] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [passConfirm, setPassConfirm] = useState<string>("");
  const [passLevelMsg, setPassLevelMsg] = useState<string>("Too weak");
  const [passValidations, setPassValidations] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [receiveBT, setReceiveBT] = useState<string>("checked");
  const [currentStep, setCurrentStep] = useState<number>(0);

  const subTitleArray = [
    "Your email is used to log in",
    "Tell us how old are you",
    "What is your gamertag?",
    "Keep it to yourself!",
  ];
  const labelArray = ["Your Email", "Date of Birth", "GamerTag", "Password"];

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBirthInputChange = (e) => {
    setBirth(e.target.value);
  };

  const handleTagInputChange = (e) => {
    setTag(e.target.value);
  };

  const handlePassInputChange = useCallback(
    (e) => {
      const pass: string = e.target.value ?? "";
      let validations = Object.assign(passValidations);
      const regex = /[a-zA-Z0-9]/;
      const spRegex = /[^a-zA-Z0-9]/g;
      let count = 0;
      validations[2] = regex.test(pass);
      count += regex.test(pass) ? 1 : 0;
      validations[1] = pass.length > 7;
      count += pass.length > 7 ? 1 : 0;
      count += spRegex.test(pass) ? 1 : 0;
      count += pass.length > 11 ? 1 : 0;
      validations[0] = count > 1;
      switch (count) {
        case 1:
          setPassLevelMsg("Too weak");
          break;
        case 2:
          setPassLevelMsg("Better");
          break;
        case 3:
          setPassLevelMsg("Strong");
          break;
        case 4:
          setPassLevelMsg("Very String");
          break;
        default:
          setPassLevelMsg("Too weak");
      }
      if (!pass) setPassLevelMsg("");
      console.log(count, validations);
      setPassValidations(validations);
      setPass(e.target.value);
    },
    [passValidations]
  );

  const handlePassConfirmInputChange = (e) => {
    setPassConfirm(e.target.value);
  };

  const handleReceiveBTCheckBoxChange = (e) => {
    if (!e.target.checked) setReceiveBT("");
    else setReceiveBT("checked");
  };

  const handleNextBtnClicked = () => {
    setCurrentStep((currentStep) => (currentStep < 3 ? currentStep + 1 : 0));
  };

  return (
    <>
      <main className="h-[calc(100%-100px)]">
        <div className="container w-full h-full mx-auto flex justify-center items-center">
          <div className="main-content text-3xl sm:bg-white max-w-full w-[380px] sm:h-[460px] h-auto p-12 font-semibold -translate-y-[50px]">
            <div className="text-2xl tracking-wider uppercase text-center">
              Create an Account
            </div>
            <div className="mx-auto w-[92%] h-0.5 flex">
              {new Array(4).fill(0).map((_, idx) => (
                <div
                  className={`w-1/4 h-full ${
                    currentStep === idx ? "bg-green-400" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="text-xs tracking-wider text-center text-gray-500 mt-4">
              {subTitleArray[currentStep]}
            </div>
            <div className="w-full mt-8">
              {currentStep === 0 && (
                <Input
                  className="border-0"
                  value={email}
                  placeholder={labelArray[currentStep]}
                  title={labelArray[currentStep]}
                  onChange={handleEmailInputChange}
                />
              )}
              {currentStep === 1 && (
                <Input
                  className="border-0"
                  value={birth}
                  placeholder={labelArray[currentStep]}
                  title={labelArray[currentStep]}
                  onChange={handleBirthInputChange}
                />
              )}
              {currentStep === 2 && (
                <Input
                  className="border-0"
                  value={tag}
                  placeholder={labelArray[currentStep]}
                  title={labelArray[currentStep]}
                  onChange={handleTagInputChange}
                />
              )}
              {currentStep === 3 && (
                <Input
                  className="border-0"
                  value={pass}
                  placeholder={labelArray[currentStep]}
                  title={labelArray[currentStep]}
                  type="password"
                  error={passLevelMsg}
                  onChange={handlePassInputChange}
                />
              )}
            </div>
            {currentStep === 0 && (
              <div className="text-xs text-black mt-4 flex space-x-2">
                <Input
                  type="checkbox"
                  // className="appearance-none bg-black rounded-full"
                  value={receiveBT}
                  onChange={handleReceiveBTCheckBoxChange}
                />
                <p>
                  Receive news, special offers, and playtest invitatinos from
                  Block Tackle Inc.
                </p>
              </div>
            )}
            {currentStep === 3 && (
              <>
                <div className="text-xs text-black ml-6 mt-4 flex space-x-2">
                  <span
                    className={`${
                      passValidations[0] ? "bg-green-400" : "bg-gray-400"
                    } rounded-full w-3.5 h-3.5 text-white flex justify-center items-center text-[8px]`}
                  >
                    {passValidations[0] ? "✔" : "X"}
                  </span>
                  <p>Must be Okay strength or better.</p>
                </div>
                <div className="text-xs text-black ml-6 mt-1 flex space-x-2">
                  <span
                    className={`${
                      passValidations[1] ? "bg-green-400" : "bg-gray-400"
                    } rounded-full w-3.5 h-3.5 text-white flex justify-center items-center text-[8px]`}
                  >
                    {passValidations[1] ? "✔" : "X"}
                  </span>
                  <p> Password is at least 8 characters long.</p>
                </div>
                <div className="text-xs text-black ml-6 mt-1 flex space-x-2">
                  <span
                    className={`${
                      passValidations[2] ? "bg-green-400" : "bg-gray-400"
                    } rounded-full w-3.5 h-3.5 text-white flex justify-center items-center text-[8px]`}
                  >
                    {passValidations[2] ? "✔" : "X"}
                  </span>
                  <p> Password contains at least one letter or number.</p>
                </div>
                <div className="w-full mt-4">
                  <Input
                    className="border-0"
                    value={passConfirm}
                    placeholder={"Confirm password"}
                    title={"Confirm password"}
                    type="password"
                    onChange={handlePassConfirmInputChange}
                  />
                </div>
              </>
            )}
            <div className="control-box flex flex-col items-center">
              <Button
                label={currentStep === 3 ? "Let's Go!" : "Next"}
                className={`border-2 border-stone-300 text-stone-400 text-xl uppercase tracking-widest w-[144px] ${
                  currentStep === 0
                    ? "mt-20"
                    : currentStep === 3
                    ? "mt-2"
                    : "mt-32"
                }`}
                onClick={handleNextBtnClicked}
              />
              {currentStep === 0 && (
                <div className="text-sm uppercase text-center mt-4">
                  <Link href="/signin">
                    <p className="hover:underline">Already have an account?</p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
