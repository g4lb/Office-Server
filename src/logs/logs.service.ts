import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, MoreThan, Not, Repository } from 'typeorm';
import { Logs } from './logs.entity';

@Injectable()
export class LogsService {

  constructor(
    @InjectRepository(Logs)
    private readonly logsRepository: Repository<Logs>,
  ) {}

  async logArrival(employeeId: string): Promise<string> {
    const newLog = new Logs();
    newLog.employeeId = employeeId;
    newLog.arrival = new Date();
    await this.logsRepository.save(newLog);
    return `Employee ${employeeId} has logged arrival`;
  }

  async logDeparture(employeeId: string) {
    const lastLog = await this.logsRepository.findOne({ where: { employeeId }, order: { arrival: 'DESC' } });
    if (!lastLog) {
      throw new Error(`Employee ${employeeId} has not logged arrival`);
    }
    if (lastLog.departure) {
      throw new Error(`Employee ${employeeId} has already logged departure`);
    }
    lastLog.departure = new Date();
    await this.logsRepository.save(lastLog);
    return `Employee ${employeeId} has logged departure`;
  }

  async getLogs(employeeId: string) {
    const logs = await this.logsRepository.find({ where: { employeeId } });
    if (!logs.length) {
      throw new Error(`No logs found for employee ${employeeId}`);
    }
    return logs;
  }

  async getExposedEmployees(employeeId: string) {
    const exposureDate = new Date();
    exposureDate.setDate(exposureDate.getDate() - 7);

    const logs = await this.logsRepository.find({
      where: [
        {
          employeeId: Not(employeeId),
          arrival: MoreThan(exposureDate),
          departure: IsNull(), // if the employee is not departure yet
        },
        {
          employeeId: Not(employeeId),
          arrival: MoreThan(exposureDate),
          departure: Not(IsNull()),
        },
      ],
    });

  const exposedEmployees = logs.map((log) => log.employeeId);
  return exposedEmployees;
  }
}
