import {
  Column,
  DataType,
  Table,
  ForeignKey,
  Model,
  BeforeCreate,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Pertanyaan } from "./pertanyaan.model";
import { Option } from "./option.model";
import { Kuisioner } from "./kuisioner.model";


// perlu perbaikan disini
@Table({
  tableName: "section",
  timestamps: true,
  freezeTableName: true,
  modelName: "section",
})
export class Section extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column(DataType.STRING)
  @ForeignKey(() => Kuisioner)
  kuisionerId!: string;

  @Column(DataType.STRING)
  @ForeignKey(() => Pertanyaan)
  pertanyaanId!: string;

  @Column(DataType.STRING)
  @ForeignKey(() => Option)
  optionId!: string;

  @Column(DataType.STRING)
  section!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt!: Date;

  @BeforeCreate
  static async generateId(instance: Section): Promise<void> {
    instance.id = uuidv4().replace(/-/g, '');
  }
}
