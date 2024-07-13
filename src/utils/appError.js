export class appError extends Error {
  constructor(messsage, status) {
    super(messsage);
    this.status = status;
  }
}
