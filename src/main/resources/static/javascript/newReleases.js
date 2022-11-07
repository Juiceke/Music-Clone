const content = document.getElementById("content");

// media checker to aid in removing and adding content as needed
const mqls = [
    window.matchMedia("(max-width: 860px)"),
    window.matchMedia("(max-width: 1050px)"),
    window.matchMedia("(max-width: 1430px)"),
    window.matchMedia("(max-width: 1620px)"),
    window.matchMedia("(max-width: 1810px)"),
    window.matchMedia("(max-width: 2000px)")
];

// extra media checker since the event listener made combining them begin functions twice
const mqlsMins = [
    window.matchMedia("(min-width: 861px)"),
    window.matchMedia("(min-width: 1051px)"),
    window.matchMedia("(min-width: 1431px)"),
    window.matchMedia("(min-width: 1621px)"),
    window.matchMedia("(min-width: 1811px)"),
    window.matchMedia("(min-width: 2001px")
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
    const parentDiv = document.createElement("div");
    parentDiv.setAttribute("class", "media-group new-releases");
    parentDiv.setAttribute("id", "parent");
    content.appendChild(parentDiv);

    let contentAmount;

    console.log(mqls);
    if (mqls[0].matches) {
    contentAmount = 2;
    console.log("no")
    } else {
    contentAmount = 8;
    console.log("yes")
    }
    console.log(contentAmount);
    addItems(0, contentAmount);
}

async function contentAmount() {
    let contentAmount;
//                 if (mqlsMins[0].matches && mqls[1].matches) {
//                         contentAmount = 3;
//                     } else if (mqlsMins[1].matches && mqls[2].matches) {
//                         contentAmount = 4;
//                     } else if (mqlsMins[2].matches && mqls[3].matches) {
//                         contentAmount = 5;
//                     } else if (mqlsMins[3].matches && mqls[4].matches) {
//                         contentAmount = 6;
//                     } else if (mqlsMins[4].matches && mqls[5].matches) {
//                         contentAmount = 7;
//                     } else if (mqlsMins[5].matches) {
//                         contentAmount = 8;
//                     }
    switch (true) {
        case mqlsMins[0].matches && mqls[1].matches:
        contentAmount = 3;
        break;
        case mqlsMins[1].matches && mqls[2].matches:
        contentAmount = 4;
        break;
        case mqlsMins[2].matches && mqls[3].matches:
        contentAmount = 5;
        break;
        case mqlsMins[3].matches && mqls[4].matches:
        contentAmount = 6;
        break;
        case mqlsMins[4].matches && mqls[5].matches:
        contentAmount = 7;
        break;
        case mqlsMins[5].matches:
        contentAmount = 8;
        break;
    }
    return contentAmount;
}

async function mediaQueryResponseRemove() {

const rmvContent = document.getElementsByClassName("new-releases");
const artists = document.getElementsByClassName("artist");


//let contentAmount;
const amount = await contentAmount();

//if (mqlsMins[0].matches && mqls[1].matches) {
//        contentAmount = 3;
//    } else if (mqlsMins[1].matches && mqls[2].matches) {
//        contentAmount = 4;
//    } else if (mqlsMins[2].matches && mqls[3].matches) {
//        contentAmount = 5;
//    } else if (mqlsMins[3].matches && mqls[4].matches) {
//        contentAmount = 6;
//    } else if (mqlsMins[4].matches && mqls[5].matches) {
//        contentAmount = 7;
//    } else if (mqlsMins[5].matches) {
//        contentAmount = 8;
//    }

for (i = amount; i < artists.length; i++) {
console.log(i);
       await artists[i].remove();
//    if (mqls[5].matches && i > 7) {
//         artists[i - 1].remove();
//    } else if (mqls[4].matches && i > 6) {
//      artists[i - 1].remove();
//    } else if(mqls[3].matches && i > 5) {
//         artists[i - 1].remove();
//    } else if (mqls[2].matches && i > 4) {
//         artists[i - 1].remove();
//    } else if (mqls[1].matches && i > 3) {
//   artists[i - 1].remove();
//    } else if (mqls[0].matches && i > 2) {
//        console.log(artists[i - 1]);
//        artists[i - 1].remove();
//    } else {
//    console.log("problem?")
//        }
    }



    for (i = artists.length; i < amount; i++) {
//    console.log(i);
    await addItems(artists.length, amount);
//        if (mqlsMins[0].matches && mqls[1].matches) {
////            addItems(2, 3);
////        } else if (mqls[5].matches) {
////          addItems(3, 4);
//        } else if(mqlsMins[2].matches && i == 2 ) {
//             await addItems(4, 5);
//        } else if (mqlsMins[3].matches && i < 6 ) {
//             await addItems(5, 6);
//        } else if (mqlsMins[4].matches && i < 7 ) {
//            await addItems(6, 7);
//        } else if (mqlsMins[5].matches && i < 8 ) {
//            await addItems(7, 8);
//        } else {
//        return;
//}
        }
}

function mediaQueryResponseAdd() {
//const artists = document.getElementsByClassName("artist");
//
//for (i = artists.length; i >= artists.length; i--) {
////    console.log(i);
//
//
//        if (mqlsMins[0].matches && mqls[1].matches) {
//            addItems(2, 3);
//        } else if (mqlsMins[1].matches && mqls[2].matches) {
//          addItems(3, 4);
//        } else if(mqlsMins[2].matches && i < 5 ) {
//             addItems(4, 5);
//        } else if (mqlsMins[3].matches && i < 6 ) {
//             addItems(5, 6);
//        } else if (mqlsMins[4].matches && i < 7 ) {
//            addItems(6, 7);
//        } else if (mqlsMins[5].matches && i < 8 ) {
//             addItems(7, 8);
//        } else {
//        return;
//        }
//    }
}

async function addItems(artists, amount) {
const json = await this.GetListOfNewReleases();
const artiststest = document.getElementsByClassName("artist");
let artistsids = [];
//console.log(artistsid);
console.log(json);
const artistsarr = [];
for (i=0; i < 8; i++) {
artistsarr.push(json.items[i].id);
}
if (artiststest.length > 0) {
for (i=0; i < artiststest.length; i++) {
console.log(i);
artistsids.push(artiststest[i].id)
console.log(artistsids);
}
}

console.log(artistsarr);
console.log(artiststest);

const parentDiv = document.getElementById("parent");
console.log(parentDiv);
console.log(artists);
console.log(amount);

for (i = artists; i < amount; i++) {
 if (artistsarr.includes(artistsids[i])) {
    console.log("bruh");
 } else {
 const childDiv = document.createElement("div");
 const img = document.createElement("img");
 const link = document.createElement("a");
 const nameDiv = document.createElement("div");
 const title = document.createElement("div");

 childDiv.setAttribute("class", "artist")
 childDiv.setAttribute("id", json.items[i].id);
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
}

CallListOfNewReleases();
for (i = 0; i < mqls.length; i++) {
    mqls[i].addListener(mediaQueryResponseRemove);
//    mqls[i].addListener(mediaQueryResponseAdd);
}