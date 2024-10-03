// time function
const getTime = time =>{
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3660;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;

    return `${hour}hrs ${minute}min ${remainingSecond}sec ago`
}

// Fetch, Load and Show categories in html

const loadCategories = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))
}

const displayCategories = (data) => {
    const buttonContainer = document.getElementById('item');
    data.forEach(categories => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = categories.category;
        buttonContainer.append(button)
    });

}

loadCategories()


// fetch, load and show video section

const loadVideos = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(err => console.log(err))
}

const obj = {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}


const displayVideos = (data) => {
    const videoContainer = document.getElementById('videos');
    data.forEach(video => {
        const card = document.createElement('div');
        card.classList = 'card card-compact'
        card.innerHTML = ` <figure class= "relative">
    <img class = "h-52 w-full"
      src="${video.thumbnail}"
      alt="Shoes" />
      ${video.others.posted_date?.length == '' ? '' : `<span class= "absolute text-xs right-2 bottom-2 p-1 rounded-md bg-black text-white">${getTime(video.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
   <div>
     <img class = "w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" alt="avatar" />
   </div>
    <div>
      <h2 class= "font-bold">${video.title}</h2>
      <div class= "flex gap-3 items-center">
      <p class= "text-gray-400">${video.authors[0].profile_name}</p>
      ${video.authors[0].verified === true ? '<img class = "h-5 w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="verified" />' : " "}
      
      </div>
      <p class= "text-gray-400">${video.others.views} views</p>
   </div>
  </div>`

        videoContainer.append(card);


    })
}


loadVideos()