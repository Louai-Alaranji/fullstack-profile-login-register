import { useState } from "react";

function Login({ onLoginSuccess }){
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setloginPassword] = useState("")

    const[singupEmail, setSignupEmail] = useState("")
    const [signupPassword, setSignupPassword] = useState("")
    const[singupFullname, setSignupFullname] = useState("")
    const[singupAddress, setSignupAddress] = useState("")
    const[singupContact, setSignupContact] = useState("")


    function handleSignup(event) {
        event.preventDefault(); // Prevent default form submission behavior
    
        if (!singupEmail.trim() || !signupPassword.trim() || !singupFullname.trim() || !singupContact.trim() || !singupAddress.trim()) {
            alert("Please fill out all registration fields.");
            return;
        }
        
        fetch("https://localhost:7220/api/User/add-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Fullname: singupFullname,
                Contact: singupContact,
                Address: singupAddress,
                Email: singupEmail,
                Password: signupPassword
            })
        })
        .then(response =>{
            if(!response.ok){
                throw new Error("Error: " + response.status);
            } return response.text();
        })
        .then(data => {
            console.log(data);
            alert("Signup successful!");
            setSignupFullname("")
            setSignupAddress("")
            setSignupContact(0)
            setSignupEmail("")
            setSignupPassword("")
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("Error with Signup!")
        })
    }
    
    function handleLogin(event) {
        event.preventDefault(); // Prevent default form submission behavior
    
        if(!loginEmail.trim() || !loginPassword.trim()){
            alert("Please enter email and password.");
            return;
        }
    
       fetch("https://localhost:7220/api/User/login", {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword 
            })
       })
       .then(response =>{
        if(!response.ok){
            throw new Error("Error: " + response.status);
        } return response.text();
        })
        .then(data => {
            console.log(data);
            alert("Login successful!");
            onLoginSuccess(loginEmail);
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("Email or Password is wrong!")
        })
    }

    return(<>
        <div className="login-main-div">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login to</h2>
                <fieldset>
                    <legend>Email</legend>
                    <input type="email" onChange={(e) => (setLoginEmail(e.target.value))} value={loginEmail} />
                </fieldset>

                <fieldset>
                    <legend>Password</legend>
                    <input type="password" onChange={(e) => (setloginPassword(e.target.value))} value={loginPassword}/>
                </fieldset>
                <button className="login-btn" type="submit">Login</button>
                <div id="login-error"></div>
            </form>
        </div>

        <div className="Sign-up-main-div">
            <form onSubmit={handleSignup} className="Sign-up-form">
            <h2>If u are not singed up, fill form below</h2>
                <fieldset>
                    <legend>Email</legend>
                    <input type="email" onChange={(e) => (setSignupEmail(e.target.value))} value={singupEmail} />
                </fieldset>
                <fieldset>
                    <legend>Fullname</legend>
                    <input type="text" onChange={(e) => (setSignupFullname(e.target.value))} value={singupFullname} />
                </fieldset>
                <fieldset>
                    <legend>Contact</legend>
                    <input type="tel" onChange={(e) => (setSignupContact(e.target.value))} value={singupContact} />
                </fieldset>
                <fieldset>
                    <legend>Address</legend>
                    <input type="text" onChange={(e) => (setSignupAddress(e.target.value))} value={singupAddress} />
                </fieldset>
                <fieldset>
                    <legend>Password</legend>
                    <input type="password" onChange={(e) => (setSignupPassword(e.target.value))} value={signupPassword} />
                </fieldset>
                <button className="Sign-up-btn" type="submit" >Sign-up</button>
                <div id="signup-error"></div>
            </form>
        </div>
    </>)
}

export default Login;


