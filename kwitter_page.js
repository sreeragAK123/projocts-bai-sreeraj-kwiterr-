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


    username = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");
    
    function send()
    {
          msg = document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
            name:username,
            mesg:msg,
            like:0

          });
          document.getElementById("msg").value="";
    }

function getData()

       {    firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
            firebase_message_id = childKey;
            message_data = childData;

            console.log(firebase_message_id);
            console.log(message_data);

            name1 = message_data['name'];
            mesg1 = message_data['mesg'];
            like1 = message_data['like'];

            namewithtag = "<h4>" +name1+ "<img class='user_tick' src='tick.png'></h4>";

            messagewithtag = "<h4 class='message_h4'>" +mesg1+ "</h4>";

            likebutton = " <button class='btn btn-info' id=" + firebase_message_id + " value=" +like1+
            " onclick='updatelike(this.id)'>" ;

            spanwithtag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " +like1+ "</span></button><hr>";

            row = namewithtag + messagewithtag + likebutton + spanwithtag;
            document.getElementById("output").innerHTML += row;

      } });  }); }
getData();

function updatelike(message_id)
      {
            console.log(message_id);
            button_id = message_id;
            likes = document.getElementById(button_id).value;
            updated_likes = Number(likes)+1;
            firebase.database().ref(room_name).child(message_id).update({
                 like: updated_likes 
            });
      }

function logout()
{
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}