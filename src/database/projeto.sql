-- Active: 1702475408222@@127.0.0.1@3306
CREATE TABLE artists(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT(CURRENT_TIMESTAMP)
);

INSERT INTO artists (id, name, email, password, created_at)
VALUES 
    ('a001', 'Fulano', 'fulano@email.com', 'fulano123', CURRENT_TIMESTAMP),
    ('a002', 'Ciclana', 'ciclana@email.com', 'ciclana99', '2023-01-17 12:35:28'),
    ('a003', 'Beltrana', 'beltrana@email.com', 'beltrana33', '2023-12-14 12:35:28');

CREATE TABLE events(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    place TEXT NOT NULL,
    date DATE NOT NULL DEFAULT(CURRENT_TIMESTAMP),
    image_url TEXT NOT NULL,
    artist TEXT NOT NULL,
    FOREIGN KEY (artist) REFERENCES artists(id)
);

INSERT INTO events (id, name, price, description, place, date, image_url, artist)
VALUES
    ('ev001', 'Show no Zerão', 0.0, 'Lançamento do novo álbum "Carinho" do artists Fulano', 'Zerão - Londrina/PR', '2024-05-10', 'https://picsum.photos/seed/Flyer/400', 'a001'),
    ('ev002', 'Show no Moringão', 100.0, 'Ciclana pela primeira vez em Londrina! Você não pode perder!', 'Moringão - Londrina/PR', '2024-08-25', 'https://picsum.photos/seed/Show/400', 'a002'),
    ('ev003', 'Segundo Show no Moringão', 100.0, 'Show extra de Ciclana em Londrina!', 'Moringão - Londrina/PR', '2024-08-26', 'https://picsum.photos/seed/Show/400', 'a002');

