import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dtos/user-login.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async validateUser({ name, password }: UserLoginDto): Promise<any> {
        const user = await this.userService.findOne({ name });

        // Throw UnauthorizedException instead of BadRequestException for invalid credentials
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        } else {
            throw new UnauthorizedException('Invalid email or password');
        }
    }


}
