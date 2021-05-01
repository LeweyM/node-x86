Feature: Jump Instructions
    jump instruction

    Scenario: jump instruction
    Given an emulator with the following instructions
      | instruction | type          | lhs  | rhs |
      | label       |               | main |     |
      | add         | constToReg    | 1    | rax |
      | label       |               | foo  |     |
      | jmp         | label         | main |     |
    When emulator steps 6 times
    Then register rax should have value 3

  Scenario: jump if less instruction
    Given an emulator with the following instructions
      | instruction | type       | lhs  | rhs |
      | label       |            | main |     |
      | add         | constToReg | 1    | rax |
      | label       |            | foo  |     |
      | cmpl        | regToReg   | rbx  | rax |
      | jl          | label      | main |     |
    And register rbx is set to 5
    When emulator has run
    Then register rax should have value 5



