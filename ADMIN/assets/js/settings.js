function update(){

    var privacyPolicy = document.getElementById("privacyPolicy").value;
    var aboutUs = document.getElementById("aboutUs").value;
    var contactUs = document.getElementById("contactUs").value;

    var data ={
        privacyPolicy: privacyPolicy,
        aboutUs: aboutUs,
        contactUs: contactUs
    }
    fetch("https://senderr.in/API_main/setDocumentation.php", {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data.success || data.success==0){
                alert(data.message)
            }
            if(data.success==0){
                getDetails();
            }

        })
        .catch(function (error) {
            console.log(error); // Handle any errors
        });
};
getDetails()
function getDetails(){

    fetch("https://senderr.in/API_main/documentation.php", {
        method: "POST"
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data.success || data.success == 0) {
                alert(data.message)
            }

            document.getElementById("privacyPolicy").value=data.contactUs;
            document.getElementById("aboutUs").value=data.aboutUs;
            document.getElementById("contactUs").value=data.contactUs;

        })
        .catch(function (error) {
            console.log(error); // Handle any errors
        });
}