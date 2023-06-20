var email = localStorage.getItem("email");
var token = localStorage.getItem("token");

document.getElementById("mainTable").style.display = "none"

getNewApplicant()

// document.getElementById("mainTable").style.display = "none";
function getNewApplicant() {
  const profileData = {
    email: "ahmedkawsar202949@gmail.com"
  };

  fetch(api+"/newRgistrationUserList.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token,
        
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
      var table = document.getElementById("newAppliation");
      table.innerHTML = ""
      var k = 0;
      data.data.forEach(element => {

        if(element.isOtpVerified==1){
        k += 1;

        var row = `<tr>
            <td><img src="${element.photo}" class="abc" alt="${element.name}'s Photo" width="100px" height="100px"></td>
            <td><img src="${element.signature}" alt="${element.name}'s Signature" width="100px" height="50px"></td>
            <td>${element.name}</td>
            <td>${element.department}</td>
            <td>${element.designation}</td>
            <td>${element.email}</td>
            <td>${element.mobile}</td>
            <td><button onclick="verifyUser('${element.email}','accept')" class="accept">Accept</button> <button onclick="verifyUser('${element.email}','reject')" class="reject">Reject</button></td>
          </tr>`;
        table.innerHTML += row;
        }
      });
      if(k>0){
        document.getElementById("mainTable").style.display="block"
      }else{
        document.getElementById("mainTable").style.display = "none"
        alert("Data not available")
      }


    })
    .catch(error => {
      console.log(error);
      // handle error
    });
}

function verifyUser(userEmail,action) {

  const acceptData = {
    adminEmail: email,
    email: userEmail,
    action: action
  };

  fetch(api+"/verifyUser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(acceptData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (data.success == "1") {
        alert(data.message);
        getNewApplicant()
      } else {
        alert(data.message);
      }

    })
    .catch(error => {
      console.log(error);
      // handle error
    });
}