// get time
function getTime(time) {
  //get Hour and rest seconds
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour  ${minute} minute ${remainingSecond} second ago`;
}
// display details
const displayDetails = (video) =>{
const modalDetails = document.getElementById('modalContent')

document.getElementById('showModalData').click()
}
// load details
const loadDetails =(id)=>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
  .then(res =>res.json())
  .then(data => displayDetails(data.video))
}

// remove active class
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("bg-red-900", "text-white");
  }
};
// category video load
const loadCategoryVideo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("bg-red-900", "text-white");
      displayVideo(data.category);
    });
};

// display catagories

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("item");
  categories.forEach((category) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${category.category_id}" onclick="loadCategoryVideo(${category.category_id})" class= "btn category-btn">${category.category}</button>
    `;
    categoryContainer.append(buttonContainer);
  });
};

// fetch, load and show categories on html

const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  );
  const data = await res.json();
  displayCategories(data.categories);
};

// dynamic video section

const displayVideo = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = " ";
  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    const categoryContainer = document.createElement("div");
    categoryContainer.classList = "flex justify-center items-center";
    categoryContainer.innerHTML = `
    <div class= "text-center">
    <img class="mx-auto" src=${"../Icon.png"} />
    <h2 class="text-x mt-4 font-semibold text-red-500">Oops!! Sorry, There is no content here</h2>
    </div>
    `;
    videoContainer.append(categoryContainer);
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    const div = document.createElement("div");
    div.classList = "card card-compact";
    div.innerHTML = `
      <figure class ="relative">
    <img class= "h-52 w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
          ${
            video.others.posted_date?.length == 0
              ? ""
              : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTime(
                  video.others.posted_date
                )}</span>`
          }
  </figure>
  <div class="px-0 py-2 flex gap-3">
  <div>
  <img class= "w-10 h-10 rounded-full object-cover" src=${
    video.authors[0].profile_picture
  } alt="avatar" />
  </div>
  <div>
  <h2 class= "text-xl font-bold">${video.title}</h2>
  <div class="flex gap-2 items-center">
  <p class= "text-sm text-gray-400">${video.authors[0].profile_name}</p>
  
            ${
              video.authors[0].verified == true
                ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>`
                : ""
            }

  </div>
  <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
  <div/>
  
  </div>
    `;
    videoContainer.append(div);
  });
};

// fetch, load and show video section

const loadVideo = async (searchText = "") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  );
  const data = await res.json();
  displayVideo(data.videos);
};

document.getElementById("searchInput").addEventListener("keyup", (event)=>{
loadVideo(event.target.value)
})
loadCategories();
loadVideo();
