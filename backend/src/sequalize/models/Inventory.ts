import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../config/sequalize";

interface InventoryAttributes {
  id: number;
  name: string;
  location: string;
  price: number;
}

interface InventoryCreationAttributes
  extends Optional<InventoryAttributes, "id"> {}

class Inventory
  extends Model<InventoryAttributes, InventoryCreationAttributes>
  implements InventoryAttributes
{
  public id!: number;
  public name!: string;
  public location!: string;
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Inventory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Inventory",
  }
);

export default Inventory;
