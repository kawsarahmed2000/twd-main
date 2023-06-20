//console.log(localStorage.getItem("logedIn"));

var api = localStorage.getItem("api");
var up=0;
var email = localStorage.getItem("email");
var token = localStorage.getItem("token");
getProfileDetails()

function getProfileDetails() {
  var nameEdit = document.getElementById("nameEdit");
  var nameEdit2 = document.getElementById("nameEdit2");
  var emailEdit = document.getElementById("emailEdit");
  var mobileEdit = document.getElementById("mobileEdit");
  var departmentEdit = document.getElementById("departmentEdit");
  var designationEdit = document.getElementById("designationEdit");
  var profilePic = document.getElementById("profilePic");
  const profileData = {
    email: email
  };

  fetch(api+"/userProfile.php", {
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
      nameEdit.textContent = data.name;
      nameEdit2.value = data.name;
      emailEdit.value = data.email;
      mobileEdit.value = data.mobile;

      var departmentValue = data.department;

      for (var i = 0; i < departmentEdit.options.length; i++) {
        if (departmentEdit.options[i].value == departmentValue) {
          departmentEdit.options[i].selected = true;
          break;
        }
      }
      var designationValue = data.designation;

      for (var i = 0; i < designationEdit.options.length; i++) {
        if (designationEdit.options[i].value == designationValue) {
          designationEdit.options[i].selected = true;
          break;
        }
      }
      profilePic.src = data.photo



    })
    .catch(error => {
      console.log(error);
      // handle error
    });
}

var profilePicEdit = document.getElementById("profilePic");
async function update() {
  var nameEdit = document.getElementById("nameEdit");
  var nameEdit2 = document.getElementById("nameEdit2");
  var emailEdit = document.getElementById("emailEdit");
  var mobileEdit = document.getElementById("mobileEdit");
  var departmentEdit = document.getElementById("departmentEdit");
  var designationEdit = document.getElementById("designationEdit");
  var imageInput = document.getElementById("imageInput");

  var statusLabel = document.getElementById("statusLabel")
  var progressBarFill = document.getElementById("progressBarFill")

  statusLabel.innerHTML = "Uploading photo.."
  progressBarFill.style.width = "0%"

  if(up==1){

    openPopup();
    await uploadPhoto(imageInput).then(async (photoUrl) => {
      var photUrlMain = photoUrl;

      const profileEditData = {
        name: nameEdit2.value,
        email: emailEdit.value,
        mobile: mobileEdit.value,
        designation: designationEdit.value,
        department: departmentEdit.value,
        photo: photUrlMain
      };

      fetch(api+"/userProfileEdit.php", {
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
          closePopup()
          getProfileDetails()

        })
        .catch(error => {
          console.log(error);
          // handle error
        });
    })
  }else{
    var photUrlMain = profilePicEdit.src;

    const profileEditData = {
      name: nameEdit2.value,
      email: emailEdit.value,
      mobile: mobileEdit.value,
      designation: designationEdit.value,
      department: departmentEdit.value,
      photo: photUrlMain
    };

    fetch(api+"/userProfileEdit.php", {
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
        alert("Updated")
        getProfileDetails()

      })
      .catch(error => {
        console.log(error);
        // handle error
      });
  }

}

document.getElementById("profilePic").addEventListener("click", openImageUploadPopup);

function openImageUploadPopup() {
  var modal = document.getElementById("imageUploadModal");
  modal.style.display = "block";
}

function closeImageUploadPopup() {
  var modal = document.getElementById("imageUploadModal");
  modal.style.display = "none";
}

async function UploadImage() {
  var profilePic = document.getElementById("imageInput")
  if (!profilePic.files[0]) {
    alert("Select image");
    return
  }
  up=1;
  var file = profilePic.files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    document.getElementById("profilePic").src = e.target.result;
    closeImageUploadPopup();
  };

  reader.readAsDataURL(file);
}