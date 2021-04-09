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

type allowedScaleValue = 1 | 2 | 4 | 8;

export class RegisterAccessor implements MemReader, MemWriter {
  baseRegister: string;
  offset: number;
  isPointer: boolean;
  scale: allowedScaleValue;
  indexRegister: string;
  constructor(
    register: string,
    isPointer = false,
    offset = 0,
    scale: allowedScaleValue = 1,
    indexRegiser = '',
  ) {
    this.baseRegister = register;
    this.indexRegister = indexRegiser;
    this.offset = offset;
    this.isPointer = isPointer;
    this.scale = scale;
  }
  write(e: Emulator, value: number): void {
    if (this.isPointer) {
      const valueAtBaseRegister = e.registers[this.baseRegister];
      const valueAtIndexRegister = e.registers[this.indexRegister] || 0;
      e.memory[valueAtBaseRegister + valueAtIndexRegister * this.scale + this.offset] = value;
    } else {
      e.registers[this.baseRegister] = value;
    }
  }

  read(e: Emulator): number {
    if (this.isPointer) {
      const valueAtBaseRegister = e.registers[this.baseRegister];
      const valueAtIndexRegister = e.registers[this.indexRegister] || 0;
      return e.memory[valueAtBaseRegister + valueAtIndexRegister * this.scale + this.offset];
    } else {
      return e.registers[this.baseRegister];
    }
  }
}
