import { allRegisters as AllRegisters, RegisterId } from './registerConfig';

export class Registers {
  registerData: bigint[];
  constructor() {
    this.registerData = Array(17).fill(BigInt(0));
  }

  read(registerName: RegisterId): bigint {
    const register = AllRegisters[registerName];
    const registerData = this.registerData[register.registerIndex];
    const bits = this.lowerOrderBits(register.size, registerData);
    return bits;
  }
  write(registerName: RegisterId, value: bigint): void {
    const register = AllRegisters[registerName];
    const originalValue = this.registerData[register.registerIndex];

    // 32 and 64 bit instructions zero out higher order bits
    if (register.size >= 32) {
      this.registerData[register.registerIndex] = value;
    } else {
      const overwrittenValue = this.overwriteHigherOrderBits(register.size, originalValue, value);
      this.registerData[register.registerIndex] = overwrittenValue;
    }
  }

  private lowerOrderBits(bytes: number, value: bigint) {
    // const mask = BigInt.asUintN(bytes, BigInt(0)) - BigInt(1);
    // const endBits = mask & value;
    return BigInt.asIntN(bytes, value);
  }
  private overwriteHigherOrderBits(bytes: number, newEnd: bigint, value: bigint) {
    const valueWithZeroedEnd = (newEnd >> BigInt(bytes)) << BigInt(bytes);
    const valueWithNewEnd = valueWithZeroedEnd ^ value;
    return valueWithNewEnd;
  }
}
