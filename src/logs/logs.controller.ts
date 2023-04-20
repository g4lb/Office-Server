import { Controller, Get, Param, Post } from '@nestjs/common';
import { Logs } from './logs.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LogsService } from './logs.service';
import { LogsValidations } from './validations/logs.validations';
import { EmployeeIdRequest } from './request/employee-id.requset';
import { JoiValidationPipe } from 'src/core/validation/joi-validation.pipe';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @ApiOperation({ summary: 'Log arrival time' }) 
  @Post(':employeeId/arrival')
  async logArrival(@Param(new JoiValidationPipe(LogsValidations.employeeIdValidator())) employeeIdRequest: EmployeeIdRequest): Promise<string> {
    return this.logsService.logArrival(employeeIdRequest.employeeId);
  }

  @ApiOperation({ summary: 'Log departure time' })
  @Post(':employeeId/departure')
  async logDeparture(@Param(new JoiValidationPipe(LogsValidations.employeeIdValidator())) employeeIdRequest: EmployeeIdRequest): Promise<string> {
    return this.logsService.logArrival(employeeIdRequest.employeeId);
  }

  @ApiOperation({ summary: 'Get all logs for employee' })
  @Get(':employeeId/logs')
  async getLogs(@Param(new JoiValidationPipe(LogsValidations.employeeIdValidator())) employeeIdRequest: EmployeeIdRequest): Promise<Logs[]> {
    return this.logsService.getLogs(employeeIdRequest.employeeId);
  }

  @ApiOperation({ summary: 'Get all exposed employees' })
  @Get(':employeeId/positive-diagnosis')
  async notifyExposedEmployees(@Param(new JoiValidationPipe(LogsValidations.employeeIdValidator())) employeeIdRequest: EmployeeIdRequest) {
    const exposedEmployees = await this.logsService.getExposedEmployees(employeeIdRequest.employeeId);
    console.log(`Exposed employees: ${exposedEmployees}`);
    return { message: 'Exposure notifications sent successfully.' };
  }
}
