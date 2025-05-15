import { Controller, Get } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { UserGetAll } from '../application/UserGetAll/UserGetAll';
import { UserGetOneById } from '../application/UserGetOneById/UserGetOneById';
import { UserCreate } from '../application/UserCreate/UserCreate';
import { UserEdit } from '../application/UserEdit/UserEdit';
import { UserDelete } from '../application/UserDelete/UserDelete';
import { Param } from '@nestjs/common';
@Controller('user')
export class UserController {
  constructor(
    @Inject('userGetAll')
    private readonly userGetAll: UserGetAll,
    @Inject('userGetOneById')
    private readonly userGetOneById: UserGetOneById,
    @Inject('userCreate')
    private readonly userCreate: UserCreate,
    @Inject('userEdit')
    private readonly userEdit: UserEdit,
    @Inject('userDelete')
    private readonly userDelete: UserDelete,
  ) {}

  @Get()
  async getAllUsers() {
    return (await this.userGetAll.run()).map((user) => user.toPlaneObject());
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return (await this.userGetOneById.run(id)).toPlaneObject();
  }
}
