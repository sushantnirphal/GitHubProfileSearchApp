const url = "https://api.github.com/users";
const searchInputElement = document.getElementById("searchInput");
const searchButtonElement = document.getElementById("btn");
const profileContainerElement = document.getElementById("profileContainer");
const loadingElement = document.getElementById("loading");
const generalProfile = (profile) => {
  return `<div class="profile-box">
    <div class="topsection">
        <div class="left">
            <div class="avtar">
                <img src="${profile.avatar_url}" alt="avtar">
            </div>
            <div class="self">
                <h1>${profile.name}</h1>
                <h1>${profile.login}</h1>
            </div>
        </div>
        <a href="${profile.html_url}"><button class="primary-btn">Check Profile</button></a>
    </div>
    <div class="about">
        <h2>About</h2>
        <p>${profile.bio}</p>
    </div>
    <div class="status">
      <div class="status-item">
        <h3>Followers</h3>
        <p>${profile.followers}</p>
      </div>  
      <div class="status-item">
        <h3>Followings</h3>
        <p>${profile.following}</p>
      </div>  
      <div class="status-item">
        <h3>Repos</h3>
        <p>${profile.public_repos}</p>
      </div>  
    </div>
</div>`;
};

const fetchProfile = async () => {
  const username = searchInputElement.value;

  loadingElement.innerText = "loading....";
  loadingElement.style.color = "black";

  try {
    const res = await fetch(`${url}/${username}`);
    const data = await res.json();

    if (data.login) {
      loadingElement.innerText = " ";
      profileContainerElement.innerHTML = generalProfile(data);
    } else {
      loadingElement.innerHTML = data.message;
      loadingElement.style.color = "red";
    }

  } catch (error) {
    console.log({error});
    loadingElement.innerText = "";
  }
};

searchButtonElement.addEventListener("click", fetchProfile);
