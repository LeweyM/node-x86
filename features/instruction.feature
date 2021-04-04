Feature: Instructions
    The x86 Emulator instructions set

    Scenario: initial conditions
      Given an Emulator with no instructions
      Then all registers should have a value of 0

    Scenario: add instruction from constant to register
      Given an emulator with add rax 5 instruction
      And register rax is set to 3
      When emulator steps once
      Then register rax should have value 8

    Scenario: add instruction from register to register
      Given an emulator with add rax rbx instruction
      And register rax is set to 3
      And register rbx is set to 2
      When emulator steps once
      Then register rax should have value 5

    Scenario: move instruction from constant to register
      Given an emulator with move rax 4 instruction
      And register rax is set to 11
      When emulator steps once
      Then register rax should have value 4

    Scenario: move instruction from register to register
      Given an emulator with move rax rbx instruction
      And register rax is set to 11
      And register rbx is set to 5
      When emulator steps once
      Then register rax should have value 5

    # Scenario: move instruction from constant to memory address
    #   Given a simple Emulator
    #   And register rax is set to 11
    #   When a move [rax] 4 instruction is processed
    #   Then address 11 should have value 4
