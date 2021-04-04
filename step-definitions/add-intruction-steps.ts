import { Emulator } from '../domains/emulator/emulator';
import { InstructionFactory } from '../domains/emulator/instruction/instructionFactory';
import { InstructionType } from '../domains/emulator/instruction/instruction';
import { Given } from 'cucumber';

Given(
  'an emulator with add register {word} to register {word} instruction',
  async function (r1, r2: string) {
    const instruction = InstructionFactory.buildRegisterToRegister(InstructionType.ADD, r1, r2);
    this.emulator = new Emulator([instruction]);
  },
);

Given(
  'an emulator with add const {int} to register {word} instruction',
  async function (c: number, r: string) {
    const instruction = InstructionFactory.buildConstToRegister(InstructionType.ADD, c, r);
    this.emulator = new Emulator([instruction]);
  },
);

Given(
  'an emulator with add const {int} to ptr {word} instruction',
  async function (c: number, reg: string) {
    const instruction = InstructionFactory.buildConstToPointer(InstructionType.ADD, c, reg);
    this.emulator = new Emulator([instruction]);
  },
);
