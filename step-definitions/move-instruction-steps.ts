import { Emulator } from '../domains/emulator/emulator';
import { MoveInstruction } from '../domains/emulator/instruction/moveInstruction';
import { Given } from 'cucumber';

Given(
  'an emulator with move const {int} to register {word} instruction',
  async function (constant: number, reg: string) {
    this.emulator = new Emulator([MoveInstruction.ConstToRegister(constant, reg)]);
  },
);

Given('an emulator with move {word} to {word} instruction', async function (r1, r2: string) {
  this.emulator = new Emulator([MoveInstruction.RegisterToRegister(r1, r2)]);
});

Given(
  'an emulator with move const {int} to ptr {word} instruction',
  async function (r1: number, r2: string) {
    this.emulator = new Emulator([MoveInstruction.ConstToPtr(r1, r2)]);
  },
);
