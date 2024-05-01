import { Address } from './Address';
import { Item } from './Item';

export enum statusTypes {
  CREATED = 1,
  FINALIZED = 2,
}
export class Order {
  private _id: string;
  private _items: Item[];
  private _address: Address;
  private _status: statusTypes;

  constructor(
    id: string,
    items: Item[],
    address: Address,
    status: statusTypes,
  ) {
    this._id = id;
    this._items = items;
    this._address = address;
    this._status = status;
  }

  get id(): string {
    return this._id;
  }
  get items(): Item[] {
    return this._items;
  }
  get address(): Address {
    return this._address;
  }
  get status(): statusTypes {
    return this._status;
  }
  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
