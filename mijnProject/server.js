// hier import ik alle nodige packages
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

// initialiseer de liquid-templating engine
const engine = new Liquid({
  extname: '.liquid' // Specificeer bestandsextensie voor Liquid-templates
});

// Maak een nieuwe TinyHTTP-applicatie aan
const app = new App();
// de url die gebruikt wordt om mijn api gegevens op te roepen
const baseURL = "https://www.rijksmuseum.nl/api/nl/collection?key="+process.env.APIKEY+"&ps=20";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

// Configureer middleware en start de server
app
  .use(logger())
  .use(cookieParser()) // Gebruik cookie-parser middleware om cookies te parseren
  .use(serveStatic(path.join(__dirname, 'dist/assets'))) // Serveer statische bestanden vanuit de 'dist/assets'-map
  .use(urlencoded())
  .listen(3000); // Start de server op poort 3000

// Behandel GET-verzoeken naar de home pagina ('/')
app.get('/', async (req, res) => {
  const rijksData = await getRijksData(); // Haal gegevens op van de Rijksmuseum API
  const likes = req.cookies.likes ? req.cookies.likes : [] 
  //hierboden een if statement. haal de likes cookies op, als er geen likes in de cookies bestaan, dan geeft hij een lege array aan likes.
  //hiermee kan je weten hoeveel likes er zijn. en je haalt het hele object op, maar we hebben alleen de id nodig
  //hieronder maken we een array waarin liked ids in komen te staan.
  const likedIds = []
  // loop door de likes array waar de objecten in zitten en pak van elke liked object het id en stop die in de likedIds array
  likes.forEach(item => likedIds.push(item.id))
  //met deze functie stuur ik naar index.liquid template, de volgende data door: rijksdata, likecount en likes.
  return res.send(renderTemplate('views/index.liquid', { rijksData: rijksData, likeCount: likes.length, like: likedIds }));
  // je geeft een response waarin een sjabloon wordt gerenderd die wordt opgeslagen in het mapje views in dit sjabloon wordt
  // de rijksdata, lengte van de likes array zodat ik kan laten zien hoeveel likes er zijn en de likedIds
});


// Behandel POST-verzoeken naar het '/like'-eindpunt AKA de form die action /like heeft als ik het goed begrijp.
app.post('/like', async (req, res) => {
  // weer hetzelfde als bij het GET verzoek hierboven voor de home pagina.
  const likes = req.cookies.likes ? req.cookies.likes : [] 
  // een variabele met de waarde van likes
  let filteredLikes = likes
  // In de context van deze code is filteredLikes bedoeld als een tijdelijke
  // variabele waarin de likes van de gebruiker worden gefilterd op basis van bepaalde voorwaarden.
  // hieronder wordt een nieuw object gemaakt op basis van de gegevens die zijn 
  // opgehaald door het POST-verzoek die ik in het liquid bestand hebt staan. Elke keer als er een nieuwe like gemaakt wordt,
  //wordt die like in newLike gestopt.
  const newLike = {
    id: req.body.id,
    title: req.body.title,
    image: req.body.image,
    maker: req.body.maker,
    longTitle: req.body.longTitle
  }
  // hieronder een functie om te checken of de like al bestaat in de Array
  // likeExists geeft true of valse en de value bevat het id van de like die gecheckt wordt.
  // ik heb heel lang vastgezeten bij dit stukje. Ik denk dat het kwartje nog niet helemaal perfect is gevallen, maar ik
  // merk wel dat het allemaal ietje meer duidelijk wordt.
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
  // dit doe ik ook voor de homepagina, dit doe ik nu ook voor de detaill pagina.
  return res.send(renderTemplate('views/detail.liquid', { likes }));
});


// API inladen
const getRijksData = async () => {
  const response = await fetch(baseURL);
  const rijksData = await response.json();
  
  return rijksData;
};


const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

// schrijf op wat er gebrurd, schrijf in je proces op wat je geleerd hebt en waar je tegenaan gelopen bent en code voorbeeldtjes hiervan. Op render zetten. vooral bij mijn proces vertellen wat ik heb geleerd. 
