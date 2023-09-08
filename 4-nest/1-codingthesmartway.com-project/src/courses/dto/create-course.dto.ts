import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly author: string;

  @IsNotEmpty()
  readonly url: string;
}
