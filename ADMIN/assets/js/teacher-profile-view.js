//console.log(localStorage.getItem("logedIn"));
var teacherId = getUrl("teacherId");
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
  var profile = document.getElementById("profile");
  var email = localStorage.getItem("email");
  var token = localStorage.getItem("token");
  const profileData = {
    email: email,
    teacherId: teacherId
  };

  fetch("https://senderr.in/API_main/teacherDetailsByEmpId.php", {
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
      console.log(data.data.length)

      console.log(data);
      namePr.textContent = data.data.name;
      namePr2.textContent = data.data.name;
      emailPr.textContent = data.data.email;
      mobile.textContent = data.data.mobile;
      department.textContent = data.data.department;
      designation.textContent = data.data.designation;
      department2.textContent = data.data.department;
      designation2.textContent = data.data.designation;
      profile.src=data.data.photo




    })
    .catch(error => {
      console.log(error);
      // handle error
    });
}
