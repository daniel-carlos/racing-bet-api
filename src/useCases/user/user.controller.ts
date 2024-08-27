import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PatchUserDTO } from './dto/patch-user.dto';
import { UserService } from './dto/user.service';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @ApiParam({
    name: "id",
    description: "The ID of the user to get data from",
  })
  @Get(':id')
  async show(@Param('id', ParseIntPipe) id) {
    return this.userService.show(id);
  }

  @ApiParam({
    name: "id",
    description: "The ID of the user to update",
  })
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIntPipe) id, @Body() data: UpdateUserDTO) {
    return this.userService.update(id, data);
  }

  @ApiParam({
    name: "id",
    description: "The ID of the user to patch data",
  })
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async patch(@Param('id', ParseIntPipe) id, @Body() data: PatchUserDTO) {
    return this.userService.patch(id, data);
  }

  @ApiParam({
    name: "id",
    description: "The ID of the user to delete",
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.userService.delete(id);
  }
}
