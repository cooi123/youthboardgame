import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto, UserDto } from './dtos/user.dto';
import type { FindOptionsWhere } from 'typeorm';
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    ) { }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async createUser(
        userRegisterDto: UserRegisterDto,
    ) {
        const user = this.userRepository.create(userRegisterDto);
        await this.userRepository.save(user);
        return user;

    }

    findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
        return this.userRepository.
            findOneBy(findData);
    }


    async updateUserPoints(userId: number, points: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        user.points = points;
        await this.userRepository.save(user);
        return user;
    }

    getUserById(id: number) {
        return this.userRepository.findOne({ where: { id } });
    }

    async updateAllUsers(UserData: UserDto[]) {
        const userData = await this.userRepository.save(UserData);
        return userData
    }


}
