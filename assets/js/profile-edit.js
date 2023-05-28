//console.log(localStorage.getItem("logedIn"));

 
var email=localStorage.getItem("email");
var token=localStorage.getItem("token");
getProfileDetails()
function getProfileDetails() {
  var nameEdit = document.getElementById("nameEdit");
  var nameEdit2 = document.getElementById("nameEdit2");
   var emailEdit = document.getElementById("emailEdit");
   var mobileEdit = document.getElementById("mobileEdit");
   var departmentEdit = document.getElementById("departmentEdit");
   var designationEdit = document.getElementById("designationEdit");
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
        nameEdit.textContent = data.name;
        nameEdit2.value = data.name;
        emailEdit.value= data.email;
        mobileEdit.value = data.mobile;
        //departmentEdit.textContent = data.department;
        //designationEdit.textContent = data.designation;
        
       
       
   
    })
    .catch(error => {
      console.log(error);
      // handle error
    });
}
function update() {
  var nameEdit = document.getElementById("nameEdit");
 var nameEdit2 = document.getElementById("nameEdit2");
  var emailEdit = document.getElementById("emailEdit");
  var mobileEdit = document.getElementById("mobileEdit");
  var departmentEdit = document.getElementById("departmentEdit");
  var designationEdit = document.getElementById("designationEdit");
  var photoString= "adasd"
  var photoData= new Blob([photoString], { type: 'text/plain' });
    
      const profileEditData = {
        name: nameEdit2.value,
        email: emailEdit.value,
        mobile: mobileEdit.value,
        designation: designationEdit.value,
        department: departmentEdit.value,
        photo: "asdgr"
      };
    
      
  
    fetch("https://senderr.in/API_main/userProfileEdit.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(profileEditData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        // handle successful profile retrieval
        // getProfileDetails()
        console.log(data);
          
         
         
     
      })
      .catch(error => {
        console.log(error);
        // handle error
      });
  }
  