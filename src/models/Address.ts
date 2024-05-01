export class Address {
  private _zipcode: string;
  private _street: string;
  private _number: number;
  private _bairro: string;
  private _complement: string;

  constructor(
    zipcode: string,
    street: string,
    number: number,
    bairro: string,
    complement: string,
  ) {
    this._zipcode = zipcode;
    this._street = street;
    this._number = number;
    this._bairro = bairro;
    this._complement = complement;
  }

  get zipcode(): string {
    return this._zipcode;
  }
  get street(): string {
    return this._street;
  }
  get number(): number {
    return this._number;
  }
  get bairro(): string {
    return this._bairro;
  }
  get complement(): string {
    return this._complement;
  }
}
