let url = new URL(window.location.href);
let searchParams = new URLSearchParams(url.search);
var d = searchParams.get("data");
var api = localStorage.getItem("api");
var name = searchParams.get("name");
var dept = searchParams.get("dept");
var from = searchParams.get("from");
var to = searchParams.get("to");
document.getElementById("name").textContent=name;
document.getElementById("department").textContent=dept;
document.getElementById("from").textContent = from;
document.getElementById("to").textContent=to;
var data = JSON.parse(window.atob(d));
console.log(data)
var table = document.getElementById("showDiaryMain");
var k = 0;
document.getElementById("spinner").style.display = "none"
if (data) {
    data.forEach(element => {

        var dayName = getDayName(element.timestamp)
        k += 1;

        var row = `
                            <form class="container2 container diary">
                                <div class="d-flex flex-row justify-content-between">
                                    <div class="row ml-1">
                                        <b><label class="input-group col-4">Date:</label></b>
                                        <i><label class="dotted input-group col">${element.date}</label></i>
                                    </div>
                                    <div class="row mr-1">
                                        <b><label class="input-group col-4">Day</label></b>
                                        <i><label class="dotted input-group col">${dayName}</label></i>
                                    </div>
                                </div>

                                <table class="table table-success table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>No. Of Periods</td>
                                            <td>Classes Held</td>
                                            <td>Classes Not Held</td>
                                            <td>Remarks</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table class="table table-striped">
                                                    <tbody>
                                                        <tr>
                                                            <td>Alloted</td>
                                                            <td>Classes Taken</td>
                                                            <td>Classes Not Taken</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table class="table table-striped">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Th</td>
                                                                            <td>Pr</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>${element.allotedTh}</td>
                                                                            <td>${element.allotedPr}</td>
                                                                        </tr>
                                                                </tbody></table>
                                                            </td>
                                                            <td>
                                                                <table class="table table-striped">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Th</td>
                                                                            <td>Pr</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>${element.takenTh}</td>
                                                                            <td>${element.takenPr}</td>
                                                                        </tr>
                                                                </tbody></table>
                                                            </td>
                                                            <td>
                                                                <table class="table table-striped">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Th</td>
                                                                            <td>Pr</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>${element.notTakenTh}</td>
                                                                            <td>${element.notTakenPr}</td>
                                                                        </tr>
                                                                </tbody></table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td>${element.classHeld}</td>
                                            <td>${element.classNotHeld}</td>
                                            <td>${element.remarks}</td>
                                        </tr>

                                    </tbody>
                                </table>
                                <div class="mb-3">
                                    <span><b>Topics covered in the class: </b></span>
                                    <p><i class="dotted ml-1">${element.topicsCovered}</i></p>
                                </div>
                            </form>`;
        table.innerHTML += row;
    });

}
if (k > 0) {
    window.print()
    document.getElementById("showDiaryMain").style.display = "block"
} else {
    document.getElementById("showDiaryMain").style.display = "none"
    alert("Data not available")
}



function getDayName(timestamp) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const dayIndex = date.getDay();
    const dayName = daysOfWeek[dayIndex];

    return dayName;
}
