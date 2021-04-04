Feature: Emulator
  The x86 Emulator

  Scenario: initial conditions
    Given an Emulator with no instructions
    Then all registers should have a value of 0

  Scenario: executing an instruction set
    Given an emulator with the following instructions
      | ins | lhs | rhs |
      | mov | rax | 10  |
      | mov | rbx | 5   |
      | add | rax | 1   |
      | add | rax | rbx |
    When emulator steps 4 times
    Then register rax should have value 16
    And register rbx should have value 5