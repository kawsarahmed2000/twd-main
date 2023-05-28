function changePassword() {
    var type = localStorage.getItem("type")
    var otp = document.getElementById("otp").value;
    var password = document.getElementById("password").value;
    var email = localStorage.getItem("email");

    if(otp==""&&otp<6){
        alert("Enter correct password")
        return
    }
    if(password==""){
        alert("Enter password");
        return
    }

    const loginData = {
        email: email,
        otp: otp,
        newPassword: password
    };
    console.log(loginData)

    fetch("https://senderr.in/API_main/changePassword.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // handle successful login
            console.log(data);
            if (data.success == "1") {
                    alert("Please click on login");
                    window.open("/login.html", "_self");
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.log(error);
            // handle error
        });
}