import { Instruction } from './instruction';
import { Source, Target } from './source';
import { Emulator } from '../emulator';
export class MoveInstruction extends Instruction implements Instruction {
  left;
  right;
  constructor(left: Source, right: Target) {
    super();
    this.left = left;
    this.right = right;
  }

  execute(e: Emulator): void {
    this.right.write(e, this.left.value(e));
  }
}
