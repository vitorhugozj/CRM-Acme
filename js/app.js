'use strict'

export async function getFilmes() {
  const url = 'http://localhost:8080/v2/acmefilmes/filmes'
  
  const response = await fetch(url)
  const data = await response.json()
  
  return data.filmes
}


const cardsList = document.getElementById('cards-list');

async function fetchFilms() {
  const response = await fetch('/films');
  const films = await response.json();
  return films;
}

async function addFilm(film) {
  const response = await fetch('http://localhost:8080/v2/acmefilme/filme', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(film),
  });
  const addedFilm = await response.json();
  return addedFilm;
}

async function updateFilm(film) {
  const response = await fetch(`http://localhost:8080/v2/acmefilmes/filme/${film.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(film),
  });
  const updatedFilm = await response.json();
  return updatedFilm;
}

async function deleteFilm(id) {
  const response = await fetch(`http://localhost:8080/v2/acmefilmes/filme/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
}

(async () => {
  const films = await fetchFilms();
  films.forEach((film) => renderCard(film));
})();

document.getElementById('add-button').addEventListener('click', () => {
  const title = prompt('Digite o título do filme:');
  const price = prompt('Digite o preço do filme:');
  const year = prompt('Digite o ano de lançamento do filme:');
  addFilm({ title, price, year }).then((addedFilm) => renderCard(addedFilm));
});


cardsList.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-button')) {
    const cardElement = event.target.closest('.card');
    const id = cardElement.dataset.id;
    const title = prompt('Digite o novo título do filme:');
    const price = prompt('Digite o novo preço do filme:');
    const year = prompt('Digite o novo ano de lançamento do filme:');
    const updatedFilm = { id, title, price, year };
    updateFilm(updatedFilm).then((updatedFilm) =>
      cardElement.replaceWith(renderCard(updatedFilm))
    );
  }
});


cardsList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    const cardElement = event.target.closest('.card');
    const id = cardElement.dataset.id;
    deleteFilm(id).then(() => cardElement.remove());
  }
});


function renderCard(film) {
  const cardElement = document.createElement('li');
  cardElement.classList.add('card');
  cardElement.dataset.id = film.id;
  cardElement.innerHTML = `
    <h2>${film.title}</h2>
    <p>${film.price} - ${film.year}</p>
    <button class="edit-button">Editar</button>
    <button class="delete-button">Excluir</button>
  `;
  cardsList.appendChild(cardElement);
  return cardElement;
}