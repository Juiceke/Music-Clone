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
            const nameDiv = document.createElement("div");
            const title = document.createElement("div");
            console.log(json);


            parentDiv.setAttribute("class", "media-group");
            childDiv.setAttribute("class", "artist")
            link.setAttribute("href", "http://localhost:8080/artist/" + json[i].id);
            link.setAttribute("class", "linkWrapper")
            img.setAttribute("src", json[i].images[0].url);
            img.setAttribute("class", "artistImg");
            nameDiv.setAttribute("class", "artistInfo");
            title.setAttribute("class", "title");

            nameDiv.innerHTML = json[i].name;
            //   make word have capital letter proceeded by lowercase letters
            const word = json[i].type.charAt(0) + json[i].type.substring(1).toLowerCase();
            title.innerHTML = word;


            link.append(img);

            parentDiv.appendChild(childDiv);
            childDiv.appendChild(link);
            childDiv.appendChild(nameDiv);
            childDiv.appendChild(title);
            content.appendChild(parentDiv);

    }
}

callFollowedArtists();