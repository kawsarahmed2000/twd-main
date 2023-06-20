localStorage.setItem("api", "https://senderr.in/API_main")

var api = localStorage.getItem("api");
isLoggedIn();
function isLoggedIn(){
    var d=localStorage.getItem("logedIn")||"no";
    var isAdmin = localStorage.getItem("isAdmin")||"";
    var currUrl = window.location.href;
    if (d == "no" && isAdmin!="1"){
        if(!currUrl.includes("/login.html")&& !currUrl.includes("/forget-password/index.html")){
            window.open("/login.html","_self");
        }
    }
}
function logout(){
    alert("successfully loged out");
    localStorage.setItem("logedIn","no");
    isLoggedIn();
    // console.log(localStorage.getItem("logedIn"))
}
