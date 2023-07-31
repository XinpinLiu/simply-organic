export class User {
  constructor(
    private username: string,
    email: string,
    private _token: string,
    private _expirationDate: Date,
    private role?: number
  ) {}

  get userName() {
    return this.username;
  }

  get getRole() {
    return this.role;
  }

  get token() {
    if (!this._expirationDate || new Date() > this._expirationDate) {
      return -1;
    }
    return this._token;
  }
}
