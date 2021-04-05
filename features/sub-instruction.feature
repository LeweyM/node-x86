Feature: Sub Instructions
    Subtract instruction

    Scenario: sub instructions
    Given an emulator with the following instructions
      | instruction | type          | lhs | rhs |
      | mov         | constToReg    | 15  | rax |
      | mov         | constToReg    | 6   | rbx |
      | sub         | constToReg    | 1   | rbx |
      | sub         | regToReg      | rbx | rax |
    When emulator has run
    Then register rbx should have value 5
    And register rax should have value 10

  Scenario: sub instructions to pointers
    Given an emulator with the following instructions
      | instruction | type       | lhs | rhs |
      | mov         | constToReg | 7   | eax |
      | mov         | constToPtr | 3   | eax |
      | sub         | constToPtr | 1   | eax |
    When emulator has run
    And memory address 7 should have value 2


