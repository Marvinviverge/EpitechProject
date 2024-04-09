import sqlite3

# Connexion à la base de données
conn = sqlite3.connect('db.sqlite3')
c = conn.cursor()

# Création de la table si elle n'existe pas
c.execute('''CREATE TABLE IF NOT EXISTS api_book (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                author TEXT,
                condition TEXT,
                genre TEXT
                borrower TEXT
            )''')

livres = [
    ("Harry Potter à l'école des sorciers", "J.K. Rowling", "New", "Fantasy", ""),
    ("To Kill a Mockingbird", "Harper Lee", "Good", "Fiction", ""),
    ("1984", "George Orwell", "Good", "Dystopie", ""),
    ("The Great Gatsby", "F. Scott Fitzgerald", "New", "Littérature classique", ""),
    ("Pride and Prejudice", "Jane Austen", "Good", "Romance", ""),
    ("The Catcher in the Rye", "J.D. Salinger", "Good", "Jeunesse", ""),
    ("The Hobbit", "J.R.R. Tolkien", "New", "Aventure", ""),
    ("Brave New World", "Aldous Huxley", "Good", "Science-fiction", ""),
    ("The Lord of the Rings", "J.R.R. Tolkien", "New", "Fantasy", ""),
    ("The Hunger Games", "Suzanne Collins", "Good", "Dystopie", ""),
    ("The Da Vinci Code", "Dan Brown", "New", "Thriller", ""),
    ("Dune", "Frank Herbert", "Good", "Science-fiction", ""),
    ("The Shining", "Stephen King", "Good", "Horreur", ""),
    ("Gone with the Wind", "Margaret Mitchell", "Good", "Romance", ""),
    ("Moby-Dick", "Herman Melville", "New", "Aventure", ""),
    ("Les Misérables", "Victor Hugo", "Good", "Littérature classique", ""),
    ("Anna Karenina", "Leo Tolstoy", "Good", "Romance", ""),
    ("The Chronicles of Narnia", "C.S. Lewis", "New", "Fantasy", ""),
    ("The Picture of Dorian Gray", "Oscar Wilde", "Good", "Fantastique", ""),
    ("Crime and Punishment", "Fyodor Dostoevsky", "Good", "Romance", ""),
    ("The Road", "Cormac McCarthy", "New", "Aventure", ""),
    ("Jane Eyre", "Charlotte Brontë", "Good", "Romance", ""),
    ("The Secret Garden", "Frances Hodgson Burnett", "Good", "Jeunesse", ""),
    ("The Adventures of Sherlock Holmes", "Arthur Conan Doyle", "New", "Thriller", ""),
    ("Wuthering Heights", "Emily Brontë", "Good", "Romance", ""),
    ("Little Women", "Louisa May Alcott", "Good", "Jeunesse", ""),
    ("Frankenstein", "Mary Shelley", "Good", "Horreur", ""),
    ("Dracula", "Bram Stoker", "New", "Horreur", ""),
    ("The Little Prince", "Antoine de Saint-Exupéry", "Good", "Fantasy", ""),
    ("The Bell Jar", "Sylvia Plath", "Good", "Fantastique", ""),
    ("The Alchemist", "Paulo Coelho", "New", "Fantasy", ""),
    ("The Handmaid's Tale", "Margaret Atwood", "Good", "Dystopie", ""),
    ("The Sun Also Rises", "Ernest Hemingway", "Good", "Aventure", ""),
    ("The Metamorphosis", "Franz Kafka", "New", "Fantasy", ""),
    ("The Stranger", "Albert Camus", "Good", "Romance", ""),
    ("The Old Man and the Sea", "Ernest Hemingway", "Good", "Aventure", ""),
    ("Slaughterhouse-Five", "Kurt Vonnegut", "New", "Fantasy", ""),
    ("One Hundred Years of Solitude", "Gabriel García Márquez", "Good", "Romance", ""),
    ("The Grapes of Wrath", "John Steinbeck", "Good", "Romance", ""),
    ("A Tale of Two Cities", "Charles Dickens", "New", "Fantasy", ""),
    ("Title to be determined", "Unknown", "Damaged", "Autre", ""),
]

# Insertion des livres
for livre in livres:
    c.execute("INSERT INTO api_book (title, author, condition, genre, borrower) VALUES (?, ?, ?, ?, ?)", livre)

conn.commit()
conn.close()

print("Les livres ont été insérés avec succès dans la base de données.")