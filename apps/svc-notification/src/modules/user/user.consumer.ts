import { Controller } from '@nestjs/common';

import { UserService } from './user.service';

@Controller()
export class UserConsumer {
  constructor(private readonly userService: UserService) {}
}
