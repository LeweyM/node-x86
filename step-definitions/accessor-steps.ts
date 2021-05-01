import { RegisterAccessor } from '../domains/emulator/memoryAccessors';
import { RegisterId } from '../domains/emulator/registers/registerConfig';
import { Given, TableDefinition, Then, When } from 'cucumber';
import expect from 'expect';

Given('a register accessor with the following parameters', async function (table: TableDefinition) {
  table.hashes().forEach((row) => {
    this.registerAccessor = new RegisterAccessor(
      row['register'] as RegisterId,
      row['isPointer'] == 'true',
      parseInt(row['offset'], 10) || 0,
      getScale(row),
      (row['indexReg'] as RegisterId) || '',
    );
  });
});
When('the accessor writes {int}', async function (value: number) {
  this.registerAccessor.write(this.emulator, BigInt(value));
});
When('the accessor writes hex: {word}', async function (hexValue: string) {
  const value = BigInt('0x' + hexValue);
  this.registerAccessor.write(this.emulator, value);
});

Then('the accessor should read {int}', async function (value: number) {
  expect(this.registerAccessor.read(this.emulator)).toBe(BigInt(value));
});
Then('the accessor should read hex: {word}', async function (hexValue: string) {
  const expected = BigInt('0x' + hexValue);
  const bytes = hexValue.length * 4;
  const value = BigInt.asUintN(bytes, this.registerAccessor.read(this.emulator));
  expect(value).toBe(expected);
});

function getScale(row: { [x: string]: string }): 1 | 2 | 4 | 8 {
  const scaleValue = parseInt(row['scale'], 10);
  if ([1, 2, 4, 8].indexOf(scaleValue) < 0) return 1;
  return scaleValue as 1 | 2 | 4 | 8;
}
