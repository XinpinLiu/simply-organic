export class User {
  constructor(
    private username: string,
    email: string,
    userId: string,
    private _token: string,
    private _expirationDate: Date
  ) {}

  get userName() {
    return this.username;
  }

  get token() {
    if (!this._expirationDate || new Date() > this._expirationDate) {
      return -1;
    }
    return this._token;
  }
}
