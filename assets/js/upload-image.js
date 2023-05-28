// Initialize Firebase

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBXV9H9voMoOyhO1p_LHBjrWnx5kEZ5JWg",
    authDomain: "twd-kc.firebaseapp.com",
    projectId: "twd-kc",
    storageBucket: "twd-kc.appspot.com",
    messagingSenderId: "699411605442",
    appId: "1:699411605442:web:3f54925e5714f4db29185b",
    measurementId: "G-3JLHCQNNNC"
});
// firebase.initializeApp(firebaseApp);
async function uploadPhoto(input) {

    var statusLabel = document.getElementById("statusLabel")
    var progressBarFill = document.getElementById("progressBarFill")

    var file = input.files[0];
    var name = input.files[0].name;
    var random = generateRandomCharacter();
    var storageRef = firebase.storage().ref("teacher").child(`${random}${name}`);

    // Check if image size exceeds 500KB
    if (file.size > 1000 * 1024) {
        try {
            var compressedFile = await compressImage(file, 500);

            // Upload with progress tracking
            var uploadTask = storageRef.put(compressedFile);
            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Get the progress percentage
                        var progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            var percentage=progress.toFixed(2)+"%";
                        console.log("Upload progress: " + percentage);
                        progressBarFill.style.width=percentage
                    },
                    (error) => {
                        console.log(error);
                        reject(null);
                    },
                    () => {
                        // Upload complete
                        storageRef
                            .getDownloadURL()
                            .then((url) => resolve(url))
                            .catch((error) => {
                                console.log(error);
                                reject(null);
                            });
                    }
                );
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    } else {
        try {
            // Upload with progress tracking
            var uploadTask = storageRef.put(file);
            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Get the progress percentage
                        var progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload progress: " + progress.toFixed(2) + "%");
                    },
                    (error) => {
                        console.log(error);
                        reject(null);
                    },
                    () => {
                        // Upload complete
                        storageRef
                            .getDownloadURL()
                            .then((url) => resolve(url))
                            .catch((error) => {
                                console.log(error);
                                reject(null);
                            });
                    }
                );
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

function compressImage(file, maxSizeInKB) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function (event) {
            var img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                var maxWidth = img.width;
                var maxHeight = img.height;
                var ratio = 1;

                if (file.size > maxSizeInKB * 1024) {
                    ratio = Math.sqrt((maxSizeInKB * 1024) / file.size);
                    maxWidth = Math.floor(maxWidth * ratio);
                    maxHeight = Math.floor(maxHeight * ratio);
                }

                canvas.width = maxWidth;
                canvas.height = maxHeight;
                ctx.drawImage(img, 0, 0, maxWidth, maxHeight);

                canvas.toBlob(
                    function (blob) {
                        resolve(blob);
                    },
                    file.type,
                    0.7 // Specify the desired image quality (0.7 = 70% quality)
                );
            };
        };
        reader.readAsDataURL(file);
    });
}
function generateRandomCharacter() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';

    for (var i = 0; i < 10; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}