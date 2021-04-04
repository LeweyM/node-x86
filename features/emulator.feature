Feature: Emulator
  The x86 Emulator

  Scenario: initial conditions
    Given an Emulator with no instructions
    Then all registers should have a value of 0

  Scenario: executing an instruction set
    Given an emulator with the following instructions
      | instruction | type        | lhs | rhs |
      | mov         | constToReg  | 10  | rax |
      | mov         | constToReg  | 5   | rbx |
      | add         | constToReg  | 1   | rax |
      | add         | regToReg    | rbx | rax |
    When emulator steps 4 times
    Then register rax should have value 16
    And register rbx should have value 5