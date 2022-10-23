const content = document.getElementById("content");
const mql = window.matchMedia("(max-width: 800px)")

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

    let contentAmount;

    console.log(mql);
    if (mql.matches) {
    contentAmount = 2;
    console.log("no")
    } else {
    contentAmount = 8;
    console.log("yes")
    }
    console.log(contentAmount);
    for (i = 0; i < json.items.length; i++) {
                if (i < contentAmount) {
                const childDiv = document.createElement("div");
                const img = document.createElement("img");
                const link = document.createElement("a");
                const nameDiv = document.createElement("div");
                const title = document.createElement("div");

                parentDiv.setAttribute("class", "media-group");
                parentDiv.setAttribute("class", "new-releases");
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
                } else {
                    return;
                }

       }

}

function mediaqueryresponse() {
const rmvContent = document.getElementsByClassName("new-releases");
const artists = document.getElementsByClassName("artist");
const artistsarr = [];
for(i = 0; i < artists.length; i++) {
    artistsarr.push(artists[i]);
}
console.log(rmvContent);
console.log(artists);

for (i = 8; i >= artists.length; i--) {

    if (mql.matches) {
    console.log(artistsarr);
        if (i > 2) {
        console.log(artists[i - 1]);
        artists[i - 1].remove();
        }

    } else {
        console.log(artists)
    }

}
//rmvContent.parentNode.removeChild(rmvContent);


//CallListOfNewReleases();
}

CallListOfNewReleases();
mql.addListener(mediaqueryresponse);