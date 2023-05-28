console.log(localStorage.getItem("token"))

var email = localStorage.getItem("email");
var token = localStorage.getItem("token");

getTeacherList()
function getTeacherList() {
    const profileData = {
        email: email
    };

    fetch("https://senderr.in/API_main/getUserList.php", {
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
            console.log(data.data);
            var d = data.data;
            var k=0
            var table = document.getElementById("table");
            table.innerHTML=""
            d.forEach(element => {
                k++;
                var row = `<tr>
						<td>${k}</td>
						<td>${element.name}</td>
						<td>${element.email}</td>
						<td>
							<a href="/ADMIN/show-work-diary.html?teacherId=${element.teacherId}" target="_blank">View Diary</a>
							<a href="/ADMIN/teacher-profile-view.html?teacherId=${element.teacherId}" target="_blank">Profile</a>
							
						</td>
					</tr>`

                    table.innerHTML+=row;
            });
            
        })
        .catch(error => {
            console.log(error);
            // handle error
        });
}
function logout() {
    
    sessionStorage.clear();
    window.location.href = "/login.html";
  }