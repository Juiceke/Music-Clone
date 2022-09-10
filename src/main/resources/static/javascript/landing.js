const albumDiv = document.getElementById("testAlbum");
const loginBtn = document.getElementById("login");

 function getSpotifyUserLogin() {
 fetch("http://localhost:8080/api/login")
 .then((response) => response.text())
 .then(response => {
 console.log(response);
   window.location.replace(response);
 })
 }

 function getNewReleases() {

 }


 getNewReleases();

 loginBtn.addEventListener("click", getSpotifyUserLogin);