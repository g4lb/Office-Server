import { Test, TestingModule } from '@nestjs/testing';
import { LogsService } from 'src/logs/logs.service';
import { Logs } from 'src/logs/logs.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let logsService: LogsService;
  let logsRepository: Repository<Logs>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogsService,
        {
          provide: getRepositoryToken(Logs),
          useClass: Repository,
        },
      ],
    }).compile();

    logsService = module.get<LogsService>(LogsService);
    logsRepository = module.get<Repository<Logs>>(getRepositoryToken(Logs));
  });

  describe('logArrival', () => {
    it('should create a new log', async () => {
      const log = new Logs();
      log.employeeId = 'employee1';
      log.arrival = new Date('2023-04-20T09:00:00');
      jest.spyOn(logsRepository, 'save').mockResolvedValueOnce(log);
      const result = await logsService.logArrival(log.employeeId);
      expect(result).toEqual(log);
    });
  });

  it('should throw an error if the log does not exist', async () => {
    const log = new Logs();
    log.employeeId = 'employee1';
    log.departure = new Date('2023-04-20T18:00:00');
    jest.spyOn(logsRepository, 'findOne').mockResolvedValueOnce(undefined);
    await expect(logsService.getLogs(log.employeeId)).rejects.toThrowError(
      `Employee ${log.employeeId} has not logged arrival`,
    );
  });

  it('should throw an error if the log has already been updated', async () => {
    const log = new Logs();
    log.id = 1;
    log.employeeId = 'employee1';
    log.arrival = new Date('2023-04-20T09:00:00');
    log.departure = new Date('2023-04-20T18:00:00');
    jest.spyOn(logsRepository, 'findOne').mockResolvedValueOnce(log);
    await expect(logsService.getLogs(log.employeeId)).rejects.toThrowError(
      `Employee ${log.employeeId} has already logged departure`,
    );
  });
});
