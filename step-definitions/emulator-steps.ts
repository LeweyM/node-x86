import { Emulator } from '../domains/emulator/emulator';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { MoveInstruction } from '../domains/emulator/instruction/moveInstruction';
import { ImmediateSource, RegisterAccessor } from '../domains/emulator/memoryAccessors';
import { AddInstruction } from '../domains/emulator/instruction/addInstruction';
import { SubInstruction } from '../domains/emulator/instruction/subInstruction';
import { JumpInstruction } from '../domains/emulator/instruction/jumpInstruction';
import { RegisterId } from '../domains/emulator/registers/registerConfig';
import { CallInstruction } from '../domains/emulator/instruction/callInstruction';
import { ReturnInstruction } from '../domains/emulator/instruction/returnInstruction';
import { JumpIfLessInstruction } from '../domains/emulator/instruction/jumpIfLessInstruction';
import { CompareInstruction } from '../domains/emulator/instruction/compareInstruction';
import { Given, TableDefinition, Then, When } from 'cucumber';
import expect from 'expect';

Given('register {word} is set to {int}', async function (reg: string, val: number) {
  this.emulator.setRegister(reg as RegisterId, BigInt(val));
});
Given('register {word} is set to hex: {word}', async function (reg: string, hexValue: string) {
  const value = BigInt('0x' + hexValue);
  this.emulator.setRegister(reg, value);
});

Given('memory {int} is set to {int}', async function (memAddress, val: number) {
  this.emulator.setMemory(memAddress, BigInt(val));
});

Given('an Emulator with no instructions', async function () {
  this.emulator = new Emulator(new InstructionSet());
});

Given('an emulator with the following instructions', async function (table: TableDefinition) {
  const instructionSet: InstructionSet = new InstructionSet();
  this.emulator = new Emulator(instructionSet);

  table.rows().forEach((row) => {
    switch (row[0]) {
      case 'label':
        return instructionSet.addLabel(row[2]);
      case 'jmp':
        return instructionSet.addInstruction(new JumpInstruction(this.emulator, row[2]));
      case 'cmpl':
        return instructionSet.addInstruction(
          new CompareInstruction(this.emulator, getSource(row), getTarget(row)),
        );
      case 'jl':
        return instructionSet.addInstruction(new JumpIfLessInstruction(this.emulator, row[2]));
      case 'mov':
        return instructionSet.addInstruction(
          new MoveInstruction(this.emulator, getSource(row), getTarget(row)),
        );
      case 'add':
        return instructionSet.addInstruction(
          new AddInstruction(this.emulator, getSource(row), getTarget(row)),
        );
      case 'sub':
        return instructionSet.addInstruction(
          new SubInstruction(this.emulator, getSource(row), getTarget(row)),
        );
      case 'call':
        return instructionSet.addInstruction(new CallInstruction(this.emulator, row[2]));
      case 'return':
        return instructionSet.addInstruction(new ReturnInstruction(this.emulator));
      default:
        throw new Error('unknown symbol');
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
  expect(this.emulator.memory[memAddress]).toEqual(BigInt(value));
});

Then('register {word} should have value {int}', async function (reg: string, val: number) {
  expect(this.emulator.registers.read(reg)).toEqual(BigInt(val));
});
Then(
  'register {word} should have value hex: {word}',
  async function (reg: string, hexValue: string) {
    const expected = BigInt('0x' + hexValue);
    const value = BigInt.asUintN(64, this.emulator.registers.read(reg));
    expect(value.toString(16)).toBe(expected.toString(16));
  },
);

Then('all registers should have a value of {int}', async function (val: bigint) {
  Object.keys(this.emulator.registers).forEach((reg) => {
    expect(this.emulator.registers.read(reg)).toBe(BigInt(val));
  });
});

function getSource(row: string[]) {
  switch (row[1]) {
    case 'constToReg':
      return new ImmediateSource(BigInt(row[2]));
    case 'regToReg':
      return new RegisterAccessor(row[2] as RegisterId);
    case 'constToPtr':
      return new ImmediateSource(BigInt(row[2]));
    default:
      throw new Error();
  }
}

function getTarget(row: string[]) {
  switch (row[1]) {
    case 'constToReg':
      return new RegisterAccessor(row[3] as RegisterId);
    case 'regToReg':
      return new RegisterAccessor(row[3] as RegisterId);
    case 'constToPtr':
      return new RegisterAccessor(row[3] as RegisterId, true, 0);
    default:
      throw new Error();
  }
}
