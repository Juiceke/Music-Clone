const content = document.getElementById("content");

async function GetListOfNewReleases() {

    return await fetch("http://localhost:8080/api/new")
    .then(response => response.json())
    .then((response) => {
        return response;
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })
}

async function CallListOfNewReleases() {
    const json = await this.GetListOfNewReleases();
    console.log(json);
    const parentDiv = document.createElement("div");
    for (i = 0; i < json.items.length; i++) {

            const childDiv = document.createElement("div");
            const img = document.createElement("img");
            const link = document.createElement("a");
            const nameDiv = document.createElement("div");
            const title = document.createElement("div");



            parentDiv.setAttribute("class", "media-group");
            childDiv.setAttribute("class", "artist")
            link.setAttribute("href", "http://localhost:8080/artist/" + json.items[i].id);
            link.setAttribute("class", "linkWrapper")
            img.setAttribute("src", json.items[i].images[0].url);
            img.setAttribute("class", "artistImg");
            nameDiv.setAttribute("class", "artistInfo");
            title.setAttribute("class", "title");

            for (j = 0; j < json.items[i].artists.length; j++) {
            nameDiv.innerHTML = json.items[i].artists[j].name;
            }
            //   make word have capital letter proceeded by lowercase letters
//            const word = json[i].type.charAt(0) + json[i].type.substring(1).toLowerCase();
//            title.innerHTML = word;


            link.append(img);

            parentDiv.appendChild(childDiv);
            childDiv.appendChild(link);
            childDiv.appendChild(nameDiv);
            childDiv.appendChild(title);
            content.appendChild(parentDiv);

    }
}

CallListOfNewReleases();