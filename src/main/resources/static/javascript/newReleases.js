const content = document.getElementById("content");
const mqls = [
    window.matchMedia("(max-width: 860px)"),
    window.matchMedia("(max-width: 1050px)"),
    window.matchMedia("(max-width: 1240px)"),
    window.matchMedia("(max-width: 1430px)"),
    window.matchMedia("(max-width: 1620px)"),
    window.matchMedia("(max-width: 1810px)"),
    window.matchMedia("(max-width: 2000px)")
];

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

    console.log(mqls);
    if (mqls.matches) {
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

                parentDiv.setAttribute("class", "media-group new-releases");
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
//const artistsarr = [];
//for(i = 0; i < artists.length; i++) {
//    artistsarr.push(artists[i]);
//}
console.log(rmvContent);
console.log(artists);

for (i = artists.length; i >= artists.length; i--) {

    if (mqls[5].matches && i > 7) {
         artists[i - 1].remove();
    } else if (mqls[4].matches && i > 6) {
      artists[i - 1].remove();
    } else if(mqls[3].matches && i > 5) {
         artists[i - 1].remove();
    } else if (mqls[2].matches && i > 4) {
         artists[i - 1].remove();
    } else if (mqls[1].matches && i > 3) {
   artists[i - 1].remove();
    } else if (mqls[0].matches && i > 2) {
//    console.log(artistsarr);
//        if (i > 2) {
        console.log(artists[i - 1]);
        artists[i - 1].remove();
    } else {
        return;
        }
    }

}
//rmvContent.parentNode.removeChild(rmvContent);


//CallListOfNewReleases();

CallListOfNewReleases();
for (i = 0; i < mqls.length; i++) {
    mqls[i].addListener(mediaqueryresponse);
}