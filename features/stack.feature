Feature: Push Instructions
    Push instructions

    @only
    Scenario: push from register onto the stack
      Given an emulator with push instruction to rax
      And register rax is set to 123
      And register rsp is set to 100
      When emulator steps once
      Then register rsp should have value 92
      And memory address 92 should have value 123

    Scenario: stack overflow
      Given an emulator with push instruction to rax
      And register rax is set to 123
      And register rsp is set to 0
      Then emulator should throw a stackoverflow error