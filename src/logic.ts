import express, { Request, Response } from "express";
import { List } from "./database";
import { IList, IListRequest } from "./interfaces";

const createList = (request: Request, response: Response): Response => {
    const list: IListRequest = request.body

    const newList: IList = {
        id: new Date().getTime(),
        ...list,
        added_in: new Date()
    }

    List.push(newList)

    return response.status(201).json(newList);
}

const requestAllList = (request: Request, response: Response): Response => {
    return response.status(200).json(List)
}

const requestList = (request: Request, response: Response): Response => {
    const indexList = response.locals.list.indexList
    const item = List[indexList];

    return response.status(200).json(item)
}

const deleteItemList = (request: Request, response: Response): Response => {
    const indexList = parseInt(response.locals.list.indexList)
    const name = request.params.name

    const indexItem = List[indexList].data.findIndex(item => item.name == name)

    if (indexItem == -1) {
        return response.status(404).json({ message: `List with item \"${name}\" does not exist` })
    }

    List[indexList].data.splice(indexItem, 1);

    return response.status(204).send()
}

const deleteList = (request: Request, response: Response): Response => {
    const indexList = parseInt(response.locals.list.indexList)

    List.splice(indexList, 1)

    return response.status(204).send()
}

const updateItem = (request: Request, response: Response): Response =>{
    const indexList = parseInt(response.locals.list.indexList)
    const name = request.params.name
    const newItem = request.body
 
    const indexItem = List[indexList].data.findIndex(item => item.name == name)

    if (indexItem == -1) {
        return response.status(404).json({ message: `List with item \"${name}\" does not exist` })
    }

    List[indexList].data[indexItem] = {
        ... List[indexList].data[indexItem],
        ...newItem

    }

    return response.status(200).json(List[indexList].data[indexItem])
}


export { createList, requestAllList, requestList, deleteItemList, deleteList, updateItem }