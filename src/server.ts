//SITES UTILIZADOS NESSE PROJETO
//https://jwt.io/ -- PARA GERAR NOSSA CHAVE JWT
//https://www.md5hashgenerator.com/ -- PARA GERAR NOSSA CHAVE DE COMPOSICAO PARA O JWT
//https://console.neon.tech/app/projects -- manipular o postgree , login via github
//https://vercel.com/ojuaracoders-projects -- hospedar o back e o front do projeto, login via github
//https://expo.dev/ facilitador para realizar testes no android

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import path from 'path';

import { router } from "./routes";
import fileUpload from "express-fileupload";

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
  limits:{
    fieldSize: 50 * 1024 * 1024 
  }
}))
app.use(router);

app.use( /*adicionando uma rota estatica */
  '/files',
  express.static(path.resolve(__dirname, '..','tmp'))
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  })
});

app.listen(process.env.PORT, () => console.log("Servidor online!"));
