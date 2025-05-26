import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { UserGetAll } from '../../application/use-cases/UserGetAll';
import { UserGetOneById } from '../../application/use-cases/UserGetOneById';
import { UserCreate } from '../../application/use-cases/UserCreate';
import { UserEdit } from '../../application/use-cases/UserEdit';
import { UserDelete } from '../../application/use-cases/UserDelete';
import { UserNotFoundError } from '../../domain/errors/UserNotFoundError';
import {
  FindOneParams,
  SaveUserDto,
  Query,
} from '../../application/dtos/Validations';

@Controller('users')
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
    try {
      return (await this.userGetAll.run()).map((user) => user.toPlaneObject());
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/get-user')
  async getUserById(@Body() query: FindOneParams) {
    try {
      return (await this.userGetOneById.run(query.id)).toPlaneObject();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Post('/create-user')
  async CreateUser(@Body() body: SaveUserDto) {
    try {
      return await this.userCreate.run(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/update-user')
  async editUser(@Body() query: Query) {
    try {
      return await this.userEdit.run(query.id, query.body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/delete-user')
  async deleteUser(@Body() query: FindOneParams) {
    try {
      return await this.userDelete.run(query.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
