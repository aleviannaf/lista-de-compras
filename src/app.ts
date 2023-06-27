// src/app.ts
import express, { json, Application, Request, Response } from "express";
import { createList, deleteItemList, deleteList, requestAllList , requestList, updateItem} from "./logic";
import { checkIdList,  validateDataMiddleware,  validateItemMiddleware,  validateListMiddleware } from "./middleware";


const app: Application = express();
app.use(json());


app.post("/purchaseList", validateListMiddleware, validateDataMiddleware, createList )
app.get("/purchaseList", requestAllList)
app.get("/purchaseList/:id", checkIdList, requestList)
app.delete("/purchaseList/:id", checkIdList, deleteList)
app.delete("/purchaseList/:id/:name", checkIdList, deleteItemList)
app.patch("/purchaseList/:id/:name",checkIdList, validateItemMiddleware, updateItem)


const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));