import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LibraryButton from "./LibraryButton";

function LibraryLogin() {
  const [doYouHaveAnAccount, setDoYouHaveAnAccount] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    setDoYouHaveAnAccount(!doYouHaveAnAccount);
  };

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      navigate("/main");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <>
      {doYouHaveAnAccount ? (
        <div style={{ border: "3px solid blue", marginTop: "190px" }}>
          <label>UserName:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your username"
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <LibraryButton buttonLabel="LOGIN" onClickButton={handleLogin} />{" "}
          <br />
          <label>New here? </label>{" "}
          <LibraryButton
            buttonLabel="Create Account"
            onClickButton={handleCreateAccountClick}
          />
        </div>
      ) : (
        <div style={{ border: "3px solid indigo", marginTop: "190px" }}>
          <label>Student ID:</label>
          <input type="text" placeholder="Enter Your Student ID" />
          <br />
          <label>Email:</label>
          <input type="email" />
          <br />
          <label>Password:</label>
          <input type="password" />
          <br />
          <label>Confirm Password:</label>
          <input type="password" />
          <br />
          <LibraryButton buttonLabel="SIGN UP" onClickButton={handleCreateAccountClick} />{" "}
          <br />
          <label>Already have an account?? </label>{" "}
          <LibraryButton
            buttonLabel="Sign In"
            onClickButton={handleCreateAccountClick}
          />
        </div>
      )}
    </>
  );
}

export default LibraryLogin;