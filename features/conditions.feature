Feature: Condition Instructions
    Condition Instructions

    Scenario: Condition when r1 is more than r2
      Given an emulator with compare instruction of rax and rbx
      And register rax is set to 2
      And register rbx is set to 1
      When emulator steps once
      Then zero compare code should be false
      And negative compare code should be true

    Scenario: Condition when r1 equal to r2
      Given an emulator with compare instruction of rax and rbx
      And register rax is set to 2
      And register rbx is set to 2
      When emulator steps once
      Then zero compare code should be true
      And negative compare code should be false

    Scenario: Condition when r1 is less than r2
      Given an emulator with compare instruction of rax and rbx
      And register rax is set to 1
      And register rbx is set to 2
      When emulator steps once
      Then zero compare code should be false
      And negative compare code should be false