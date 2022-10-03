const content = document.getElementById("content");
const url = window.location.href;
const split = url.split('/');
const id = split.at(-1);

async function GetArtist() {
//    fetch info about the artist
    return await fetch("http://localhost:8080/api/artist/" + id)
    .then(response => response.json())
    .then((response) => {
        return response;
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })
}

async function GetArtistBestTracks() {
//    fetch best tracks made by the artist
    return await fetch("http://localhost:8080/api/artist-tracks/" + id)
    .then(response => response.json())
    .then((response) => {
        return response;
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })
}

async function GetRelatedArtist() {
//    fetch artists similar to this one
    return await fetch("http://localhost:8080/api/artist-related/" + id)
    .then(response => response.json())
    .then((response) => {
        return response;
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })
}

async function callArtist() {
    const artistJson = await this.GetArtist();
    const tracksJson = await this.GetArtistBestTracks();
    const relatedJson = await this.GetRelatedArtist();
    console.log(artistJson);
    console.log(tracksJson);
    console.log(relatedJson);
    console.log(tracksJson[0].album.images[0].url)

    const name = document.createElement("h1");
    const background = document.createElement("img");

    name.innerHTML = artistJson.name;
    background.setAttribute("src", tracksJson[0].album.images[0].url)

    content.appendChild(name);
    content.appendChild(background);
}

callArtist();