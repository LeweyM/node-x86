Feature: Load Effective Address Instructions
    leaq instructions

    Scenario: leaq instruction from constant to register
      Given an emulator with leaq instruction, left: 5, rbx, rbx, 4, right: rax 
      And register rbx is set to 2
      When emulator steps once
      Then register rax should have value 15