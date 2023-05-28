//console.log(localStorage.getItem("logedIn"));
getProfileDetails()
function getProfileDetails() {
  var namePr = document.getElementById("namePr");
  var namePr2 = document.getElementById("namePr2");
  var emailPr = document.getElementById("emailPr");
  var mobile = document.getElementById("mobilePr");
  var department = document.getElementById("departmentPr");
  var designation = document.getElementById("designationPr");
  var department2 = document.getElementById("departmentPr2");
  var designation2 = document.getElementById("designationPr2");
  var profilePic = document.getElementById("profilePic");
  var email = localStorage.getItem("email");
  var token = localStorage.getItem("token");
  const profileData = {
    email: email
  };
 
  fetch("https://senderr.in/API_main/userProfile.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(profileData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      // handle successful profile retrieval
      console.log(data.length)

      console.log(data);
      namePr.textContent = data.name;
      namePr2.textContent = data.name;
      emailPr.textContent = data.email;
      mobile.textContent = data.mobile;
      department.textContent = data.department;
      designation.textContent = data.designation;
      department2.textContent = data.department;
      designation2.textContent = data.designation;
      profilePic.src = data.photo;



    })
    .catch(error => {
      console.log(error);
      // handle error
    });
}
