import { Emulator } from '../domains/emulator/emulator';
import { AddInstruction } from '../domains/emulator/instruction/addInstruction';
import { Given } from 'cucumber';

Given(
  'an emulator with add register {word} to register {word} instruction',
  async function (r1, r2: string) {
    this.emulator = new Emulator([AddInstruction.RegisterToRegister(r1, r2)]);
  },
);

Given(
  'an emulator with add const {int} to register {word} instruction',
  async function (c: number, r: string) {
    this.emulator = new Emulator([AddInstruction.ConstToRegister(c, r)]);
  },
);

Given(
  'an emulator with add const {int} to ptr {word} instruction',
  async function (c: number, reg: string) {
    this.emulator = new Emulator([AddInstruction.ConstToPtr(c, reg)]);
  },
);
