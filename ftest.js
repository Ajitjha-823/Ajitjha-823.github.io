// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYY5xGe7FiPk_BuI28NTCmwt-HCrOkwPQ",
    authDomain: "odia-delights-hub.firebaseapp.com",
    databaseURL: "https://odia-delights-hub-default-rtdb.firebaseio.com",
    projectId: "odia-delights-hub",
    storageBucket: "odia-delights-hub.appspot.com",
    messagingSenderId: "811197669421",
    appId: "1:811197669421:web:a2f8efc874236f30d218a4",
    measurementId: "G-J223YS9CT9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Set database variable
  var database = firebase.database();
  var storage=firebase.storage();
  
  function save() {
    var user = firebase.auth().currentUser;
    if(user){
    var userId = user.uid;
    var email = document.getElementById('email').value
    var lastname = document.getElementById('lastname').value
    var firstname = document.getElementById('firstname').value
    var dob = document.getElementById('dob').value
    var gender = document.getElementById('gender');
    database.ref('users/' + userId).set({
      email : email,
      firstname : firstname,
      lastname : lastname,
      gender:gender,
      dob:dob,
    });
  
    alert('Saved');
  }else {
    alert('User not signed in');
  }
}
  
  function get() {
    var user = firebase.auth().currentUser;
  
    if (user) {
      var userId = user.uid;
      var userRef = database.ref('users/' + userId);
      userRef.on('value', function(snapshot) {
        var data = snapshot.val();
        var email = document.getElementById('email');
        var lastname = document.getElementById('lastname');
        var firstname = document.getElementById('firstname');
        var displayImage = document.getElementById("displayImage");
        var profilePictureUrl = snapshot.val().profilePicture;
        var gender = document.getElementById('gender');
        var dob = document.getElementById('dob');
        // Set the value of the input field to the retrieved email
        email.value = data.email;
        firstname.value=data.firstname;
        lastname.value=data.lastname;
        displayImage.src = profilePictureUrl;
        gender.value=data.gender,
        dob.value=data.dob
      });
      
    } else {
      // User is not signed in, handle accordingly
      console.log("No user is signed in.");
    }
  }
  
  
  function update() {
    var user = firebase.auth().currentUser;
    if(user){
      var userId = user.uid;
    var firstname = document.getElementById('firstname').value
    var email = document.getElementById('email').value
    var lastname = document.getElementById('lastname').value
    var gender = document.getElementById('gender').value
    var dob = document.getElementById('dob').value
  
    var updates = {
      email : email,
      firstname:firstname,
      lastname:lastname,
      gender:gender,
      dob:dob
      
    }
  
    database.ref('users/' + userId).update(updates)
  
  }
  }
  
  function remove() {
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    database.ref('users/' + userId).remove()
    alert('deleted')
  }
  
  function uploadPicture(){
    const input=document.getElementById("profilePictureInput");
    if (input.files && input.files[0]){
    const imageFile=input.files[0];
    var user = firebase.auth().currentUser;
    if(user){
      const storageRef=storage.ref('images/' + user.uid);
      storageRef.put(imageFile).then((snapshot)=>{
      console.log("Image uploaded Successfully");
      storageRef.getDownloadURL().then((downloadURL)=>{
        saveImageUrlToDatabase(user.uid,downloadURL);
        document.getElementById("displayImage").src=downloadURL;
      });
    });
    }
    else{
      console.log("User Not Signed in.");
    }
    }
		}

    function saveImageUrlToDatabase(userId, imageUrl) {
      // Assume 'users' is the root node in your Realtime Database
      const database = firebase.database();
      const usersRef = database.ref('users');
  
      // Update the 'profilePicture' property for the specified user
      usersRef.child(userId).update({
          profilePicture: imageUrl
      }).then(() => {
          console.log("Image URL saved to the Realtime Database.");
      }).catch((error) => {
          console.error("Error saving image URL to the Realtime Database:", error);
      });
  }
  
