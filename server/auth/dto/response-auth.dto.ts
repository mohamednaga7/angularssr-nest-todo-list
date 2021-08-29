import { ResponseUserDto } from "./response-user.dto";

export interface ResponseAuthDto {
    user: ResponseUserDto;
    jwt: string
}