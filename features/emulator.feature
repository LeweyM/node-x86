Feature: Emulator
  The x86 Emulator

  Scenario: executing an instruction set
    Given an emulator with the following instructions
      | instruction | type        | lhs | rhs |
      | mov         | constToReg  | 10  | rax |
      | mov         | constToReg  | 5   | rbx |
      | add         | constToReg  | 1   | rax |
      | add         | regToReg    | rbx | rax |
    When emulator has run
    Then register rax should have value 16
    And register rbx should have value 5