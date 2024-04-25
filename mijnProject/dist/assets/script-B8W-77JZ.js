const getRandomArt = async () => {
  const randomBackground = await fetch("/random");
  console.log("TEST", randomBackground);
};
getRandomArt();
