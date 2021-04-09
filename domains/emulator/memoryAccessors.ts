import { Emulator } from './emulator';

export interface MemReader {
  read(e: Emulator): number;
}

export interface MemWriter {
  write(e: Emulator, val: number): void;
  address(e: Emulator): number; //todo: should be in reader interface
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
      e.memory[this.getAddress(e)] = value;
    } else {
      e.registers[this.baseRegister] = value;
    }
  }

  address(e: Emulator): number {
    return this.getAddress(e);
  }

  read(e: Emulator): number {
    if (this.isPointer) {
      return e.memory[this.getAddress(e)];
    } else {
      return e.registers[this.baseRegister];
    }
  }

  private getAddress(e: Emulator) {
    const valueAtBaseRegister = e.registers[this.baseRegister];
    const valueAtIndexRegister = e.registers[this.indexRegister] || 0;
    return valueAtBaseRegister + valueAtIndexRegister * this.scale + this.offset;
  }
}
