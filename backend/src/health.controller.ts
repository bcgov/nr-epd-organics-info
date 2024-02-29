import { Controller, Get } from '@nestjs/common'
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus'

@Controller("health")
export class HealthController {

  @Get()
  @HealthCheck()
  check() {
    return "ok";
  }
}
