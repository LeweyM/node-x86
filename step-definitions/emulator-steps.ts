import { Emulator } from '../domains/emulator/emulator';
import { AddInstruction } from '../domains/emulator/instruction/addInstruction';
import { MoveInstruction } from '../domains/emulator/instruction/moveInstruction';
import { Instruction } from '../domains/emulator/instruction/instruction';
import { Given, TableDefinition, Then, When } from 'cucumber';
import expect from 'expect';

Given('register {word} is set to {int}', async function (reg: string, val: number) {
  this.emulator.setRegister(reg, val);
});

Given('memory {int} is set to {int}', async function (memAddress, val: number) {
  this.emulator.setMemory(memAddress, val);
});

Given('an Emulator with no instructions', async function () {
  this.emulator = new Emulator([]);
});

Given('an emulator with the following instructions', async function (table: TableDefinition) {
  const instructionSet: Instruction[] = [];

  table.rows().forEach((row) => {
    let instruction: Instruction;
    if (row[0] == 'mov') {
      switch (row[1]) {
        case 'constToReg':
          instruction = MoveInstruction.ConstToRegister(parseInt(row[2], 10), row[3]);
          break;
        case 'regToReg':
          instruction = MoveInstruction.RegisterToRegister(row[2], row[3]);
          break;
        default:
          throw new Error();
      }
    } else if (row[0] == 'add') {
      switch (row[1]) {
        case 'constToReg':
          instruction = AddInstruction.ConstToRegister(parseInt(row[2], 10), row[3]);
          break;
        case 'regToReg':
          instruction = AddInstruction.RegisterToRegister(row[2], row[3]);
          break;
        default:
          throw new Error();
      }
    }
    // else if (row[0] == 'sub') {
    //   switch (row[1]) {
    //     case 'constToReg':
    //       instruction = SubInstruction.ConstToRegister(parseInt(row[2], 10), row[3]);
    //       break;
    //     case 'regToReg':
    //       instruction = SubInstruction.RegisterToRegister(row[2], row[3]);
    //       break;
    //     default:
    //       throw new Error();
    //   }
    // }
    else {
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
