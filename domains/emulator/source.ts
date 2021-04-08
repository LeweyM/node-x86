import { Emulator } from './emulator';

export interface MemReader {
  read(e: Emulator): number;
}

export interface MemWriter {
  write(e: Emulator, val: number): void;
}

export class ImmediateSource implements MemReader {
  val: number;
  constructor(value: number) {
    this.val = value;
  }
  read(_e: Emulator): number {
    return this.val;
  }
}

export class RegisterSource implements MemReader {
  register: string;
  constructor(register: string) {
    this.register = register;
  }
  read(e: Emulator): number {
    return e.registers[this.register];
  }
}

export class RegisterTarget implements MemReader, MemWriter {
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

  read(e: Emulator): number {
    if (this.isPointer) {
      const valueAtRegister = e.registers[this.register];
      return e.memory[valueAtRegister + this.offset];
    } else {
      return e.registers[this.register];
    }
  }
}
