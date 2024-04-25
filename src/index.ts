import express, { Request, Response } from "express";
import cors from "cors";
import { TEvent, TArtist } from "./types";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//-----USER------

//getAllArtists
app.get("/artists", async (req: Request, res: Response): Promise<void> => {
  try {
    const result: TArtist[] = await db("artists");
    res.status(200).send(result);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});

//createArtist
app.post("/artists", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name, email, password } = req.body;

    if (
      id === undefined ||
      name === undefined ||
      email === undefined ||
      password === undefined
    ) {
      res.status(400);
      throw new Error(
        "O body deve conter os seguintes campos: id, name, email e password."
      );
    }

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ter o formato de string");
    }

    const [findId] = await db("artists").where({ id: id });

    if (findId) {
      res.status(400);
      throw new Error("Já existe um artista cadastrado com esse 'id'");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser do tipo string");
    }

    if (typeof email !== "string") {
      res.status(400);
      throw new Error("'email' deve ser do tipo string");
    }

    if (typeof password !== "string") {
      res.status(400);
      throw new Error("'password' deve ser do tipo string");
    }

    const [findEmail] = await db("artists").where({ email: email });

    if (findEmail) {
      res.status(400);
      throw new Error("Já existe um artista cadastrado com esse 'email'");
    }

    const newArtist = {
      id,
      name,
      email,
      password,
      created_at: new Date().toISOString(),
    };

    await db("artists").insert(newArtist);

    res.status(201).send({ message: "Cadastro realizado com sucesso" });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});

//deleteArtist
app.delete("/artists/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    if (idToDelete !== undefined) {
      const [findUser] = await db("artists").where({ id: idToDelete });

      if (findUser) {
        await db("artists").del().where({ id: idToDelete });
      } else {
        res.status(404);
        throw new Error("Conta não encontrada. Verifique o id.");
      }
    }

    res.status(200).send({ message: "Artista apagado com sucesso" });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});


// //getAllEvents
app.get("/events", async (req: Request, res: Response) => {
  try {
    const nameToFind = req.query.name;

    if (nameToFind) {
      const event = await db("events")
        .select()
        .where("name", "LIKE", `%${nameToFind}%`);

      if (event.length > 0) {
        res.status(200).send(event);
      } else {
        res.status(404);
        throw new Error("Evento não encontrado");
      }
    } else {
      const result = await db("events");
      res.status(200).send(result);
    }
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});


//createEvent
app.post("/events", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, place, date, imageUrl, artist } = req.body;

    if (
      id === undefined ||
      name === undefined ||
      price === undefined ||
      description === undefined ||
      place === undefined ||
      date === undefined ||
      imageUrl === undefined ||
      artist === undefined
    ) {
      res.status(400);
      throw new Error(
        "O body deve conter as seguintes propriedades: 'id', 'name', 'price', 'description', 'place', 'date', 'imageUrl' e 'artist'"
      );
    }

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser do tipo string");
    }

    const [findId] = await db("events").where({ id: id });

    if (findId) {
      res.status(400);
      throw new Error("Já existe um evento cadastrado com esse 'id'");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser do tipo string");
    }

    if (typeof price !== "number") {
      res.status(400);
      throw new Error("'price' deve ser do tipo number");
    }

    if (typeof description !== "string") {
      res.status(400);
      throw new Error("'description' deve ser do tipo string");
    }
    if (typeof place !== "string") {
      res.status(400);
      throw new Error("'place' deve ser do tipo string");
    }
    if (typeof date !== "string") {
      res.status(400);
      throw new Error("'date' deve ser do tipo string");
    }

    if (typeof imageUrl !== "string") {
      res.status(400);
      throw new Error("'imageUrl' deve ser do tipo string");
    }
    if (typeof artist !== "string") {
      res.status(400);
      throw new Error("'artist' deve ser do tipo string");
    }

    const newEvent: TEvent = {
      id,
      name,
      price,
      description,
      place,
      date,
      image_url: imageUrl,
      artist
    };

    await db("events").insert(newEvent);

    res.status(201).send({ message: "Evento cadastrado com sucesso" });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});


// deleteEvent
app.delete("/events/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    if (idToDelete !== undefined) {
      const [findId] = await db("events").where({ id: idToDelete });

      if (findId) {
        await db("events").del().where({ id: idToDelete });
      } else {
        res.status(404);
        throw new Error("Evento não encontrado. Verifique o id.");
      }
    }

    res.status(200).send({ message: "Evento apagado com sucesso" });
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});



