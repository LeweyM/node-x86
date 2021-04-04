import { Emulator } from '../domains/emulator/emulator';
import { AddInstruction } from '../domains/emulator/instruction/addInstruction';
import { MoveInstruction } from '../domains/emulator/instruction/moveInstruction';
import { Instruction } from '../domains/emulator/instruction/instruction';
import { Given, TableDefinition, Then, When } from 'cucumber';
import expect from 'expect';

Given('register {word} is set to {int}', async function (reg: string, val: number) {
  this.emulator.setRegister(reg, val);
});

Given('an Emulator with no instructions', async function () {
  this.emulator = new Emulator([]);
});

Given('an emulator with the following instructions', async function (table: TableDefinition) {
  const instructionSet: Instruction[] = [];

  table.rows().forEach((row) => {
    let instruction: Instruction;
    if (row[0] == 'mov') {
      instruction = new MoveInstruction(row[1], row[2]);
    } else if (row[0] == 'add') {
      instruction = new AddInstruction(row[1], row[2]);
    } else {
      throw new Error();
    }
    instructionSet.push(instruction);
  });

  this.emulator = new Emulator(instructionSet);
});

When('emulator steps once', async function () {
  this.emulator.step();
});

When('emulator steps {int} times', async function (t: number) {
  for (let i = 0; i < t; i++) {
    this.emulator.step();
  }
});

Given('an emulator with add {word} {word} instruction', async function (r1, r2: string) {
  this.emulator = new Emulator([new AddInstruction(r1, r2)]);
});

Given('an emulator with move {word} {word} instruction', async function (r1, r2: string) {
  this.emulator = new Emulator([new MoveInstruction(r1, r2)]);
});

Then('register {word} should have value {int}', async function (reg: string, val: number) {
  expect(this.emulator.registers[reg]).toBe(val);
});

Then('all registers should have a value of {int}', async function (val: number) {
  Object.keys(this.emulator.registers).forEach((reg) => {
    expect(this.emulator.registers[reg]).toBe(val);
  });
});
