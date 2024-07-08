import {
  renderBookList,
  renderAuthorInfo,
  renderNewUserForm,
  renderNewUser,
} from './render-functions.js';
import {
  getFirstThreeFantasyBooks,
  getAuthor,
  createNewUser,
} from './fetch-functions.js';

export default async function app(appDiv) {
  const bookListEl = document.createElement('ul');
  bookListEl.id = 'book-list';
  appDiv.append(bookListEl);

  const authorInfoEl = document.createElement('div');
  authorInfoEl.id = 'author-info';
  appDiv.append(authorInfoEl);

  const newUserEl = document.createElement('div');
  newUserEl.id = 'new-user';
  appDiv.append(newUserEl);

  const newUserFormEl = document.createElement('form');
  newUserFormEl.id = 'new-user-form';
  appDiv.append(newUserFormEl);
  // Render the form!
  // renderNewUserForm;

  // Fetch the books!
  const books = await getFirstThreeFantasyBooks();
  console.log(books)
  // render out the books
  renderBookList(bookListEl, books)
  
  bookListEl.addEventListener('click', async (e) => {
    if(e.target.matches('button')){
      const data = await getAuthor(e.target.dataset.authorUrlKey);
      renderAuthorInfo(authorInfoEl, data)
    }
  })
  renderNewUserForm(newUserFormEl);
  newUserFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData)
    const user = await createNewUser(userData);
    renderNewUser(newUserEl,user);
  })
}
