const codes = document.querySelectorAll('.code')

var api = localStorage.getItem("api");
codes[0].focus()

var email = localStorage.getItem("email");
document.getElementById("labels").textContent = `We emailed you the six digit code to ${email}`
document.getElementById("labels2").textContent = `Enter the code below to confirm your email address`
function otpVerification(){
  var type = localStorage.getItem("type")
  var otp = document.getElementById("otp").value;
  
    
    const loginData = {
        email: email,
        otp: otp,
        medium: "new"
      };
      console.log(loginData)
      
      fetch(api+"/verifyOtp.php", {
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
        if(data.success=="1"){
            alert("Please clcik on login");
            window.open("/login.html", "_self");
        }else{
            alert(data.message);
        }
      })
      .catch(error => {
        console.log(error);
        // handle error
      });
}