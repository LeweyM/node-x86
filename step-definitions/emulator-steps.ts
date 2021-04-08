import { Emulator } from '../domains/emulator/emulator';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { MoveInstruction } from '../domains/emulator/instruction/moveInstruction';
import { ImmediateSource, RegisterSource, RegisterTarget } from '../domains/emulator/source';
import { AddInstruction } from '../domains/emulator/instruction/addInstruction';
import { SubInstruction } from '../domains/emulator/instruction/subInstruction';
import { JumpInstruction } from '../domains/emulator/instruction/jumpInstruction';
import { Given, TableDefinition, Then, When } from 'cucumber';
import expect from 'expect';

Given('register {word} is set to {int}', async function (reg: string, val: number) {
  this.emulator.setRegister(reg, val);
});

Given('memory {int} is set to {int}', async function (memAddress, val: number) {
  this.emulator.setMemory(memAddress, val);
});

Given('an Emulator with no instructions', async function () {
  this.emulator = new Emulator(new InstructionSet());
});

Given('an emulator with the following instructions', async function (table: TableDefinition) {
  const instructionSet: InstructionSet = new InstructionSet();
  this.emulator = new Emulator(instructionSet);

  table.rows().forEach((row) => {
    if (row[0] == 'label') {
      instructionSet.addLabel(row[2]);
      return;
    }

    if (row[0] == 'jmp') {
      instructionSet.addInstruction(new JumpInstruction(this.emulator, row[2]));
      return;
    }

    if (row[0] == 'mov') {
      instructionSet.addInstruction(
        new MoveInstruction(this.emulator, getSource(row), getTarget(row)),
      );
      return;
    }

    if (row[0] == 'add') {
      instructionSet.addInstruction(
        new AddInstruction(this.emulator, getSource(row), getTarget(row)),
      );
      return;
    }

    if (row[0] == 'sub') {
      instructionSet.addInstruction(
        new SubInstruction(this.emulator, getSource(row), getTarget(row)),
      );
      return;
    }
  });
});

When('emulator steps once', async function () {
  this.emulator.step();
});

When('emulator steps {int} times', async function (t: number) {
  for (let i = 0; i < t; i++) {
    this.emulator.step();
  }
});

When('emulator has run', async function () {
  this.emulator.run();
});

Then('memory address {int} should have value {int}', async function (memAddress, value: number) {
  expect(this.emulator.memory[memAddress]).toBe(value);
});

Then('register {word} should have value {int}', async function (reg: string, val: number) {
  expect(this.emulator.registers[reg]).toBe(val);
});

Then('all registers should have a value of {int}', async function (val: number) {
  Object.keys(this.emulator.registers).forEach((reg) => {
    expect(this.emulator.registers[reg]).toBe(val);
  });
});

function getSource(row: string[]) {
  switch (row[1]) {
    case 'constToReg':
      return new ImmediateSource(parseInt(row[2], 10));
    case 'regToReg':
      return new RegisterSource(row[2]);
    case 'constToPtr':
      return new ImmediateSource(parseInt(row[2], 10));
    default:
      throw new Error();
  }
}

function getTarget(row: string[]) {
  switch (row[1]) {
    case 'constToReg':
      return new RegisterTarget(row[3]);
    case 'regToReg':
      return new RegisterTarget(row[3]);
    case 'constToPtr':
      return new RegisterTarget(row[3], true, 0);
    default:
      throw new Error();
  }
}
