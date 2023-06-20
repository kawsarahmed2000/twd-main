
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
  wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
  wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
  wrapper.classList.add('active-popup');
});
localStorage.setItem("logedIn", "no");

function login() {
  var email = document.getElementById("emailLogin").value;
  var pass = document.getElementById("passLogin").value;
  const loginData = {
    email: email,
    password: pass
  };
  localStorage.setItem("email", email);

  console.log(typeof(api))
  fetch(api+"/login.php", {
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
        localStorage.setItem("logedIn", "yes");
        localStorage.setItem("token", data.token);
        console.log(data.token);
        if (data.isAdmin == "1") {
          localStorage.setItem("isAdmin", "1");
          window.open("/ADMIN/dashboard.html", "_self");
        } else if (data.isAdmin == "0") {
          localStorage.setItem("isAdmin", "0");
          window.open("/user-profile.html", "_self");
        }

      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.log(error);
      // handle error
    });

}
async function register() {
  var name = document.getElementById("nameReg").value;
  var email = document.getElementById("emailReg").value;
  var mobile = document.getElementById("mobileReg").value;
  var password = document.getElementById("passwordReg").value;
  var designation = document.getElementById("designation").value;
  var department = document.getElementById("department").value;
  var photo = document.getElementById("photoReg");
  var signature = document.getElementById("signReg");

  if(name==""||name==null){
    alert("Enter your name");
    return
  }

  if (email == "" || email ==null){
    alert("Enter your email");
    return
  }

  if (mobile == "" || mobile ==null){
    alert("Enter your mobile number");
    return
  }

  if (password == "" || password ==null){
    alert("Enter your password");
    return
  }

  if (designation == "" || designation =="Select Designation"){
    alert("Select Designation");
    return
  }

  if (department == "" || department =="Select Department"){
    alert("Select Department");
    return
  }

  if(!photo.files[0]){
    alert("Select your photo");
    return
  }

  if (!signature.files[0]){
    alert("Select your signature");
    return
  }
  var statusLabel = document.getElementById("statusLabel")
  var progressBarFill = document.getElementById("progressBarFill")

  statusLabel.innerHTML="Uploading photo.."
  progressBarFill.style.width = "0%"
  openPopup();
  await uploadPhoto(photo).then(async (photoUrl) => {
    statusLabel.innerHTML = "Uploading signature.."
    progressBarFill.style.width = "0%"
    await uploadPhoto(signature).then((signatureUrl) => {
      statusLabel.innerHTML = "Collecting data.."
      progressBarFill.style.width = "0%"
      const registerData = {
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        designation: designation,
        department: department,
        photo: photoUrl,
        signature: signatureUrl
      };
      console.log(registerData);


      fetch(api+"/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          if (data.success == "1") {
            statusLabel.innerHTML = "Data stored to database.."
            progressBarFill.style.width = "100%"
            // handle successful login
            console.log(data);
            document.getElementById("openVerifyOtpBtn").style.display="block"
            localStorage.setItem("email", email);
            
          } else {

            statusLabel.innerHTML = data.message
            alert(data.message);
          }

        })
        .catch(error => {
          console.log(error);
          statusLabel.innerHTML = error
          // handle error
        });
    }).catch((e) => {
      statusLabel.innerHTML = e
      console.log(e)
    })
  }).catch((e) => {
    statusLabel.innerHTML = e
    console.log(e)
  })
  

}