import React, { useRef, useState, useEffect } from "react";
import '../assets/scss/register.scss';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const HANDPHONE_REGEX = /^(?=.*[0-9]).{8,24}$/;
//validasi nomor handphone terdiri dari semua angka 0-9. minmal 8 angka maksimal 24 angka 
const EMAIL_REGEX = /^(?=.*[a-z])(?=.*[@]).{6,32}$/; //validasi email dengan awalan lower/uppercase letter dan dilanjutkan dengan 6-32 character, dan harus menyertakan @. 
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//validasi password dengan minimal 1 uppercase letter, 1 angka, dan 1 spesial character. minimal 8 character, maksimal 24 character 

const Register = () => {
    const namalengkapRef = useRef();
    const nomorhandphoneRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const [namalengkap, setNamaLengkap] = useState('');

    const [nomorhandphone, setNomorhandphone] = useState('');
    const [validNomorhandphone, setValidNomorhandphone] = useState(false);
    const [nomorhandhopneFocus, setnomorhandphoneFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setvalidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        namalengkapRef.current.focus();
    }, [])

    useEffect(() => {
        nomorhandphoneRef.current.focus();
    }, [])

    useEffect(() => {
        const result = HANDPHONE_REGEX.test(nomorhandphone);
        console.log(result);
        console.log(nomorhandphone);
        setValidNomorhandphone(HANDPHONE_REGEX.test(nomorhandphone));
    }, [nomorhandphone])

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
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        console.log(matchPwd);
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [nomorhandphone ,email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = HANDPHONE_REGEX.test(nomorhandphone);
        if (!v1 || !v2  || !v3 ){
            setErrMsg("Invalid Entry");
            return;
        }
        console.log(namalengkap, nomorhandphone, email, pwd);
        setSuccess(true);
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>

                    <label htmlFor="nama lengkap">
                            Nama Lengkap:
                        </label>
                        <input
                            type="text"
                            id="namalengkap"
                            ref={namalengkapRef}
                            autoComplete="off"
                            onChange={(e) => setNamaLengkap(e.target.value)}
                            value={namalengkap}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                        />

                        <label htmlFor="nomorhandphone">
                            Nomor Handphone:
                            <FontAwesomeIcon icon={faCheck} className={validNomorhandphone ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validNomorhandphone || !nomorhandphone ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="nomorhandphone"
                            ref={nomorhandphoneRef}
                            autoComplete="off"
                            onChange={(e) => setNomorhandphone(e.target.value)}
                            value={nomorhandphone}
                            required
                            aria-invalid={validNomorhandphone ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setnomorhandphoneFocus(true)}
                            onBlur={() => setnomorhandphoneFocus(false)}
                        />
                        <p id="uidnote" className={nomorhandhopneFocus && nomorhandphone && !validNomorhandphone ? "instructions" : "offscreen"}>
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
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
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

                        <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Sudah punya akun?
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Log in Yuk!</a>
                        </span> 
                    </p>
                </section>
            )}
        </>
    )
}

export default Register