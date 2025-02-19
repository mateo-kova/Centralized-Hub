import { useState, useCallback } from "react";
import Image from "next/image";
import { errorAlertBottom, successAlertBottom } from "components/ToastGroup";
import User from "../assets/user.svg";
import Password from "../assets/password.svg";
import ForgotButton from "../components/ForgotButton";
import Link from "next/link";
import Input from "components/Input";
import Button from "components/Button";
import { forgotPass, reminderTag } from "../actions/forgot";

export default function Forgot(props: {
  startLoading: Function;
  closeLoading: Function;
  pageLoading: boolean;
}) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailForpass, setEmailForpass] = useState<string>("");
  const [resetTag, setResetTag] = useState<number>(0);
  const [resetPassword, setResetPassword] = useState<number>(0);
  const [passLevelStatus, setPassLevelStatus] = useState<string>("success");
  const [passLevelMsg, setPassLevelMsg] = useState<string>("");
  const [validation, setValidation] = useState<boolean>(false);

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i;
    const isValidEmail = emailRegex.test(email);
    setValidation(isValidEmail);
    if (!isValidEmail) {
      setPassLevelStatus("error");
    } else {
      setPassLevelStatus("success");
    }
    console.log(isValidEmail);
  };
  const handleTagInputChange = (e) => {
    setEmailForpass(e.target.value);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i;
    const isValidEmail = emailRegex.test(emailForpass);
    console.log(emailForpass);
    setValidation(isValidEmail);
    if (!isValidEmail) {
      setPassLevelStatus("error");
    } else {
      setPassLevelStatus("success");
    }
    console.log(isValidEmail);
  };

  const handleResetTag = useCallback(async () => {
    if (resetTag === 1) {
      setResetTag(0);
    }
    setResetTag(resetTag + 1);
  }, [resetTag]);
  const handleResetPassword = useCallback(async () => {
    if (resetPassword === 1) {
      setResetPassword(0);
    }
    setResetPassword(resetPassword + 1);
  }, [resetPassword]);

  const ResetPassword = async () => {
    setIsProcessing(true);
    console.log(emailForpass);
    const res = await forgotPass(emailForpass);
    successAlertBottom("Your password reset link was sent to your email");
    setEmailForpass("");
    console.log(res);
    setIsProcessing(false);
  };
  const ResetGamertag = async () => {
    setIsProcessing(true);
    const res = await reminderTag(email);
    successAlertBottom("Your GamerTag was sent to your email");
    setEmail("");
    setIsProcessing(false);
    console.log(res);
  };
  const handleMoveToPass = () => {
    setResetTag(0);
    setResetPassword(1);
  };
  const handleMoveToTag = () => {
    setResetTag(1);
    setResetPassword(0);
  };

  return (
    <>
      <main className="h-[calc(100%-100px)]">
        <div className="container w-full h-full mx-auto flex justify-center items-center">
          <div className="main-content text-3xl sm:bg-white max-w-full w-[380px] sm:h-[460px] h-auto p-12 font-semibold -translate-y-[50px]">
            {resetTag === 0 && resetPassword === 0 && (
              <>
                <div className="text-2xl tracking-wider uppercase text-center">
                  Can't Sign In?
                </div>
                <div className="text-xs tracking-wider text-center text-gray-500 mt-4">
                  Check which option below applies to you for possible
                  solutions.
                </div>
                <div className="w-full mt-8 space-y-8">
                  <ForgotButton
                    className="border-2 text-xs p-4 border-black hover:border-green-500 hover:bg-[#5EF388] "
                    wSize={2}
                    hSize={2}
                    label="FORGOT GAMERTAG"
                    icon={<Image src={User} />}
                    onClick={handleResetTag}
                  ></ForgotButton>
                  <ForgotButton
                    className="border-2 text-xs p-4 border-black hover:border-green-500 hover:bg-[#5EF388] "
                    wSize={2}
                    hSize={2}
                    label="FORGOT PASSWORD"
                    icon={<Image src={Password} />}
                    onClick={handleResetPassword}
                  ></ForgotButton>
                </div>
                <div className="text-xs cursor-pointer text-center mt-28">
                  <Link href="/signin">
                    <p> GO BACK</p>
                  </Link>
                </div>
              </>
            )}
            {resetTag === 1 && (
              <>
                <div className="text-2xl tracking-wider uppercase text-center">
                  Enter Your Email
                </div>
                <div className="text-xs tracking-wider text-center text-gray-500 mt-4">
                  Enter the email address you registered with to recover your
                  Gamertag.
                </div>
                <div className="w-full mt-8 space-y-8">
                  <Input
                    className="border-0"
                    value={email}
                    status={passLevelStatus}
                    placeholder="YOUR EMAIL"
                    title="YOUR EMAIL"
                    onChange={handleEmailInputChange}
                  />
                </div>
                <div
                  className={`${
                    !email
                      ? "hidden"
                      : "w-[70%] text-center mt-4 absolute text-xs"
                  }`}
                >
                  <p>
                    If your email matches an existing account, a recovery email
                    will be sent with your Gamertag. If you do not receive an
                    email within a few minutes, check your spam folder.
                  </p>
                </div>
                <div className="control-box flex flex-col items-center mt-32">
                  <Button
                    label="SUBMIT"
                    isLoading={isProcessing}
                    className={` ${
                      validation === true
                        ? "pl-2 text-xl uppercase tracking-widest w-[144px] bg-[#5EF388]  text-black"
                        : "pl-2 border-2 border-stone-300 text-stone-400 text-xl uppercase tracking-widest w-[144px]"
                    }`}
                    onClick={ResetGamertag}
                  />
                  <div className="text-xs cursor-pointer text-center mt-8">
                    <p onClick={handleMoveToPass}>FORGOT PASSWORD?</p>
                  </div>
                </div>
              </>
            )}
            {resetPassword === 1 && (
              <>
                <div className="text-2xl tracking-wider uppercase text-center">
                  Enter Your Email
                </div>
                <div className="text-xs tracking-wider text-center text-gray-500 mt-4">
                  Enter the email you sign in with to reset your password.
                </div>
                <div className="w-full mt-8 space-y-8">
                  <Input
                    className="border-0"
                    value={emailForpass}
                    status={passLevelStatus}
                    placeholder="YOUR EMAIL"
                    title="YOUR EMAIL"
                    onChange={handleTagInputChange}
                  />
                </div>
                <div
                  className={`${
                    !emailForpass
                      ? "hidden"
                      : "w-[70%] text-center mt-4 absolute text-xs"
                  }`}
                >
                  <p>
                    If your Gamertag matches an existing account, a password
                    reset email will be sent to the associated email address. If
                    you do not receive an email within a few minutes, check your
                    spam folder.
                  </p>
                </div>
                <div className="control-box flex flex-col items-center mt-32">
                  <Button
                    label="SUBMIT"
                    isLoading={isProcessing}
                    className={` ${
                      validation === true
                        ? "pl-2 text-xl uppercase tracking-widest w-[144px] bg-[#5EF388]  text-black"
                        : "pl-2 border-2 border-stone-300 text-stone-400 text-xl uppercase tracking-widest w-[144px]"
                    }`}
                    onClick={ResetPassword}
                  />
                  <div className="text-xs cursor-pointer text-center mt-8">
                    <p onClick={handleMoveToTag}>FORGOT GAMERTAG?</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}