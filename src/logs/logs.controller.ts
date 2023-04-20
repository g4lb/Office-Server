import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Logs } from './logs.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LogsService } from './logs.service';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(
    private readonly logsService: LogsService,
  ) {}

  @ApiOperation({ summary: 'Log arrival time' }) 
  @Post(':employeeId/arrival')
  async logArrival(@Param('employeeId') employeeId: string): Promise<string> {
    return this.logsService.logArrival(employeeId);
  }

  @ApiOperation({ summary: 'Log departure time' })
  @Post(':employeeId/departure')
  async logDeparture(@Param('employeeId') employeeId: string): Promise<string> {
    return this.logsService.logArrival(employeeId);
  }

  @ApiOperation({ summary: 'Get all logs for employee' })
  @Get(':employeeId/logs')
  async getLogs(@Param('employeeId') employeeId: string): Promise<Logs[]> {
    return this.logsService.getLogs(employeeId);
  }

  @ApiOperation({ summary: 'Get all exposed employee' })
  @Post('positive-diagnosis')
  async notifyExposedEmployees(@Body() body: { employeeId: string }) {
    const exposedEmployees = await this.logsService.getExposedEmployees(body.employeeId);
    console.log(`Exposed employees: ${exposedEmployees}`);
    return { message: 'Exposure notifications sent successfully.' };
  }
}
