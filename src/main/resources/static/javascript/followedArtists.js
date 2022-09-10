const content = document.getElementById("content");

async function GetFollowedArtists() {

    return await fetch("http://localhost:8080/api/user-followed-artists")
    .then(response => response.json())
    .then((response) => {
        return response;
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })
}

async function callTopArtists() {
    const json = await this.GetFollowedArtists();
    for (i = 0; i < json.length; i++) {
            const li = document.createElement("li");
            const img = document.createElement("img");
            console.log(json);
            img.setAttribute("src", json[i].images[0].url);

            li.appendChild(img);
            content.appendChild(li);
    }
}

callTopArtists();