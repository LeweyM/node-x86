import { Emulator } from '../domains/emulator/emulator';
import {
  Instruction,
  ArithmeticInstructionType,
  InstructionType,
} from '../domains/emulator/instruction/instruction';
import { InstructionFactory } from '../domains/emulator/instruction/instructionFactory';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { MoveInstruction } from '../domains/emulator/instruction/moveInstruction';
import {
  ImmediateSource,
  RegisterSource,
  RegisterTarget,
} from '../domains/emulator/instruction/source';
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
  const instructionTypeByCode: Record<string, ArithmeticInstructionType> = {
    mov: ArithmeticInstructionType.MOVE,
    add: ArithmeticInstructionType.ADD,
    sub: ArithmeticInstructionType.SUB,
  };

  table.rows().forEach((row) => {
    let instruction: Instruction;

    if (row[0] == 'label') {
      instructionSet.addLabel(row[2]);
      return;
    }

    if (row[0] == 'jmp') {
      instructionSet.addInstruction(InstructionFactory.build(InstructionType.JUMP, row[2]));
      return;
    }

    if (row[0] == 'mov') {
      instructionSet.addInstruction(new MoveInstruction(getSource(row), getTarget(row)));
      return;
    }

    switch (row[1]) {
      case 'constToReg':
        instruction = InstructionFactory.buildConstToRegister(
          instructionTypeByCode[row[0]],
          parseInt(row[2], 10),
          row[3],
        );
        break;
      case 'regToReg':
        instruction = InstructionFactory.buildRegisterToRegister(
          instructionTypeByCode[row[0]],
          row[2],
          row[3],
        );
        break;
      case 'constToPtr':
        instruction = InstructionFactory.buildConstToPointer(
          instructionTypeByCode[row[0]],
          parseInt(row[2], 10),
          row[3],
        );
        break;
      default:
        throw new Error();
    }

    instructionSet.addInstruction(instruction);
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
