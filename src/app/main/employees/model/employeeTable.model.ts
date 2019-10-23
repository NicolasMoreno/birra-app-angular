export class EmployeeTableModel {
  static from(json: any): EmployeeTableModel {
    return new EmployeeTableModel(
      json.firstName,
      json.lastName,
      json.user.username,
      json.profile.name,
    );
  }

  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly username: string,
    public readonly profile: string
  ) {
  }
}
