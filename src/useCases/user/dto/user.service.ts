import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './create-user.dto';
import { UpdateUserDTO } from './update-user.dto';
import { PatchUserDTO } from './patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDTO) {
    console.log(
      `Criar usuário ${data.username} com nome ${data.name} e email ${data.email}`,
    );
    return this.prisma.user.create({
      data,
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async update(id: number, data: UpdateUserDTO) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async patch(id: number, data: PatchUserDTO) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
