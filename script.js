const addBookButton = document.querySelector("#add-book");
const bookDialog = document.querySelector("#book-dialog");
const submitBook = document.querySelector("#submit-book");
const closeBookDialog = document.querySelector("#close-book-dialog");

addBookButton.addEventListener("click", () => {
  bookDialog.show();
});

submitBook.addEventListener("click", (e) => {
  e.stopPropagation();
  const book = getBook();

  addBookToLibrary(book);
  bookDialog.close();
  createBookCardElement();
});

closeBookDialog.addEventListener("click", () => {
  bookDialog.close();
});

const addBookToLibrary = function (book) {
  library.push(book);
};

const library = new Array();

const getBook = function () {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;

  return new Book(title, author, pages, read);
};

const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

const createBookCardElement = function () {
  const bookContainer = document.querySelector("#book-container");
  bookContainer.classList.add("active");

  if (bookContainer.hasChildNodes()) {
    while (bookContainer.firstChild) {
      bookContainer.removeChild(bookContainer.firstChild);
    }
  }

  let bookIndex = 0;
  library.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookContainer.appendChild(bookCard);

    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("button");
    const remove = document.createElement("button");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;

    if (book.read) {
      read.textContent = "Read";
    } else {
      read.textContent = "Not Read";
    }

    remove.textContent = "Remove";

    read.classList.add("is-read");
    read.setAttribute("data-index", bookIndex);

    remove.classList.add("remove-book");
    remove.setAttribute("data-index", bookIndex);

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(remove);

    bookIndex++;
  });

  const readButtons = document.querySelectorAll(".is-read");
  const removeButtons = document.querySelectorAll(".remove-book");

  readButtons.forEach((read) => {
    read.addEventListener("click", (e) => {
      e.stopPropagation();

      changeReadStatus(read.dataset.index);
    });
  });

  removeButtons.forEach((remove) => {
    remove.addEventListener("click", (e) => {
      e.stopPropagation();

      library.splice(library[remove.dataset.index], 1);

      createBookCardElement();
    });
  });
};

const changeReadStatus = function (index) {
  if (library[index].read) {
    library[index].read = false;
  } else {
    library[index].read = true;
  }

  createBookCardElement();
};
