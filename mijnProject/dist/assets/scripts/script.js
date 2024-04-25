// console.log("worstenbroodje");

// const baseURL = "https://www.rijksmuseum.nl/api/nl/collection?key="+process.env.APIKEY+"&ps=10";

const getRandomArt = async () => {
    const randomBackground = await fetch('/random')
    console.log("TEST", randomBackground);
}

getRandomArt();


// const html = document.querySelector(html);
// html.style.setProperty(--background-image, "url("+randomArt+")");

