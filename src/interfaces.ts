interface ItemLIst {
  name: string,
  quantity: string
}

interface IList {
  id: number,
  listName: string,
  data: Array<ItemLIst>,
  added_in: Date
}



type IListRequest = Omit<IList, "id" | "added_in">

export {ItemLIst ,IList, IListRequest };