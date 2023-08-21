const signOutButton = document.getElementById("signout");

signOutButton.addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    window.location.href = "index.html"; // Redirect to a sign-out page or any other desired page
  }).catch((error) => {
    console.error("Error signing out:", error);
  });
});
