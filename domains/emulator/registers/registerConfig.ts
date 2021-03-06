export type RegisterId = QuadRegister | DoubleRegister | WordRegister | ByteRegister;

export enum QuadRegister {
  rax = 'rax',
  rbx = 'rbx',
  rcx = 'rcx',
  rdx = 'rdx',
  rsi = 'rsi',
  rdi = 'rdi',
  rbp = 'rbp',
  rsp = 'rsp',
  r8 = 'r8',
  r9 = 'r9',
  r10 = 'r10',
  r11 = 'r11',
  r12 = 'r12',
  r13 = 'r13',
  r14 = 'r14',
  r15 = 'r15',
  rip = 'rip',
}

export enum DoubleRegister {
  eax = 'eax',
  ebx = 'ebx',
  ecx = 'ecx',
  edx = 'edx',
  esi = 'esi',
  edi = 'edi',
  ebp = 'edp',
  esp = 'esp',
  r8d = 'r8d',
  r9d = 'r9d',
  r10d = 'r10d',
  r11d = 'r11d',
  r12d = 'r12d',
  r13d = 'r13d',
  r14d = 'r14d',
  r15d = 'r15d',
}

export enum WordRegister {
  ax = 'ax',
  bx = 'bx',
  cx = 'cx',
  dx = 'dx',
  si = 'si',
  di = 'di',
  bp = 'dp',
  sp = 'sp',
  r8w = 'r8w',
  r9w = 'r9w',
  r10w = 'r10w',
  r11w = 'r11w',
  r12w = 'r12w',
  r13w = 'r13w',
  r14w = 'r14w',
  r15w = 'r15w',
}

export enum ByteRegister {
  al = 'al',
  bl = 'bl',
  cl = 'cl',
  dl = 'dl',
  sil = 'sil',
  dil = 'dil',
  bpl = 'dpl',
  spl = 'spl',
  r8b = 'r8b',
  r9b = 'r9b',
  r10b = 'r10b',
  r11b = 'r11b',
  r12b = 'r12b',
  r13b = 'r13b',
  r14b = 'r14b',
  r15b = 'r15b',
}

export type Register = {
  registerIndex: number;
  size: 8 | 16 | 32 | 64;
};

const ByteRegisters: Record<ByteRegister, Register> = {
  [ByteRegister.al]: { registerIndex: 0, size: 8 },
  [ByteRegister.bl]: { registerIndex: 1, size: 8 },
  [ByteRegister.cl]: { registerIndex: 2, size: 8 },
  [ByteRegister.dl]: { registerIndex: 3, size: 8 },
  [ByteRegister.sil]: { registerIndex: 4, size: 8 },
  [ByteRegister.dil]: { registerIndex: 5, size: 8 },
  [ByteRegister.bpl]: { registerIndex: 6, size: 8 },
  [ByteRegister.spl]: { registerIndex: 7, size: 8 },
  [ByteRegister.r8b]: { registerIndex: 8, size: 8 },
  [ByteRegister.r9b]: { registerIndex: 9, size: 8 },
  [ByteRegister.r10b]: { registerIndex: 10, size: 8 },
  [ByteRegister.r11b]: { registerIndex: 11, size: 8 },
  [ByteRegister.r12b]: { registerIndex: 12, size: 8 },
  [ByteRegister.r13b]: { registerIndex: 13, size: 8 },
  [ByteRegister.r14b]: { registerIndex: 14, size: 8 },
  [ByteRegister.r15b]: { registerIndex: 15, size: 8 },
};
const WordRegisters: Record<WordRegister, Register> = {
  [WordRegister.ax]: { registerIndex: 0, size: 16 },
  [WordRegister.bx]: { registerIndex: 1, size: 16 },
  [WordRegister.cx]: { registerIndex: 2, size: 16 },
  [WordRegister.dx]: { registerIndex: 3, size: 16 },
  [WordRegister.si]: { registerIndex: 4, size: 16 },
  [WordRegister.di]: { registerIndex: 5, size: 16 },
  [WordRegister.bp]: { registerIndex: 6, size: 16 },
  [WordRegister.sp]: { registerIndex: 7, size: 16 },
  [WordRegister.r8w]: { registerIndex: 8, size: 16 },
  [WordRegister.r9w]: { registerIndex: 9, size: 16 },
  [WordRegister.r10w]: { registerIndex: 10, size: 16 },
  [WordRegister.r11w]: { registerIndex: 11, size: 16 },
  [WordRegister.r12w]: { registerIndex: 12, size: 16 },
  [WordRegister.r13w]: { registerIndex: 13, size: 16 },
  [WordRegister.r14w]: { registerIndex: 14, size: 16 },
  [WordRegister.r15w]: { registerIndex: 15, size: 16 },
};
const DoubleRegisters: Record<DoubleRegister, Register> = {
  [DoubleRegister.eax]: { registerIndex: 0, size: 32 },
  [DoubleRegister.ebx]: { registerIndex: 1, size: 32 },
  [DoubleRegister.ecx]: { registerIndex: 2, size: 32 },
  [DoubleRegister.edx]: { registerIndex: 3, size: 32 },
  [DoubleRegister.esi]: { registerIndex: 4, size: 32 },
  [DoubleRegister.edi]: { registerIndex: 5, size: 32 },
  [DoubleRegister.ebp]: { registerIndex: 6, size: 32 },
  [DoubleRegister.esp]: { registerIndex: 7, size: 32 },
  [DoubleRegister.r8d]: { registerIndex: 8, size: 32 },
  [DoubleRegister.r9d]: { registerIndex: 9, size: 32 },
  [DoubleRegister.r10d]: { registerIndex: 10, size: 32 },
  [DoubleRegister.r11d]: { registerIndex: 11, size: 32 },
  [DoubleRegister.r12d]: { registerIndex: 12, size: 32 },
  [DoubleRegister.r13d]: { registerIndex: 13, size: 32 },
  [DoubleRegister.r14d]: { registerIndex: 14, size: 32 },
  [DoubleRegister.r15d]: { registerIndex: 15, size: 32 },
};

const QuadRegisters: Record<QuadRegister, Register> = {
  [QuadRegister.rax]: { registerIndex: 0, size: 64 },
  [QuadRegister.rbx]: { registerIndex: 1, size: 64 },
  [QuadRegister.rcx]: { registerIndex: 2, size: 64 },
  [QuadRegister.rdx]: { registerIndex: 3, size: 64 },
  [QuadRegister.rsi]: { registerIndex: 4, size: 64 },
  [QuadRegister.rdi]: { registerIndex: 5, size: 64 },
  [QuadRegister.rbp]: { registerIndex: 6, size: 64 },
  [QuadRegister.rsp]: { registerIndex: 7, size: 64 },
  [QuadRegister.r8]: { registerIndex: 8, size: 64 },
  [QuadRegister.r9]: { registerIndex: 9, size: 64 },
  [QuadRegister.r10]: { registerIndex: 10, size: 64 },
  [QuadRegister.r11]: { registerIndex: 11, size: 64 },
  [QuadRegister.r12]: { registerIndex: 12, size: 64 },
  [QuadRegister.r13]: { registerIndex: 13, size: 64 },
  [QuadRegister.r14]: { registerIndex: 14, size: 64 },
  [QuadRegister.r15]: { registerIndex: 15, size: 64 },
  [QuadRegister.rip]: { registerIndex: 16, size: 64 }, //program counter
};

export const allRegisters: Record<RegisterId, Register> = {
  ...QuadRegisters,
  ...DoubleRegisters,
  ...WordRegisters,
  ...ByteRegisters,
};
