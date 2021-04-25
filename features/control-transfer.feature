Feature: Control Transfer
    Call and Return instructions

    Scenario: Call instruction 
    Given an emulator with the following instructions
      | instruction | type       | lhs  |
      | mov         | constToReg | 0    |
      | label       |            | main |
      | call        | label      | foo  |
      | label       |            | foo  |
      | return      |            |      |
    And register rsp is set to 100
    And register rip is set to 8
    When emulator steps once
    Then register rsp should have value 92
    And memory address 92 should have value 8

  Scenario: Return instruction
    Given an emulator with the following instructions
      | instruction | type        | lhs  | rhs  |
      | label       |             | main |      |
      | call        | label       | foo  |      |
      | mov         | constToReg  | 5    | rax  |
      | label       |             | foo  |      |
      | return      |             |      |      |
    And register rsp is set to 100
    And register rip is set to 0
    When emulator steps 2 times
    Then register rip should have value 8
    And register rax should have value 0
    

