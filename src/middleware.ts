import { Request, Response, NextFunction } from "express"
import { List } from "./database";
import { ItemLIst } from "./interfaces";

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

const validateItemMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    const camposObrigatorios = ['name', 'quantity'];
    const camposEntrada = Object.keys(request.body);

    const camposExtras = camposEntrada.filter(campo => !camposObrigatorios.includes(campo));

    if (camposExtras.length > 0) {
        let camposObrigatoriasString = camposObrigatorios.join(', ');
        return response.status(400).json({ message: `Requierd keys are : ${camposObrigatoriasString}` })
    }

    return next()
}

const validateDataMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    const camposObrigatorios = ['name', 'quantity'];
    const data = request.body.data;

    const camposFaltantes = data.reduce((faltando: string[], item: ItemLIst) => {
        const camposExtras = Object.keys(item).filter(campo => !camposObrigatorios.includes(campo));
        return [...faltando, ...camposExtras];
    }, []);

    if (camposFaltantes.length > 0) {
        const camposObrigatoriaString = camposObrigatorios.join(', ');
        return response.status(400).json({ message: `Requierd keys are: ${camposObrigatoriaString}` });
    }

    return next();
}


const validateListMiddleware = (request: Request, response: Response, next: NextFunction): Response | void => {
    const camposObrigatorios = ['listName', 'data'];
    const camposEntrada = Object.keys(request.body);

    const camposExtras = camposEntrada.filter(campo => !camposObrigatorios.includes(campo));

    if (camposExtras.length > 0) {
        let camposObrigatoriasString = camposObrigatorios.join(', ');
        return response.status(400).json({ message: `Requierd keys are : ${camposObrigatoriasString}` })
    }

    return next()
}

export { checkIdList, validateDataMiddleware, validateListMiddleware, validateItemMiddleware }