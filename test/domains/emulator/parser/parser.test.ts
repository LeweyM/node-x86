import { AddInstruction } from '../../../../domains/emulator/instruction/addInstruction';
import { MoveInstruction } from '../../../../domains/emulator/instruction/moveInstruction';
import { PopInstruction } from '../../../../domains/emulator/instruction/popInstruction';
import { PushInstruction } from '../../../../domains/emulator/instruction/pushInstruction';
import {
  ImmediateSource,
  MemReader,
  MemWriter,
  RegisterAccessor,
} from '../../../../domains/emulator/memoryAccessors';
import { Parser } from '../../../../domains/emulator/parser/parser';
import { QuadRegister, RegisterId } from '../../../../domains/emulator/registers/registerConfig';

test('parser can parse move instructions', () => {
  const instruction = getInstruction('movq $1, rax');
  expect(instruction).toBeInstanceOf(MoveInstruction);
  const moveInstruction = instruction as MoveInstruction;
  checkConstant(moveInstruction.left, 1);
  checkRegister(moveInstruction.right, QuadRegister.rax);
});

test('parser can parse add instructions', () => {
  const instruction = getInstruction('addq $2, rbx');
  expect(instruction).toBeInstanceOf(AddInstruction);
  const addInstruction = instruction as AddInstruction;
  checkConstant(addInstruction.left, 2);
  checkRegister(addInstruction.right, QuadRegister.rbx);
});

test('parser can parse push instructions', () => {
  const instruction = getInstruction('pushq rax');
  expect(instruction).toBeInstanceOf(PushInstruction);
  const pushInstruction = instruction as PushInstruction;
  checkRegister(pushInstruction.left, 'rax' as RegisterId);
});

test('parser can parse pop instructions', () => {
  const instruction = getInstruction('popq rbx');
  expect(instruction).toBeInstanceOf(PopInstruction);
  const popInstruction = instruction as PopInstruction;
  checkRegister(popInstruction.left, 'rbx' as RegisterId);
});

// test('parser can parse call instructions', () => {
//   const instruction = getInstruction('call foo');
//   expect(instruction).toBeInstanceOf(CallInstruction);
//   const popInstruction = instruction as CallInstruction;
//   checkRegister(popInstruction.left, 'rbx' as RegisterId);
// });

function getInstruction(input: string) {
  const instructions = new Parser().toInstructions(input);
  const instruction = instructions.getInstruction(0);
  return instruction;
}

function checkRegister(accessor: MemWriter | MemReader, register: RegisterId) {
  expect((accessor as RegisterAccessor).baseRegister).toBe(register);
}

function checkConstant(accessor: MemReader, value: number) {
  expect((accessor as ImmediateSource).val).toBe(BigInt(value));
}
