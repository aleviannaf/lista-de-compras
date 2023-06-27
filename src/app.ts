// src/app.ts
import express, { json, Application, Request, Response } from "express";
import { createList, deleteItemList, deleteList, requestAllList , requestList} from "./logic";
import { checkIdList,  validateDataMiddleware,  validateListMiddleware } from "./middleware";


const app: Application = express();
app.use(json());


app.post("/purchaseList", validateListMiddleware, validateDataMiddleware, createList )
app.get("/purchaseList", requestAllList)
app.get("/purchaseList/:id", checkIdList, requestList)
app.delete("/purchaseList/:id", checkIdList, deleteList)
app.delete("/purchaseList/:id/:name", checkIdList, deleteItemList)


const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));