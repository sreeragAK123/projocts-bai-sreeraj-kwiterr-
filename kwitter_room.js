
//ADD YOUR FIREBASE LINKS HERE
const firebaseConfig = {
      apiKey: "AIzaSyA85hj0t9nMrfy9PUyE4Xj-pytEyHEPVAU",
      authDomain: "kwittersreeraj-2c9b8.firebaseapp.com",
      databaseURL: "https://kwittersreeraj-2c9b8-default-rtdb.firebaseio.com",
      projectId: "kwittersreeraj-2c9b8",
      storageBucket: "kwittersreeraj-2c9b8.appspot.com",
      messagingSenderId: "334537773950",
      appId: "1:334537773950:web:b29397966796b96586592f"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  


user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !";

function addroom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            reason: "addroomname"

      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}       


function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("room name"+Room_names);
                  row= "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name" , name);
      window.location = "kwitter_page.html";
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}