import { Emulator } from '../emulator';

export interface Source {
  value(e: Emulator): number;
}

export class ImmediateSource implements Source {
  val: number;
  constructor(value: number) {
    this.val = value;
  }
  value(_e: Emulator): number {
    return this.val;
  }
}

export class RegisterSource implements Source {
  register: string;
  constructor(register: string) {
    this.register = register;
  }
  value(e: Emulator): number {
    return e.registers[this.register];
  }
}
export interface Target {
  write(e: Emulator, value: number): void;
}
export class RegisterTarget implements Target {
  register: string;
  offset: number;
  isPointer: boolean;

  constructor(register: string, isPointer = false, offset = 0) {
    this.register = register;
    this.offset = offset;
    this.isPointer = isPointer;
  }
  write(e: Emulator, value: number): void {
    if (this.isPointer) {
      const valueAtRegister = e.registers[this.register];
      e.memory[valueAtRegister + this.offset] = value;
    } else {
      e.registers[this.register] = value;
    }
  }
}
