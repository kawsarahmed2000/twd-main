
function otpSend(){
    alert("OTP has been sent to your email");
    var email= document.getElementById("emailForg").value;
    const forgetData = {
        email: email
      };
    //   localStorage.setItem("email",email);
      fetch(api+"/otpForChangePassword.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(forgetData)
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
            // handle successful login
            console.log(data);
          localStorage.setItem("email", email);
            window.open("/change-password.html","_self");
        }else{
            alert(data.message);
        }
      })
      .catch(error => {
        console.log(error);
        // handle error
      });
    }
      
