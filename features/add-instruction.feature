Feature: Add Instructions
    Add instructions

    Scenario: add instruction from constant to register
      Given an emulator with add const 5 to register rax instruction
      And register rax is set to 3
      When emulator steps once
      Then register rax should have value 8

    Scenario: add instruction from register to register
      Given an emulator with add register rbx to register rax instruction
      And register rax is set to 3
      And register rbx is set to 2
      When emulator steps once
      Then register rax should have value 5

    Scenario: add instruction from constant to memory address
      Given an emulator with add const 4 to ptr rax instruction
      And register rax is set to 11
      And memory 11 is set to 2
      When emulator steps once
      Then memory address 11 should have value 6