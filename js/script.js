// Fetch, Load and Show categories in html

const loadCategories = () =>{

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(err => console.log(err))
}




const displayCategories = (data) =>{
    const buttonContainer = document.getElementById('item'); 
    data.forEach(categories => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = categories.category;
        buttonContainer.append(button)
    });

}















loadCategories()