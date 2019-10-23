export class SupplyTableModel {
  static from (json: any): SupplyTableModel {
    return new SupplyTableModel(
      json.id,
      json.material.name,
      json.material.unit.unitName,
      json.storedQuantity
    );
  }

  constructor(
    public readonly id: number,
    public readonly supplyType: string,
    public readonly unit: string,
    public readonly amount: number
  ) {}
}
