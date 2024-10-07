/*eslint-disable*/

import React, { useState, useEffect } from "react";
import styles from "../style/Login.module.css";
import { useNavigate } from "react-router-dom";
function Login() {
  let navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);

  const toggle = () => {
    setIsSignIn((prev) => !prev);
  };

  useEffect(() => {
    const container = document.getElementById("container");
    if (isSignIn) {
      container.classList.add(styles["sign-in"]);
      container.classList.remove(styles["sign-up"]);
    } else {
      container.classList.add(styles["sign-up"]);
      container.classList.remove(styles["sign-in"]);
    }
  }, [isSignIn]);

  useEffect(() => {
    const container = document.getElementById("container");
    setTimeout(() => {
      container.classList.add(styles["sign-in"]);
    }, 200);
  }, []);

  return (
    <>
      {/* <NavBarMain></NavBarMain> */}
      <div
        id="container"
        className={"page-enter " + styles.container}
        style={{}}
      >
        <div className={styles.row}>
          <div
            className={`${styles.col} ${styles["align-items-center"]} ${styles["flex-col"]} ${styles["sign-up"]}`}
          >
            <div
              className={`${styles["form-wrapper"]} ${styles["align-items-center"]}`}
            >
              <div className={`${styles.form} ${styles["sign-up"]}`}>
                <div className={styles["input-group"]}>
                  <i className="bx bxs-user"></i>
                  <input type="text" placeholder="아이디" />
                </div>
                <div className={styles["input-group"]}>
                  <i className="bx bx-mail-send"></i>
                  <input type="email" placeholder="Email" />
                </div>
                <div className={styles["input-group"]}>
                  <i className="bx bxs-lock-alt"></i>
                  <input type="password" placeholder="비밀번호" />
                </div>
                <div className={styles["input-group"]}>
                  <i className="bx bxs-lock-alt"></i>
                  <input type="password" placeholder="Confirm password" />
                </div>
                <button className={styles["form-button"]}>Sign up</button>
                <p>
                  <span>Already have an account?</span>
                  <b onClick={toggle} className={styles.pointer}>
                    Sign in here
                  </b>
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${styles.col} ${styles["align-items-center"]} ${styles["flex-col"]} ${styles["sign-in"]}`}
          >
            <div
              className={`${styles["form-wrapper"]} ${styles["align-items-center"]}`}
            >
              <div className={`${styles.form} ${styles["sign-in"]}`}>
                <div className={styles["input-group"]}>
                  <i className="bx bxs-user"></i>
                  <input type="text" placeholder="아이디" />
                </div>
                <div className={styles["input-group"]}>
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type="password"
                    placeholder="비밀번호(영문자, 숫자, 특수문자 8 ~ 16)"
                  />
                </div>
                <button
                  className={styles["form-button"]}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  로그인
                </button>
                <p>
                  <b>비밀번호를 잊으셨나요?</b>
                </p>
                <p>
                  <span>회원이 아니신가요? </span>
                  <b onClick={toggle} className={styles.pointer}>
                    회원가입
                  </b>
                </p>
              </div>
            </div>
            <div className={styles["form-wrapper"]}></div>
          </div>
        </div>
        <div className={`${styles.row} ${styles["content-row"]}`}>
          <div
            className={`${styles.col} ${styles["align-items-center"]} ${styles["flex-col"]}`}
          >
            <div className={`${styles.text} ${styles["sign-in"]}`}>
              <h2 style={{ fontSize: "70px" }}>하나로</h2>
            </div>
            <div className={`${styles.img} ${styles["sign-in"]}`}></div>
          </div>
          <div
            className={`${styles.col} ${styles["align-items-center"]} ${styles["flex-col"]}`}
          >
            <div className={`${styles.img} ${styles["sign-up"]}`}></div>
            <div className={`${styles.text} ${styles["sign-up"]}`}>
              <h2>Join with us</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
