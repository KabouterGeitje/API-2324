# API @cmda-minor-web 2023 - 2024

## week 1

In week 1 hebben we uitleg gekregen over wat we gingen doen. Tijdens de uitleg werd er verteld over npm, packages, API's heel veel dingen die ik niet kende. Ik keek om mij heen en zag iedereen volwaardig meeknikken en ik dacht even. 'oh sh*t', 'ik heb geen idee wat er allemaal gezegd wordt'. Dit was een beetje intimiderend en ik voelde me niet echt zelfverzekerd. Gelukkig kregen we vanaf het begin al veel hulp om een start te maken. Ik vond het wel lastig om code te krijgen om mee te werken waarin ik zo weinig begreep. Er werd mij verteld dat ik ook niet alles hoefde te begrijpen, maar hierdoor had ik het idee dat ik niet echt kon werken in de code, omdat ik bang was dingen kapot te maken en het zorgde voor een enorme blokkade. 

Ik had wel nagedacht over wat ik wilde doen. Ik wilde gebruik maken van de Rijksmuseum API en hiermee een doomscroll pagina maken. Qua doelen voor mezelf dacht ik vooral aan de volgende dingen:

- Ook maar 50% meer begrijpen van de stof dan dat ik nu doe.
- Meer vragen stellen.
- Het vak halen.

## week 2

Ik werd de eerste week ziek, waardoor ik ook niet veel meer had kunnen doen. Maandag was ik er weer en toen moest ik bedenken hoe ik die API moest linken. Ik had geen idee hoe ik dit moest doen en heb toen gelukkig hulp gekregen van Cyd. Hierna heb ik ook gelijk met haar gekeken naar hoe ik de informatie uit de API in mijn liquid bestanden kon krijgen. Nu kon ik eindelijk een beetje verder.

```
// API inladen 
const getRijksData = async () => {
  const response = await fetch(baseURL);
  const rijksData = await response.json();
  
  return rijksData;
};

<ul>
  {%- for artwork in likes %}
    <li>
      <h2>{{ artwork.title }}</h2>
      <img src="{{ artwork.image }}" alt="">
      <details>
        <summary data-open="...lees minder" data-close="Lees meer..."></summary>
      <h3>{{ artwork.title }} - {{ artwork.principalOrFirstMaker }}</h3>
      <p>{{ artwork.longTitle }}</p>
      </details>
    </li>
    {% endfor %}
</ul>
```
## week 3

Ik voelde me compleet tot einde raad deze week. Ik schaamde me ervoor dat ik overal zo weinig van begreep en wilde niemand lastig vallen met mijn vragen en problemen. Ik zat vast na wat ik samen met Cyd had gedaan en wist niet zo goed wat ik allemaal zou kunnen doen. Alles voelde enorm buiten
mijn capaciteiten en ik raakte een beetje ontmoedigd. Ook deed mijn css het opeens niet meer. Gelukkig had Fehrat hier aan het einde van de week bij geholpen en Declan keen ook nog even mee. De oorzaak was dat de statische bestanden niet goed meegegeven werden. 

app
    .use(serveStatic(path.join(__dirname, 'dist/assets'))) // Serveer statische bestanden vanuit de 'dist/assets'-map

## week 4

Deze week voelde als een bui die aankwam zetten. Ik vond mijn hele project maar saai en wist niet zo goed wat ik kon doen om het leuker te maken. Toen ik wat met mede klasgenoten had gepraat en had gezien wat zij gemaakt hadden, hadden ze me op het idee geholpen om een like functie toe te voegen en een like pagina waar de likes te vinden zouden zijn. klinkt eigenlijk alsnog niet heel erg indrukwekkend, maar voor mij klonk dit als een enorme opgave, puur omdat ik geen enkel idee had waar ik moest beginnen. Gelukkig wist ik aan wie ik dit kon vragen. Cyd!!

Cyd heeft in principe mijn code geschreven. Welliswaar met mij aan haar zijde, maar ik was als een verloren puppy met schaapachtige ogen en een mond die niet wilde ophouden met gapen. (ik vond het echt wel interessant, maar mijn brein kon het allemaal moeilijk registreren) Ik denk dat de angst om het niet te begrijpen mij alleen maar meer blokkeerd en die angst wordt erger wanneer er mensen bij zijn die mij iets proberen uit te leggen of die mij beoordelen op mijn cognitieve vermogen. Dit werkt natuurlijk he le maal averechts wanneer je hulp nodig hebt, maar je hersenen werken niet mee. Al met al had ik dus niet veel vertrouwen in de beoordeling en ging er eigenlijk al vanuit dat ik hem niet zou halen.

## beoordeling 

Daar waren we. De beoordeling. Ik moest mij inhouden niet spontaan in tranen uit te barsten toen ik naar Cyd liep, maar Cyd ontving me weer met veel geduld en had me uitgelegd hoe ik misschien toch een voldoende kon krijgen voor alles. De criteria had ik, op een readme na. En mijn begrip van de code moest natuurlijk beter. Ook de styling was aan de saaie kant. Hiermee moest ik dus aan de slag!

## herkansig

En tot slot de herkansing. Ik ben begonnen met de styling verbeteren. Hier ben ik eigenlijk ook weer te lang op blijven haken. Het grid op de detail pagina vond ik niet mooi, en iets mooiers dan dit kon ik eruiteindelijk niet van maken helaas, maar dat is okay. Verder heb ik de styling gewoon interessanter gemaakt en kleine dingen toegevoegd die het leuker en mooier maakt allemaal. 

Het belangrijkste vond ik het begrijpen van de code. Ik vind het moeilijk om concreet te zeggen wat ik heb geleerd. Ik heb zeker meer verstand van wat er gebeurd in de code, maar weet niet zo goed hoe ik concreet kan zeggen wat dit betekend voor mij in mijn hoofd. 

Nu ik erover nadenk heb ik op basis niveau geleerd hoe je met npm kunt werken. Dat npm een pakketbeheerder is waarmee je packages kunt downloaden voor je project en die kan je inladen in je javascript en daar gebruiken. Een template language waarmee je net iets meer kunt dan met een html file. Zo kan je ook default blokken maken die op elke pagina hetzelgde zijn (zoals in de {% layout "layouts/base.liquid" %}) Ik ben me bewuster van de mogelijkheden die er ontstaan door met packages en template languages te werken. 

Ik heb geleerd hoe je met GET en POST bepaalde data ophaald en hoe je dit voor verschillende links kunt doen. Dit kan met de link naar de homepagina, de detail pagina, maar ook met een form. Met de GET functie in mijn code hebben we cookies kunnen maken op basis van een form in mijn liquid met een submit button. Als er op deze submit button geklikt wordt gaat de POST functie aan de slag. Die krijgt van de form allemaal informatie. Deze slaat hij op in een variabele als deze niet al bestaat. Als deze wel bestaat, haalt hij hem eruit. etc. Ik zou kunnen zeggen dat ik geleerd heb hoe ik informatie kan opslaan in de cookies en hoe ik die informatie weer kan laten terug komen op een andere plek, maar ik vind wel dat het echt 100% begrijpen nog niet doe. Als ik het stap voor stap doorneem, en lang naar kijk, dan voel ik dat ik het begrijp, maar zelf zou ik dit niet hebben bedacht. Elke stap die nodig is om tot het doel te komen, is voor mij soms nog onduidelijk. Ik merk dat javascript een hele domme taal is (als in je moet zo goed als alles voor hem doen) Je moet alles stap voor stap doen. Wat eigenlijk heel logisch is, maar mijn hoofd denkt nog niet helemaal in stapjes en ik vind het lastig om die stappen goed te kunnen zien, maar ik merk wel echt verbetering dan vóór ik begon aan dit vak. Alles stap voor stap voor mezelf uitleggen hielp ook enorm met begrijpen.

Dit was voor mij een pittig vak, maar ik heb mijn best gedaan en meer kan ik er niet van maken.
Graag tot bij de beoordeling!
