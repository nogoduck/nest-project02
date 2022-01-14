import { HttpException, Injectable, PipeTransform } from '@nestjs/common';

Injectable();

export class PositiveIntPipe implements PipeTransform {
  private isInteger = (value: number) => value % 1 === 0;
  transform(value: number): number {
    if (value < 0) {
      throw new HttpException('value > 0', 400);
    }

    if (!this.isInteger(value)) {
      throw new HttpException('value !== float', 400);
    }

    value = parseInt(String(value));
    return value;
  }
}
