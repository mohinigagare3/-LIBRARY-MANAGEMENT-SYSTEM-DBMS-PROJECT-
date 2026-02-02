let books = JSON.parse(localStorage.getItem("books")) || [];

function addBook() {
    const bookName = document.getElementById("bookName").value.trim();
    const authorName = document.getElementById("authorName").value.trim();
    const bookId = document.getElementById("bookId").value.trim();

    if (bookName === "" || authorName === "" || bookId === "") {
        alert("Please fill all fields");
        return;
    }

    const book = {
        id: bookId,
        name: bookName,
        author: authorName,
        status: "Available"
    };

    books.push(book);
    saveData();
    displayBooks();
    clearForm();
}

function displayBooks() {
    const table = document.getElementById("bookTable");
    table.innerHTML = "";

    books.forEach(book => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.id}</td>
            <td>${book.status}</td>
            <td>
                <button class="issue-btn" onclick="toggleStatus('${book.id}')">
                    ${book.status === "Available" ? "Issue" : "Return"}
                </button>
            </td>
            <td>
                <button class="delete-btn" onclick="deleteBook('${book.id}')">Delete</button>
            </td>
        `;

        table.appendChild(row);
    });
}

function toggleStatus(id) {
    books = books.map(book => {
        if (book.id === id) {
            book.status = book.status === "Available" ? "Issued" : "Available";
        }
        return book;
    });
    saveData();
    displayBooks();
}

function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    saveData();
    displayBooks();
}

function saveData() {
    localStorage.setItem("books", JSON.stringify(books));
}

function clearForm() {
    document.getElementById("bookName").value = "";
    document.getElementById("authorName").value = "";
    document.getElementById("bookId").value = "";
}

displayBooks();
