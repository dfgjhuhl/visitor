const places = {
  nature: [
    {
      id: "1",
      title: "Brīvības piemineklis",
      address: "Centra rajons",
      img: "https://static.lsm.lv/media/2025/11/large/7/s0zk.jpg"
    },
    {
      id: "2",
      title: "Dvīņu ūdenstorņi",
        address: "Mazā Matīsa iela 2",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrGq-Rx9a-Fb1ue-4B7l6eNwuyGOLZyQXdDQ&s"
    },
    {
      id: "3",
      title: "Kronvalda parks",
      address: "Kalpaka bulvāris 12",
        img: "https://static.where-e.com/Latvia/Riga/Kronvalda-Park_4a768ff1fe9d2c90d511393baedf1259.jpg"
    },
    {
      id: "4",
      title: "Ķemeru nacionālais parks",
        address: "Meža mājā",
        img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS63AhnUiDmiRUpYFA_t8WHiRGP5ZYrCE-u0wSh81iXnVfALCi8"
    }
  ],

  museums: [
    {
      id: "5",
      title: "Mākslas muzejs",
      address: "Jāņa Rozentāla laukums 1",
          img: "https://www.liveriga.com/userfiles/images/ko-darit/muzeji-un-galerijas/visi-muzeji/latvijas-nacionalais-makslas-muzejs/5.jpg?w=780&mode=3:2|crop"
    },
    {
      id: "6",
        title: "Rīgas vēstures un kuģniecības muzejs",
      address: "Palasta iela 4",
        img: "https://s.familywithkids.com/sites/default/files/styles/card_395_200/public/06/16/2016_-_1155/muzey_istorii_rigi_i_morehodstva_riga_foto_001.jpg"
    },
    {
      id: "7",
      title: "Cosmos",
      address: "Doma laukums 1A",
        img: "https://lh3.googleusercontent.com/p/AF1QipMr6LHEITWl657kowpyCX3JjuQ5YfTZZON9ZjGU=w600-k"
    }
  ],

  cafes: [
    {
      id: "8",
      title: "Pētergailis",
      address: "Skārņu iela 25",
      img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR6N8vZwylqFm13KEURoOtoxHGe59FHVLShr0ryVpgflJzn3O3f"
    },
    {
      id: "9",
      title: "Parunāsim kafetēka",
      address: "Mazā Pils iela 4",
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQHiAekKOtNkxoDiiioc1wcjbJTEQKkIigVVnjgQ6ScxWm7DZnT"
    },
    {
      id: "10",
      title: "OGLE",
      address: "Kaļķu iela 4",
      img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTwjA_srycl4541eSId5zAwHWioWmSl11wxi5pGKNw-lexKHgFI"
    },
    {
      id: "11",
      title: "Zvaigzne CAFE",
      address: "Valdemāra iela 6",
      img: "https://gospecialtycoffee.com/medialibrary/2023/05/zvaigzne-cafe-riga-01-gospecialtycoffee.jpg"
    }
  ],

  hotels: [
    {
      id: "12",
      title: "Hotel Monte Kristo",
      address: "Kalēju iela 56",
      img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/15402302.jpg?k=b409efe5da55660cd91ea008a8c9e77a8094cb38b71ab9f76a53c8ec92edad63&o="
    },
    {
      id: "13",
      title: "Hotel Mežaparks",
      address: "Roberta Feldmaņa iela 11",
        img: "https://site-2024479.mozfiles.com/files/2024479/medium/LNSC_viesnica_Sporta_centrs_Mezaparks.jpg"
    },
    {
      id: "14",
      title: "MONIKA Centrum Hotels",
      address: "Elizabetes iela 21",
      img: "https://www.celotajs.lv/g/Accomm/Latvia/Riga/0659/cfcba88299880ac54350b282341ea5d3.jpg?size=640"
    }
  ]
};

const allPlaces = [
  ...places.nature,
  ...places.museums,
  ...places.cafes,
  ...places.hotels
];

const accountsKey = "accounts";
const currentUserKey = "currentUser";
const savedByUserKey = "savedByUser";

function getAccounts() {
  return JSON.parse(localStorage.getItem(accountsKey)) || {};
}

function setAccounts(accounts) {
  localStorage.setItem(accountsKey, JSON.stringify(accounts));
}

function getCurrentUser() {
  return localStorage.getItem(currentUserKey);
}

function setCurrentUser(email) {
  localStorage.setItem(currentUserKey, email);
}

function clearCurrentUser() {
  localStorage.removeItem(currentUserKey);
}

function getSavedByUser() {
  return JSON.parse(localStorage.getItem(savedByUserKey)) || {};
}

function setSavedByUser(data) {
  localStorage.setItem(savedByUserKey, JSON.stringify(data));
}

function getCurrentUserSaved() {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];
  const savedByUser = getSavedByUser();
  return savedByUser[currentUser] || [];
}

function setCurrentUserSaved(ids) {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  const savedByUser = getSavedByUser();
  savedByUser[currentUser] = ids;
  setSavedByUser(savedByUser);
}

function updateAuthButton() {
  const openAuthButton = document.getElementById("openAuth");
  const currentUser = getCurrentUser();

  if (currentUser) {
    openAuthButton.textContent = "Log out";
  } else {
    openAuthButton.textContent = "Sign up / Log in";
  }
}

function createCard(item) {
  return `
    <div class="card">
      <img src="${item.img}" alt="${item.title}">
      <div class="card-content">
        <div class="card-title">${item.title}</div>
        <div class="card-address">📍 ${item.address}</div>
        <button onclick="savePlace('${item.id}')">Save</button>
      </div>
    </div>
  `;
}

function render() {
  document.getElementById("grid1").innerHTML = places.nature.map(createCard).join("");
  document.getElementById("grid2").innerHTML = places.museums.map(createCard).join("");
  document.getElementById("grid3").innerHTML = places.cafes.map(createCard).join("");
  document.getElementById("grid4").innerHTML = places.hotels.map(createCard).join("");
}

function savePlace(id) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    alert("Please create an account or log in first.");
    return;
  }

  let saved = getCurrentUserSaved();

  if (!saved.includes(id)) {
    saved.push(id);
    setCurrentUserSaved(saved);
  }

  renderSaved();
}

function removePlace(id) {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  let saved = getCurrentUserSaved();
  saved = saved.filter(itemId => itemId !== id);
  setCurrentUserSaved(saved);
  renderSaved();
}

function renderSaved() {
  const currentUser = getCurrentUser();
  const savedContent = document.getElementById("savedContent");

  if (!currentUser) {
    savedContent.innerHTML = "<p>Please log in to see saved locations.</p>";
    return;
  }

  const saved = getCurrentUserSaved();
  const savedPlaces = allPlaces.filter(place => saved.includes(place.id));

  if (savedPlaces.length === 0) {
    savedContent.innerHTML = "<p>No saved locations yet.</p>";
    return;
  }

  savedContent.innerHTML = savedPlaces.map(item => `
    <div class="saved-card">
      <img src="${item.img}" alt="${item.title}">
      <div class="card-content">
        <div class="card-title">${item.title}</div>
        <div class="card-address">📍 ${item.address}</div>
        <button onclick="removePlace('${item.id}')">Remove</button>
      </div>
    </div>
  `).join("");
}

function openSavedPanel() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    alert("Please log in first.");
    return;
  }

  document.getElementById("savedPanel").classList.add("show");
  renderSaved();
}

function closeSavedPanel() {
  document.getElementById("savedPanel").classList.remove("show");
}

function openAuthModal() {
  document.getElementById("authModal").classList.add("show");
}

function closeAuthModal() {
  document.getElementById("authModal").classList.remove("show");
}

function handleAuthAction() {
  const currentUser = getCurrentUser();

  if (currentUser) {
    clearCurrentUser();
    updateAuthButton();
    closeSavedPanel();
    document.getElementById("savedContent").innerHTML = "";
    return;
  }

  openAuthModal();
}

function handleCreateOrLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const accounts = getAccounts();

  if (accounts[email]) {
    if (accounts[email] === password) {
      setCurrentUser(email);
      alert("Logged in successfully.");
    } else {
      alert("Incorrect password.");
      return;
    }
  } else {
    accounts[email] = password;
    setAccounts(accounts);
    setCurrentUser(email);
    alert("Account created successfully.");
  }

  updateAuthButton();
  renderSaved();
  closeAuthModal();

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

document.getElementById("openSaved").addEventListener("click", openSavedPanel);
document.getElementById("closeSaved").addEventListener("click", closeSavedPanel);
document.getElementById("openAuth").addEventListener("click", handleAuthAction);
document.getElementById("closeAuth").addEventListener("click", closeAuthModal);
document.getElementById("createAccountBtn").addEventListener("click", handleCreateOrLogin);

render();
updateAuthButton();
renderSaved();