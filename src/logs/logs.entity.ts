import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  arrival: Date;

  @Column({ type: 'timestamp', nullable: true })
  departure: Date;
}
