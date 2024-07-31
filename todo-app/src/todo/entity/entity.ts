import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: false })
  username: string;

  @Column({ type: "date", nullable: false })
  dueDate: Date;
}
