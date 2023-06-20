var email = localStorage.getItem("email");
var token = localStorage.getItem("token");

var api = localStorage.getItem("api");
document.getElementById("takenTh").addEventListener("change", function () {
    var allotedTh = document.getElementById("allotedTh").value;
    if(this.value=="Select"){
        document.getElementById("notTakenTh").selectedIndex = 0;
        return
    }
    if(this.value>allotedTh){
        alert("Select actual value")
        this.selectedIndex = 0
        document.getElementById("notTakenTh").selectedIndex = 0;
        return
    }
    var d = allotedTh-this.value;
    document.getElementById("notTakenTh").selectedIndex=d+1;
});

document.getElementById("takenPr").addEventListener("change", function () {
    var allotedPr = document.getElementById("allotedPr").value;
    if(this.value=="Select"){
        document.getElementById("notTakenPr").selectedIndex = 0;
        return
    }
    if (this.value > allotedPr){
        alert("Select actual value")
        this.selectedIndex = 0
        document.getElementById("notTakenPr").selectedIndex = 0;
        return
    }
    var d = allotedPr -this.value;
    document.getElementById("notTakenPr").selectedIndex=d+1;
});

function addDiary() {
    const divElement = document.getElementById('classesHeld');

    const buttonElements = divElement.getElementsByTagName('button');

    var classesHeld = []
    for (let i = 0; i < buttonElements.length; i++) {
        const buttonText = buttonElements[i].textContent.trim();
        classesHeld.push(buttonText)
    }

    const divElement2 = document.getElementById('classesNotHeld');

    const buttonElements2 = divElement2.getElementsByTagName('button');

    var classesNotHeld = []
    for (let i = 0; i < buttonElements2.length; i++) {
        const buttonText = buttonElements2[i].textContent.trim();
        classesNotHeld.push(buttonText)
    }

    console.log(classesHeld.length)
    console.log(classesNotHeld.length)
    var date = document.getElementById("date").value;
    var day = document.getElementById("day")
    var session = document.getElementById("session").value;
    var allotedTh = document.getElementById("allotedTh").value;
    var allotedPr = document.getElementById("allotedPr").value;
    var takenTh = document.getElementById("takenTh").value;
    var takenPr = document.getElementById("takenPr").value;
    var notTakenTh = document.getElementById("notTakenTh").value;
    var notTakenPr = document.getElementById("notTakenPr").value;
    var remarks = document.getElementById("remarks").value;
    var topics = document.getElementById("topics").value;

    if (date == "" || date == null) {
        alert("Select date");
        return
    }
    if (session == "" || session == null) {
        alert("Select session");
        return
    }
    if (allotedTh == "Select" || allotedTh == null) {
        alert("Select allotedTh");
        return
    }
    if (allotedPr == "Select" || allotedPr == null) {
        alert("Select allotedPr");
        return
    }
    if (takenTh == "Select" || takenTh == null) {
        alert("Select takenTh");
        return
    }
    if (takenPr == "Select" || takenPr == null) {
        alert("Select takenPr");
        return
    }
    if (notTakenTh == "Select" || notTakenTh == null) {
        alert("Select notTakenTh");
        return
    }
    if (notTakenPr == "Select" || notTakenPr == null) {
        alert("Select notTakenPr");
        return
    }
 
    var t = parseInt(takenTh) + parseInt(takenPr) 
    if (t!= classesHeld.length) {
        alert("Select " + takenTh + " theory and " + takenPr + " practical subject (total " + t +") from class held");
        return
    }
    if (parseInt(notTakenTh) + parseInt(notTakenPr) != classesNotHeld.length) {
        alert("Select not Held class");
        return
    }
    if (remarks == "" || remarks == null) {
        alert("Select remarks");
        return
    }
    if (topics == "" || topics == null) {
        alert("Select topics");
        return
    }


    const showDiaryData = {
        "email": email,
        "allotedTh": allotedTh,
        "allotedPr": allotedPr,
        "takenTh": takenTh,
        "takenPr": takenPr,
        "notTakenTh": notTakenTh,
        "notTakenPr": notTakenPr,
        "classHeld": JSON.stringify(classesHeld),
        "classNotHeld": JSON.stringify(classesNotHeld),
        "remarks": remarks,
        "topicsCovered": topics,
        "session": session,
        "date": date
    };

    console.log(showDiaryData)

    fetch(api+"/addDiary.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(showDiaryData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // handle successful profile retrieval
            console.log(data)
            window.history.back();
        })
        .catch(error => {
            console.log(error);
            // handle error
        });
}

function setMinMaxDates() {
    const currentDate = new Date();
    const minDate = new Date();
    const maxDate = new Date();

    minDate.setMonth(minDate.getMonth() - 1); // Subtract 1 month from the current date

    // Format the minDate and maxDate as "YYYY-MM-DD" for the input's min and max attributes
    const minDateString = `${minDate.getFullYear()}-${(minDate.getMonth() + 1).toString().padStart(2, '0')}-${minDate.getDate().toString().padStart(2, '0')}`;
    const maxDateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    // Set the min and max attribute values of the date input
    const dateInput = document.getElementById('date');
    dateInput.min = minDateString;
    dateInput.max = maxDateString;
}

// Call the function to set the initial min and max date values
setMinMaxDates();