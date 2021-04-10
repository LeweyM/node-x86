import { Emulator } from './emulator';
import { RegisterId } from './registers/registerConfig';

export interface MemReader {
  read(e: Emulator): bigint;
}

export interface MemWriter {
  write(e: Emulator, val: bigint): void;
  address(e: Emulator): bigint; //todo: should be in reader interface
}

export class ImmediateSource implements MemReader {
  val: bigint;
  constructor(value: bigint) {
    this.val = value;
  }
  read(_e: Emulator): bigint {
    return this.val;
  }
}

type allowedScaleValue = 1 | 2 | 4 | 8;

export class RegisterAccessor implements MemReader, MemWriter {
  baseRegister: RegisterId;
  offset: number;
  isPointer: boolean;
  scale: allowedScaleValue;
  indexRegister: RegisterId | '';
  constructor(
    register: RegisterId,
    isPointer = false,
    offset = 0,
    scale: allowedScaleValue = 1,
    indexRegiser: RegisterId | '' = '',
  ) {
    this.baseRegister = register;
    this.indexRegister = indexRegiser;
    this.offset = offset;
    this.isPointer = isPointer;
    this.scale = scale;
  }
  write(e: Emulator, value: bigint): void {
    if (this.isPointer) {
      e.memory[Number(this.getAddress(e))] = value;
    } else {
      e.registers.write(this.baseRegister, value);
    }
  }

  address(e: Emulator): bigint {
    return this.getAddress(e);
  }

  read(e: Emulator): bigint {
    if (this.isPointer) {
      return e.memory[Number(this.getAddress(e))];
    } else {
      return e.registers.read(this.baseRegister);
    }
  }

  private getAddress(e: Emulator) {
    const valueAtBaseRegister = e.registers.read(this.baseRegister);
    const valueAtIndexRegister =
      this.indexRegister == '' ? BigInt(0) : e.registers.read(this.indexRegister);
    return valueAtBaseRegister + valueAtIndexRegister * BigInt(this.scale) + BigInt(this.offset);
  }
}
