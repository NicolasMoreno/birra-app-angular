export class EmployeeTableModel {
  static from(json: any): EmployeeTableModel {
    return new EmployeeTableModel(
      json.id,
      json.user.name,
      json.user.lastName,
      json.user.username,
      json.profile.name,
    );
  }

  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly username: string,
    public readonly profile: string
  ) {
  }
}
