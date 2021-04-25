import { Parser } from '../domains/emulator/parser/parser';
import { QuadRegister } from '../domains/emulator/registers/registerConfig';
import { Given, Then } from 'cucumber';
import expect from 'expect';

Given('an emulator with the following raw input', async function (dataTable) {
  const rawInput = dataTable.rows().join('\n');
  this.emulator = new Parser().toEmulator(rawInput);
});

Then('the process should output {int}', async function (int) {
  const result = this.emulator.registers.read(QuadRegister.rax);
  expect(result).toBe(BigInt(int));
});
