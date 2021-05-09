import { Emulator } from './emulator';
import { allRegisters, RegisterId } from './registers/registerConfig';

export interface MemReader {
  read(e: Emulator): bigint;
  size(): number;
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

  size(): number {
    return 64;
  }
}

type allowedScaleValue = 1 | 2 | 4 | 8;

export class RegisterAccessor implements MemReader, MemWriter {
  baseRegister: RegisterId | null;
  isPointer: boolean;
  offset: number;
  scale: allowedScaleValue;
  indexRegister: RegisterId | '';
  bytes;
  constructor(
    baseRegister: RegisterId | null = null,
    isPointer = false,
    offset = 0,
    scale: allowedScaleValue = 1,
    indexRegister: RegisterId | '' = '',
    bytes = 8,
  ) {
    this.baseRegister = baseRegister;
    this.isPointer = isPointer;
    this.offset = offset;
    this.scale = scale;
    this.indexRegister = indexRegister;
    this.bytes = bytes;
  }
  write(e: Emulator, value: bigint): void {
    if (this.isPointer) {
      e.writeBytesToMemory(this.bytes, Number(this.getAddress(e)), value);
    } else {
      if (!this.baseRegister) {
        throw new Error('no base register');
      }
      e.registers.write(this.baseRegister, value);
    }
  }

  size(): number {
    if (!this.baseRegister) {
      throw new Error('no base register');
    }
    return allRegisters[this.baseRegister].size;
  }

  address(e: Emulator): bigint {
    return this.getAddress(e);
  }

  read(e: Emulator): bigint {
    if (this.isPointer) {
      return e.readBytesFromMemory(this.bytes, this.getAddress(e));
    } else {
      if (!this.baseRegister) {
        throw new Error('no base register');
      }
      return e.registers.read(this.baseRegister);
    }
  }

  private getAddress(e: Emulator) {
    const valueAtIndexRegister =
      this.indexRegister == '' ? BigInt(0) : e.registers.read(this.indexRegister);

    let valueAtBaseRegister;
    if (this.baseRegister) {
      valueAtBaseRegister = e.registers.read(this.baseRegister);
    } else {
      valueAtBaseRegister = BigInt(0);
    }
    return valueAtBaseRegister + valueAtIndexRegister * BigInt(this.scale) + BigInt(this.offset);
  }
}
