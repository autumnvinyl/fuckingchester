const profilePic = document.getElementById("profile-pic");
const username = document.getElementById("username");
const changeUserBtn = document.getElementById("change-user");
const postForm = document.querySelector("form");
const postsContainer = document.getElementById("posts-container");
const chooseBgBtn = document.getElementById("choose-background");

// Define an array to store the posts
let posts = [];

// Define a function to update the user info
function updateUserInfo() {
  // Prompt the user to enter a new username and select a profile picture file
  const newUsername = prompt("Enter a new username:");
  
  // Create an input element for the profile picture file selection
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      profilePic.src = reader.result;
    };
  });
  
  // Show the profile picture file selection input
  fileInput.click();

  // Update the username
  if (newUsername) {
    username.innerText = newUsername;
  }
}

// Add an event listener to the change user button
changeUserBtn.addEventListener("click", updateUserInfo);

// Define a function to display the posts
function displayPosts() {
  // Clear the posts container
  postsContainer.innerHTML = "";

  // Loop through the posts array and create an HTML element for each one
  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    const userImg = document.createElement("img");
    userImg.src = post.profilePic;
    postDiv.appendChild(userImg);

    const username = document.createElement("p");
    username.innerText = post.username;
    postDiv.appendChild(username);

    const postContent = document.createElement("p");
    postContent.innerText = post.content;
    postDiv.appendChild(postContent);

    postsContainer.appendChild(postDiv);
  });
}

// Add an event listener to the post form
postForm.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the post content from the form input
  const postContent = event.target.post.value;

  // Get the user info from the header
  const profilePicSrc = profilePic.src;
  const usernameText = username.innerText;

  // Create a new post object and add it to the posts array
  const newPost = {
    profilePic: profilePicSrc,
    username: usernameText,
    content: postContent,
  };
  posts.push(newPost);

  // Clear the form input
  event.target.post.value = "";

  // Display the updated list of posts
  displayPosts();
});

// Define a function to update the background image
function updateBackgroundImage() {
  // Create an input element for the background image file selection
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      document.body.style.backgroundImage = `url(${reader.result})`;
    };
  });
  
  // Show the background image file selection input
  fileInput.click();
}

// Add an event listener to the choose background button
chooseBgBtn.addEventListener("click", updateBackgroundImage);
