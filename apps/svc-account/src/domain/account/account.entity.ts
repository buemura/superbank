import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  account: string;

  @Column({ type: 'varchar' })
  agency: string;

  @Column({ type: 'varchar' })
  bank: string;

  @Column({
    type: 'enum',
    enum: ['corrente', 'poupanca', 'salario'],
    default: 'corrente',
  })
  type: 'corrente' | 'poupanca' | 'salario';

  @Column({ type: 'varchar' })
  userName: string;

  @Column({ type: 'varchar' })
  userLastName: string;

  @Column({ type: 'varchar', nullable: true })
  userNickname: string;

  @Column({ type: 'varchar', unique: true })
  cpf: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'numeric', default: 0 })
  balance: number;

  @Column({
    type: 'enum',
    enum: ['active', 'blocked', 'closed'],
    default: 'active',
  })
  status: 'active' | 'blocked' | 'closed';

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
