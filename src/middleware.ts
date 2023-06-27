import { Request, Response, NextFunction } from "express"
import { List } from "./database";
import { IListRequest, ItemLIst } from "./interfaces";

const checkIdList = (request: Request, response: Response, next: NextFunction): Response | void => {
    const id = parseInt(request.params.id)
    const indexList: number = List.findIndex(list => list.id == id)

    if (indexList == -1) {
        return response.status(404).json({ message: `List with id \"${id}\" does not exist` })
    }

    response.locals.list = {
        id: id,
        indexList: indexList
    }

    return next();

}


const validateDataMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    const camposObrigatorios = ['name', 'quantity']
    const camposEntrada = request.body.data

    //const teste = camposEntrada.filter(campos => !camposObrigatorios.includes(campos))

    console.log(camposEntrada)
    const camposExtras = camposEntrada.map((item:ItemLIst)=>{
        let campo = Object.keys(item)
    }) 

    if (camposExtras.length > 0) {
        const camposExtrasString = camposExtras.join(', ');
        return response.status(400).json({ message: `2Requierd keys are: ${camposExtrasString}` })
    }

    return next()
}

const validateListMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    const camposObrigatorios = ['listName', 'data'];
    const camposEntrada = Object.keys(request.body);

    //console.log(camposEntrada)
    const camposExtras = camposEntrada.filter(campo => !camposObrigatorios.includes(campo));

    if (camposExtras.length > 0) {
        const camposExtrasString = camposExtras.join(', ');
        return response.status(400).json({ message: `Requierd keys are: ${camposExtrasString}` })
    }

    return next()
}

export { checkIdList, validateDataMiddleware, validateListMiddleware }