@only
Feature: Sign Extension Instructions
  Sign Extension instruction

  Scenario: sign extended move instruction from register to register
    Given an emulator with sign extended move eax to rax instruction
    And register rax is set to hex: FFFFFFFF00000011
    When emulator steps once
    Then register rax should have value hex: 0000000000000011

  Scenario: sign extended move instruction from register to register
    Given an emulator with sign extended move eax to rax instruction
    And register rax is set to hex: 00000000FFFFFFFF
    When emulator steps once
    Then register rax should have value hex: FFFFFFFFFFFFFFFF

  Scenario: sign extended move instruction from register to register
    Given an emulator with sign extended move eax to rax instruction
    And register rax is set to hex: 00000000FF341234
    When emulator steps once
    Then register rax should have value hex: FFFFFFFFFF341234

  Scenario: sign extended move instruction from register to register
    Given an emulator with sign extended move eax to rax instruction
    And register rax is set to hex: 1234123400000000
    When emulator steps once
    Then register rax should have value hex: 0000000000000000
