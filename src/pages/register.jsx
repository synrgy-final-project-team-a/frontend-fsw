import React, { useRef, useState, useEffect } from "react";
import '../assets/scss/register.scss';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";


const HANDPHONE_REGEX = /^(?=.*[0-9]).{8,24}$/;
//validasi nomor handphone terdiri dari semua angka 0-9. minmal 8 angka maksimal 24 angka 
const EMAIL_REGEX = /^(?=.*[a-z])(?=.*[@]).{6,32}$/; //validasi email dengan awalan lower/uppercase letter dan dilanjutkan dengan 6-32 character, dan harus menyertakan @. 
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//validasi password dengan minimal 1 uppercase letter, 1 angka, dan 1 spesial character. minimal 8 character, maksimal 24 character 

const Register = () => {

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const nomorhandphoneRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstname] = useState('');

    const [lastName, setLastname] = useState('');

    const [phoneNumber, setphoneNumber] = useState('');
    const [validNomorhandphone, setValidNomorhandphone] = useState(false);
    const [nomorhandhopneFocus, setnomorhandphoneFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setvalidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        firstnameRef.current.focus();
    }, [])

    useEffect(() => {
        lastnameRef.current.focus();
    }, [])

    useEffect(() => {
        nomorhandphoneRef.current.focus();
    }, [])

    useEffect(() => {
        const result = HANDPHONE_REGEX.test(phoneNumber);
        console.log(result);
        console.log(phoneNumber);
        setValidNomorhandphone(HANDPHONE_REGEX.test(phoneNumber));
    }, [phoneNumber])

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setvalidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        console.log(matchPwd);
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [phoneNumber ,email, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        const v3 = HANDPHONE_REGEX.test(phoneNumber);
        if (!v1 || !v2  || !v3 ){
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const payload = {
                 email, password, firstName, lastName, phoneNumber
            };
      
            const registResponse = await axios.post(
              "https://kosanku-bej.up.railway.app/api/register/seeker",
              payload
            );
            if (registResponse.status === 201) {
              console.log("berhasil Registrasi");
      
              const jwtToken = registResponse.data.data.token;
      
              localStorage.setItem("user_token", jwtToken);
      
              setSuccess(true);
            }
          } catch (err) {
            console.log("gagal regist:", err);
          }

        console.log(firstName, lastName, phoneNumber, email, password);
        

        
    }

    return (
        <div id="register">
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                    <Link to="/login" className="font-bold underline text-[#1e40af]">
                        Log in Yuk!
                    </Link>{" "}
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>

                    <label htmlFor="first name">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            ref={firstnameRef}
                            autoComplete="off"
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstName}
                            required
                            aria-describedby="uidnote"
                        />

                    <label htmlFor="last name">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            ref={lastnameRef}
                            autoComplete="off"
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastName}
                            required
                            aria-describedby="uidnote"
                        />


                        <label htmlFor="nomorhandphone">
                            Nomor Handphone:
                            <FontAwesomeIcon icon={faCheck} className={validNomorhandphone ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validNomorhandphone || !phoneNumber? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="nomorhandphone"
                            ref={nomorhandphoneRef}
                            autoComplete="off"
                            onChange={(e) => setphoneNumber(e.target.value)}
                            value={phoneNumber}
                            required
                            aria-invalid={validNomorhandphone ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setnomorhandphoneFocus(true)}
                            onBlur={() => setnomorhandphoneFocus(false)}
                        />
                        <p id="uidnote" className={nomorhandhopneFocus && phoneNumber && !validNomorhandphone ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            must be a number<br />
                            8 to 24 digits.<br />
                        </p>

                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            must include @<br />
                            4 to 24 characters.<br />
                            ex: binar@gmail.com
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Verifikasi Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validNomorhandphone || !validEmail || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                    Sudah punya akun?
                    <Link to="/login" className="font-bold underline text-[#1e40af]">
                        Log in Yuk!
                    </Link>{" "}
                    </p>
                </section>
            )}
        </div>
    )
}

export default Register