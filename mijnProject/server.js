import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import serveStatic from 'serve-static';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { urlencoded } from 'milliparsec'
import { cookieParser } from '@tinyhttp/cookie-parser'
import { log } from 'console';

const engine = new Liquid({
  extname: '.liquid'
});

const app = new App();
const baseURL = "https://www.rijksmuseum.nl/api/nl/collection?key="+process.env.APIKEY+"&ps=100";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

app
  .use(logger())
  .use(cookieParser())
  .use(serveStatic(path.join(__dirname, 'dist/assets')))
  .use(urlencoded())
  .listen(3000);

app.get('/', async (req, res) => {
  const rijksData = await getRijksData();
  const likes = req.cookies.likes ? req.cookies.likes : [] 
  // array waarin liked ids in komen te staan
  const likedIds = []
  // loop om liked ids in de array te zetten d.m.v. push
  likes.forEach(item => likedIds.push(item.id))
  
  return res.send(renderTemplate('views/index.liquid', { rijksData: rijksData, likeCount: likes.length, like: likedIds }));
  // return res.send(renderTemplate('views/index.liquid', { title: 'Home' }));
});


app.post('/like', async (req, res) => {
  const likes = req.cookies.likes ? req.cookies.likes : [] 
  let filteredLikes = likes
  const newLike = {
    id: req.body.id,
    title: req.body.title,
    image: req.body.image,
    maker: req.body.maker,
    longTitle: req.body.longTitle
  }
  // een functie om te checken of de like al bestaat in de Array
  const likeExists = value => likes.some(like =>
    like.id.includes(value)
  );

  if (likes && likeExists(req.body.id)) {
    // als likes al het id bevat filteren we hem uit de filteredLikes Array
    filteredLikes = likes.filter(like => {
      return like.id !== req.body.id
    })
  } else {
    // als likes niet het id bevat, voegen we hem toe aan de filteredLikes Array
    filteredLikes.push(newLike)
  }

  res.cookie('likes', filteredLikes)
  res.redirect('/')
});

// likes sturen naar de detail pagina.
app.get('/likes', async (req, res) => {
  const likes = req.cookies.likes ? req.cookies.likes : [] 

  return res.send(renderTemplate('views/detail.liquid', { likes }));
});

app.get('/random', async (req, res) => {
  try{
    const rijksData = await getRijksData();
  
    const artObjects = rijksData.artObjects;
    const artworksArray = []
  
    artObjects.forEach( async (artwork) => {
      // console.log("artwork url:" , artwork.webImage.url);
      const url = artwork.webImage.url;
  
      artworksArray.push(url);
    })
  
    // console.log("array:", artworksArray);
  
    const randomIndex = Math.floor(Math.random() * artworksArray.length);
    const randomArt = artworksArray[randomIndex];
  
    res.send(randomArt);
  } catch (error){
    console.log(error);
  }
});



// API inladen
const getRijksData = async () => {
  const response = await fetch(baseURL);
  const rijksData = await response.json();
  

// console.log('rijksData',  rijksData);
  return rijksData;
};


const getRandomBackground = async () => {
  const rijksData = await getRijksData();

  const artObjects = rijksData.artObjects;
  const artworksArray = []

  artObjects.forEach( async (artwork) => {
    // console.log("artwork url:" , artwork.webImage.url);
    const url = artwork.webImage.url;

    artworksArray.push(url);
  })

  console.log("array:", artworksArray);

  const randomIndex = Math.floor(Math.random() * artworksArray.length);
  const randomArt = artworksArray[randomIndex];

  return randomArt;
}


const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};


