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
import { EventGetAll } from '../../application/use-cases/EventGetAll';
import { EventGetOneById } from '../../application/use-cases/EventGetOneById';
import { EventCreate } from '../../application/use-cases/EventCreate';
import { EventEdit } from '../../application/use-cases/EventEdit';
import { EventDelete } from '../../application/use-cases/EventDelete';
import { EventNotFoundError } from '../../domain/errors/EventNotFoundError';
import {
  FindOneParams,
  SaveEventDto,
} from '../../application/dtos/Validations';

@Controller('events')
export class EventController {
  constructor(
    @Inject('eventGetAll')
    private readonly eventGetAll: EventGetAll,
    @Inject('eventGetOneById')
    private readonly eventGetOneById: EventGetOneById,
    @Inject('eventCreate')
    private readonly eventCreate: EventCreate,
    @Inject('eventEdit')
    private readonly eventEdit: EventEdit,
    @Inject('eventDelete')
    private readonly eventDelete: EventDelete,
  ) {}

  @Get()
  async getAllEvents() {
    try {
      return (await this.eventGetAll.run()).map((event) =>
        event.toPlaneObject(),
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/get-event')
  async getEventById(@Body() query: FindOneParams) {
    try {
      return (await this.eventGetOneById.run(query.id)).toPlaneObject();
    } catch (error) {
      if (error instanceof EventNotFoundError) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Post('/create-event')
  async createEvent(@Body() body: SaveEventDto) {
    try {
      return await this.eventCreate.run(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/edit-event')
  async editEvent(@Body() query: FindOneParams, @Body() body: SaveEventDto) {
    try {
      return await this.eventEdit.run(query.id, body);
    } catch (error) {
      if (error instanceof EventNotFoundError) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Delete('/delete-event')
  async deleteEvent(@Body() query: FindOneParams) {
    try {
      return await this.eventDelete.run(query.id);
    } catch (error) {
      if (error instanceof EventNotFoundError) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }
}
