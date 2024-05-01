export class Item {
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(
    productId: string,
    name: string,
    price: number,
    quantity: number,
  ) {
    this._productId = productId;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  get productId(): string {
    return this._productId;
  }
  get name(): string {
    return this._name;
  }
  get price(): number {
    return this._price;
  }
  get quantity(): number {
    return this._quantity;
  }
}
