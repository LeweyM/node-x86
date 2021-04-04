import { Emulator } from '../domains/emulator/emulator';
import { InstructionFactory } from '../domains/emulator/instruction/instructionFactory';
import { InstructionType } from '../domains/emulator/instruction/instruction';
import { Given } from 'cucumber';

Given(
  'an emulator with move const {int} to register {word} instruction',
  async function (constant: number, reg: string) {
    const instruction = InstructionFactory.buildConstToRegister(
      InstructionType.MOVE,
      constant,
      reg,
    );
    this.emulator = new Emulator([instruction]);
  },
);

Given('an emulator with move {word} to {word} instruction', async function (r1, r2: string) {
  const instruction = InstructionFactory.buildRegisterToRegister(InstructionType.MOVE, r1, r2);
  this.emulator = new Emulator([instruction]);
});

Given(
  'an emulator with move const {int} to ptr {word} instruction',
  async function (constant: number, ptr: string) {
    const instruction = InstructionFactory.buildConstToPointer(InstructionType.MOVE, constant, ptr);
    this.emulator = new Emulator([instruction]);
  },
);
