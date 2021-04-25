import { AddInstruction } from '../../../../domains/emulator/instruction/addInstruction';
import { CallInstruction } from '../../../../domains/emulator/instruction/callInstruction';
import { Instruction } from '../../../../domains/emulator/instruction/instruction';
import { MoveInstruction } from '../../../../domains/emulator/instruction/moveInstruction';
import { PopInstruction } from '../../../../domains/emulator/instruction/popInstruction';
import { PushInstruction } from '../../../../domains/emulator/instruction/pushInstruction';
import { ReturnInstruction } from '../../../../domains/emulator/instruction/returnInstruction';
import {
  ImmediateSource,
  MemReader,
  MemWriter,
  RegisterAccessor,
} from '../../../../domains/emulator/memoryAccessors';
import { Parser } from '../../../../domains/emulator/parser/parser';
import { QuadRegister, RegisterId } from '../../../../domains/emulator/registers/registerConfig';

describe('parser', () => {
  it('can parse move instructions', () => {
    const instruction = getInstruction('movq $1, rax');
    checkMoveInstruction(instruction);
  });

  it('can parse add instructions', () => {
    const instruction = getInstruction('addq $2, rbx');
    checkAddInstruction(instruction);
  });

  it('can parse push instructions', () => {
    const instruction = getInstruction('pushq rax');
    checkPushInstruction(instruction);
  });

  it('can parse pop instructions', () => {
    const instruction = getInstruction('popq rbx');
    checkPopInstruction(instruction);
  });

  it('can parse multiple instructions', () => {
    const input = `movq $1, rax
    addq $2, rbx
    pushq rax
    popq rbx`;
    const e = new Parser().toEmulator(input);
    const instructions = e.instructionSet;
    checkMoveInstruction(instructions.getInstruction(0));
    checkAddInstruction(instructions.getInstruction(8));
    checkPushInstruction(instructions.getInstruction(16));
    checkPopInstruction(instructions.getInstruction(24));
  });

  it('can parse call instructions', () => {
    const instruction = getInstruction('call foo');
    expect(instruction).toBeInstanceOf(CallInstruction);
    const callInstruction = instruction as CallInstruction;
    expect(callInstruction.label).toBe('foo');
  });

  it('can parse return instructions', () => {
    const instruction = getInstruction('ret');
    expect(instruction).toBeInstanceOf(ReturnInstruction);
  });

  it('can parse labels', () => {
    const e = new Parser().toEmulator('\nret\nfoo:');
    const instructions = e.instructionSet;
    const i = instructions.getInstructionLocationFromLabel('foo');
    expect(i).toBe(8);
  });
});

function checkPushInstruction(instruction: Instruction) {
  expect(instruction).toBeInstanceOf(PushInstruction);
  const pushInstruction = instruction as PushInstruction;
  checkRegister(pushInstruction.left, 'rax' as RegisterId);
}

function checkAddInstruction(instruction: Instruction) {
  expect(instruction).toBeInstanceOf(AddInstruction);
  const addInstruction = instruction as AddInstruction;
  checkConstant(addInstruction.left, 2);
  checkRegister(addInstruction.right, QuadRegister.rbx);
}

function checkMoveInstruction(instruction: Instruction) {
  expect(instruction).toBeInstanceOf(MoveInstruction);
  const moveInstruction = instruction as MoveInstruction;
  checkConstant(moveInstruction.left, 1);
  checkRegister(moveInstruction.right, QuadRegister.rax);
}

function checkPopInstruction(instruction: Instruction) {
  expect(instruction).toBeInstanceOf(PopInstruction);
  const popInstruction = instruction as PopInstruction;
  checkRegister(popInstruction.left, 'rbx' as RegisterId);
}

function getInstruction(input: string) {
  const e = new Parser().toEmulator(input);
  const instructions = e.instructionSet;
  const instruction = instructions.getInstruction(0);
  return instruction;
}

function checkRegister(accessor: MemWriter | MemReader, register: RegisterId) {
  expect((accessor as RegisterAccessor).baseRegister).toBe(register);
}

function checkConstant(accessor: MemReader, value: number) {
  expect((accessor as ImmediateSource).val).toBe(BigInt(value));
}
