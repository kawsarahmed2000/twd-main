 function openShowDiary(){
     var teacherId = document.getElementById("teacherId").value;
     if (teacherId == "" || teacherId==null){
        return
     }
     window.open('/ADMIN/show-work-diary.html?teacherId='+teacherId,"_self")
 }