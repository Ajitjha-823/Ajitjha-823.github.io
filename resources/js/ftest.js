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
    database.ref('users/' + userId + '/general-profile/').set({
      Email : email,
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
  
  function get_profile() {
    var user = firebase.auth().currentUser;
  
    if (user) {
      var userId = user.uid;
      var userRef = database.ref('users/' + userId + '/general-profile/');
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
        email.value = data.Email;
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
  
  
  function update_profile() {
    var user = firebase.auth().currentUser;
    if(user){
      var userId = user.uid;
    var firstname = document.getElementById('firstname').value
    var email = document.getElementById('email').value
    var lastname = document.getElementById('lastname').value
    var gender = document.getElementById('gender').value
    var dob = document.getElementById('dob').value
  
    var updates = {
      Email : email,
      firstname:firstname,
      lastname:lastname,
      gender:gender,
      dob:dob
      
    }
    database.ref('users/' + userId + '/general-profile/').update(updates)
  }
  }
  function update_contact() {
    var user = firebase.auth().currentUser;
    if(user){
      var userId = user.uid;
    var phone = document.getElementById('phone').value
    var s_email = document.getElementById('s_email').value
    var addr_line1 = document.getElementById('a_line1').value
    var addr_line2 = document.getElementById('a_line2').value
    var landmark = document.getElementById('lm').value
    var country = document.getElementById('country').value
    var city = document.getElementById('city').value
    var pin = document.getElementById('pin').value
    var state = document.getElementById('state').value
    var updates = {
      Phone : phone,
      Secondary_email : s_email,
      Address_line1 : addr_line1,
      Address_line2 : addr_line2,
      Landmark : landmark,
      Country :country,
      State:state,
      City:city,
      Zip:pin,
    }
    database.ref('users/' + userId + '/contact-info/').update(updates)
  }
  }
  function get_contact() {
    var user = firebase.auth().currentUser;
    if (user) {
      var userId = user.uid;
      var userRef = database.ref('users/' + userId + '/contact-info/');
      userRef.on('value', function(snapshot) {
        var data = snapshot.val();
        var phone = document.getElementById('phone');
        var s_email = document.getElementById('s_email');
        var addr_line1 = document.getElementById('a_line1');
        var addr_line2 = document.getElementById('a_line2');
        var landmark = document.getElementById('lm');
        var country = document.getElementById('country');
        var city = document.getElementById('city');
        var pin = document.getElementById('pin');
        var state = document.getElementById('state');
        phone.value = data.Phone;
        s_email.value = data.Secondary_email;
        addr_line1.value = data.Address_line1;
        addr_line2.value = data.Address_line2;
        landmark.value = data.Landmark;
        country.value = data.Country; 
        city.value = data.City;
        pin.value = data.Zip;
        state.value = data.State;
      });
    } else {
      console.log("No user is signed in for get-contact");
    }
  }
  
  function update_social_links() {
    var user = firebase.auth().currentUser;
  
    if (user) {
      var userId = user.uid;
      var fb = document.getElementById('facebook').value
      var tw = document.getElementById('twitter').value
      var lk = document.getElementById('linkedin').value
      var insta = document.getElementById('instagram').value
  
      var updates = {
        Facebook: fb,
        Instagram: insta,
        Twitter: tw,
        Linkedin: lk,
      };
  
      var socialLinksRef = database.ref('users/' + userId + '/social-links/');
  
      // Update social links in the database
      socialLinksRef.update(updates)
        .then(function () {
          console.log("Social links updated successfully!");
          // Optionally, you can provide feedback to the user here
        })
        .catch(function (error) {
          console.error("Error updating social links:", error.message);
          // Provide feedback to the user about the error
        });
    } else {
      console.log("No user is signed in.");
      // Provide feedback to the user about the authentication status
    }
  }
  

  function get_social_links() {
    var user = firebase.auth().currentUser;
    if (user) {
      var userId = user.uid;
      var userRef = database.ref('users/' + userId + '/social-links/');
      userRef.on('value', function(snapshot) {
        var data = snapshot.val();
        var fb = document.getElementById('facebook');
        var tw = document.getElementById('twitter');
        var lk = document.getElementById('linkedin');
        var insta = document.getElementById('instagram');
        fb.value = data.Facebook;
        tw.value = data.Twitter;
        lk.value = data.Linkedin;
        insta.value = data.Instagram;
      });
    } else {
      console.log("No user is signed in for get-contact");
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
      const database = firebase.database();
      const usersRef = database.ref('users');
      usersRef.child(userId + '/general-profile/').update({
          profilePicture: imageUrl
      }).then(() => {
          console.log("Image URL saved to the Realtime Database.");
      }).catch((error) => {
          console.error("Error saving image URL to the Realtime Database:", error);
      });
  }



  const auth = firebase.auth();

// Function to start a chat with a specific user
function startChat(otherUserId) {
  const user = auth.currentUser;
  const conversationId = getConversationId(user.uid, otherUserId);
  console.log('Current User:', user);

  if (user) {
    const conversationId = getConversationId(user.uid, otherUserId);
    console.log('Conversation ID:', conversationId);

    // Display messages for the specific conversation
    displayMessages(conversationId);
  } else {
    console.log("User not authenticated");
  }
  database.ref(`users/${otherUserId}/name`).once('value').then((nameSnapshot) => {
    const otherUserName = nameSnapshot.val();

    // Display the other user's name in the header (replace with your UI update code)
    updateChatHeader(otherUserName);});
  retrieveMessages(conversationId);
  }


  function updateChatHeader(otherUserName) {
    const headerElement = document.getElementById('chat-header');
  
    if (headerElement) {
      // Update the header content with the other user's name
      headerElement.innerText = `Chatting with: ${otherUserName}`;
    } else {
      console.error('Chat header element not found');
    }
  }
  
// Function to send a message to a specific user
// Function to send a message to a specific user
function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;

  const user = auth.currentUser;
  if (user) {
    const otherUserId = '3kfvgRSBxLVx2vpTPASdidVED9T2'; // Replace with the other user's UID
    const conversationId = getConversationId(user.uid, otherUserId);

    // Push the message to the specific conversation node
    const messageRef = database.ref(`conversations/${conversationId}`).push({
      text: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: user.uid,
      type: 'sent' // Add a 'type' property to indicate sent messages
    });

    // Clear the input field
    messageInput.value = '';

    // Now, you can use messageRef.key to get the unique ID of the sent message
    console.log('Sent message with ID:', messageRef.key);
  } else {
    console.log("User not authenticated");
  }
}




function displayMessages(conversationId) {
  const chatContainer = document.getElementById('chat');
  chatContainer.innerHTML = ''; // Clear previous messages
  console.log('Displaying messages for conversation ID:', conversationId);

  // Listen for changes in the specific conversation node
  database.ref(`conversations/${conversationId}`).on('child_added', snapshot => {
    const data = snapshot.val();
    console.log('Received message:', data);

    // Display the message along with the username and distinguish sent and received
    displayMessage(data);
  });
}

// Function to display a single message
function displayMessage(data) {
  const chatContainer = document.getElementById('chat');
  const messageElement = document.createElement('div');
  
  // Distinguish sent and received messages based on the 'type' property
  if (data.type === 'sent') {
    messageElement.className = 'sent-message';
  } else {
    messageElement.className = 'received-message';
  }

  messageElement.innerText = `${data.user}: ${data.text}`;
  chatContainer.appendChild(messageElement);
}


// Function to create or retrieve a conversation ID based on two user UIDs
// Function to create or retrieve a conversation ID based on two user UIDs
function getConversationId(user1, user2) {
  const sortedUids = [user1, user2].sort();
  const conversationId = sortedUids.join('_'); // Use a delimiter that won't be in the user UIDs
  console.log('Computed Conversation ID:', conversationId);
  return conversationId;
}


function retrieveMessages(conversationId) {
  const messagesRef = database.ref(`conversations/${conversationId}`);

  messagesRef.on('value', (snapshot) => {
    const chatContainer = document.getElementById('chat');
    
    // Clear previous messages
    chatContainer.innerHTML = '';

    // Iterate through new messages and display them
    snapshot.forEach((childSnapshot) => {
      const message = childSnapshot.val();
      // Create a new message element and append it to the chat container
      const messageElement = document.createElement('div');
      messageElement.innerText = `${message.text}`;
      chatContainer.appendChild(messageElement);
    });
  });
}
// Example: Change password script
function reauthenticate(currentPassword, newPassword) {
  var user = firebase.auth().currentUser;
  var credential = firebase.auth.EmailAuthProvider.credential(
    user.email, 
    currentPassword
  );

  user.reauthenticateWithCredential(credential)
    .then(function() {
      changePassword(newPassword);
    })
    .catch(function(error) {
      console.error("Reauthentication failed:", error.message);
    });
}

function changePassword(newPassword) {
  var user = firebase.auth().currentUser;

  if (user) {
    user.updatePassword(newPassword).then(function() {
      console.log("Password changed successfully!");
    }).catch(function(error) {
      console.error("Error changing password:", error.message);
    });
  } else {
    console.log("No user is signed in.");
  }
}

function updatePassword() {
  var currentPassword = document.getElementById('currentPassword').value;
  var newPassword = document.getElementById('newPassword').value;
  var repeatPassword = document.getElementById('repeatPassword').value;

  var user = firebase.auth().currentUser;

  if (user) {
    if (newPassword === repeatPassword) {
      reauthenticate(currentPassword, newPassword);
    } else {
      console.log("New password and repeat password do not match.");
    }
  } else {
    console.log("No user is signed in.");
  }
}
// Example: Click event triggers startChat

document.getElementById('send-button').addEventListener('click', function() {
  startChat('3kfvgRSBxLVx2vpTPASdidVED9T2');
});
document.getElementById('update_contact').addEventListener('click', update_contact());