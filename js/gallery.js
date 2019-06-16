const ApiKey = "f6nkJq3ObuWVrmIMjCBfclCaJ4161pA87uw7666B";
var galleryContainer = {}
/** axios */
const NasaAPIURL = "https://api.nasa.gov/planetary/apod?";

function randomDate() {
    const e = new Date();
    const s = new Date(2010,1,2);
    return new Date(s.getTime() + Math.random() * (e.getTime() - s.getTime()));
}

function createTile(imageObject) {
    console.log(imageObject)
    if(imageObject.media_type == "video") {

        console.log("video content");

    } else {
        let image = document.createElement("img");
        let anchor = document.createElement("a");
        anchor.href = imageObject.hasOwnProperty("hdurl")? imageObject.hdurl : imageObject.url;
        anchor.addEventListener("click", e => createModal(e));
        image.src = imageObject.url;
        image.alt = imageObject.title;
        galleryContainer[imageObject.title] = imageObject
        image.setAttribute("key",imageObject.title)
        anchor.appendChild(image);
        document.getElementById("gallery-container").appendChild(anchor);
    }
}

function createModal(event) {
    event.preventDefault();
    const key = event.target.getAttribute("key");
    const hdurl = event.target.parentNode.href;
    let image = document.createElement("img");
    image.src = hdurl;
    let quitModalButton = document.createElement("button");
    quitModalButton.innerText = "Kliknij tutaj aby zamknąć modal";
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let header = document.createElement("h1");
    let desc = document.createElement("p");
    let cont = document.createElement("div");
    cont.id = "caption-container";
    header.innerText = galleryContainer[key].title;
    desc.innerText = galleryContainer[key].explanation;
    quitModalButton.addEventListener("click", e => {
        document.getElementsByTagName("body")[0].removeChild(modal)
    });
    cont.appendChild(header);
    cont.appendChild(desc);
    modal.appendChild(image);
    modal.appendChild(quitModalButton);
    modal.appendChild(cont);
    document.getElementsByTagName("body")[0].appendChild(modal);

}

function dateToDateString(myString) {
    const d = randomDate();
    const components = [d.getFullYear(), d.getMonth() + 1, d.getDay()];
    const paddings = [4, 2, 2]; // api akceptuje format YYYY-MM-DD
    return components.map((component, i) => component.toString().padStart(paddings[i], '0')).join('-');;
}

function createURL(dateString) {
    return NasaAPIURL + "api_key=" + ApiKey + "&date=" + dateString;
}


async function makeGallery() {


    let imageArray = new Array(1).fill(0)
              .map(el => dateToDateString(randomDate()))
              .map(date => createURL(date));
    console.log(imageArray);

    const results = imageArray.map(async el => axios.get(el) );
    
    Promise.all(results).then( completed => 
        {
            completed.map(image => createTile(image.data));
            const g = document.getElementById('gallery-container');

            g.dispatchEvent(new Event("imagesLoadedEvent"));

        }
    ).catch( err => console.log(err));
}

makeGallery();

