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

async function callFollowedArtists() {
    const json = await this.GetFollowedArtists();
    const parentDiv = document.createElement("div");
    for (i = 0; i < json.length; i++) {

            const childDiv = document.createElement("div");
            const img = document.createElement("img");
            const link = document.createElement("a");
            const name = document.createElement("h3");
            console.log(json);


            parentDiv.setAttribute("class", "media-group");
            childDiv.setAttribute("class", "artist")
            link.setAttribute("href", "http://localhost:8080/artist/" + json[i].id);
            link.setAttribute("class", "linkWrapper")
            img.setAttribute("src", json[i].images[0].url);
            img.setAttribute("class", "artistImg");
            name.innerHTML = json[i].name;

            link.append(img);
            parentDiv.appendChild(childDiv);
            childDiv.appendChild(link);
            childDiv.appendChild(name);
            content.appendChild(parentDiv);

    }
}

callFollowedArtists();