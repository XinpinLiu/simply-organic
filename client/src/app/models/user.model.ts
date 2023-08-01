export class User {
  constructor(
    private username: string,
    private email: string,
    private roles: string,
    private accessToken: string,
    private refreshToken: string
  ) {}

  get userName() {
    return this.username;
  }

  get getRole() {
    return this.roles;
  }
}
