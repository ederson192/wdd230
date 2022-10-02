
const currentDate = new Date();
document.querySelector('#year').textContent = currentDate.getFullYear();

const oLastModif = new Date(document.lastModified);
document.querySelector('#lastmodified').textContent = oLastModif
