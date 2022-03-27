document.addEventListener('DOMContentLoaded', e => {
// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.

let page = 1
const fetchMonsters = () => {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(monsters => renderMonsters(monsters))
}

const title = document.querySelector("h1")
const monsterContainer = document.querySelector("#monster-container")
const backButton = document.querySelector("#back")
const forwardButton = document.querySelector("#forward")


const createForm = () => {
    const form = document.createElement("form")
    const nameInput = document.createElement("input")
    nameInput.placeholder = "name..."
    const ageInput = document.createElement("input")
    ageInput.placeholder = "age..."
    const descriptionInput = document.createElement("input")
    descriptionInput.placeholder = "description..."
    const button = document.createElement("button")
    button.innerText = "create"
    form.append(nameInput, ageInput, descriptionInput, button)
    title.append(form)

    form.addEventListener("submit", () => {
        e.preventDefault() 
        fetch('http://localhost:3000/monsters', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                age: ageInput.value,
                description: descriptionInput.value
            })
        })
        .then(response => response.json())
        .then(monsters => console.log(monsters))
    })
}

const renderMonsters = (monsters) => {
    monsterContainer.innerHTML = ""
     monsters.forEach(monster => {
        console.log(monsters)
        const name = document.createElement("h2")
        name.textContent = monster.name
        const age = document.createElement("h4")
        age.textContent = `Age: ${monster.age}`
        const description = document.createElement("p")
        description.textContent = `Bio: ${monster.description}`

        monsterContainer.append(name, age, description)
     })
}

const handlePage = () => {
    backButton.addEventListener("click", (e) => {
        console.log(e)
        page--
        fetchMonsters()
    })
    forwardButton.addEventListener("click", (e) => {
        console.log(e)
        page++
        fetchMonsters()
    })
}

fetchMonsters()
createForm()
handlePage()
})