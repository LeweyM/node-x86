Feature: Move Instructions
    Move instruction

    Scenario: move instruction from constant to register
      Given an emulator with move const 4 to register rax instruction
      And register rax is set to 11
      When emulator steps once
      Then register rax should have value 4

    Scenario: move instruction from register to register
      Given an emulator with move rbx to rax instruction
      And register rax is set to 11
      And register rbx is set to 5
      When emulator steps once
      Then register rax should have value 5

    Scenario: move instruction from constant to memory address
      Given an emulator with move const 4 to ptr rax instruction
      And register rax is set to 11
      When emulator steps once
      Then memory address 11 should have value 4
