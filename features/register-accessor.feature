Feature: Accessor
  Memory accessor

  Scenario: register accessor
    Given an Emulator with no instructions
    And a register accessor with the following parameters
      | register | isPointer | offset | scale |
      | rax      | false     | 0      | 1     |
    When the accessor writes 11
    Then register rax should have value 11
    And the accessor should read 11

  Scenario: register pointer accessor
    Given an Emulator with no instructions
    And register rax is set to 2
    And a register accessor with the following parameters
      | register | isPointer | 
      | rax      | true      | 
    When the accessor writes 11
    Then memory address 2 should have value 11
    And the accessor should read 11

  Scenario: register pointer accessor with offset
    Given an Emulator with no instructions
    And register rax is set to 2
    And a register accessor with the following parameters
      | register | isPointer | offset | 
      | rax      | true      | 4      | 
    When the accessor writes 11
    Then memory address 6 should have value 11
    And the accessor should read 11

  Scenario: register pointer accessor with index register, offset and scale
    Given an Emulator with no instructions
    And register rax is set to 2
    And register rbx is set to 8
    And a register accessor with the following parameters
      | register | isPointer | offset | scale | indexReg |
      | rax      | true      | 4      | 4     | rbx      |
    When the accessor writes 11
    Then memory address 38 should have value 11 
    # 38 == 4 + 2 + (8 * 4)
    And the accessor should read 11

  Scenario: register pointer accessor with index register, offset and scale, and no base register
    Given an Emulator with no instructions
    And register rax is set to 2
    And a register accessor with the following parameters
      | register | isPointer | offset | scale | indexReg |
      |          | true      | 4      | 4     | rax      |
    When the accessor writes 11
    # 12 == 4 + (4 * 2)
    Then memory address 12 should have value 11 
    And the accessor should read 11

  Scenario: register pointer accessor with index register
    Given an Emulator with no instructions
    And register rax is set to 2
    And register rbx is set to 4
    And a register accessor with the following parameters
      | register | isPointer | offset | scale | indexReg |
      | rax      | true      | 0      | 1     | rbx      |
    When the accessor writes 11
    Then memory address 6 should have value 11
    And the accessor should read 11

  Scenario: 64bit quad register accessor 
    Given an Emulator with no instructions
    And register rax is set to 0
    And a register accessor with the following parameters
      | register | isPointer | offset | scale | indexReg |
      | rax      | false     | 0      | 1     |          |
    When the accessor writes hex: 0011223344556677
    Then register rax should have value hex: 0011223344556677
    And the accessor should read hex: 0011223344556677

  Scenario: 8bit byte register accessor
    Given an Emulator with no instructions
    And register rax is set to hex: 0011223344556677
    And a register accessor with the following parameters
      | register | isPointer | offset | scale | indexReg |
      | al       | false     | 0      | 1     |          |
    When the accessor writes hex: FF 
    Then register rax should have value hex: 00112233445566FF
    And the accessor should read hex: FF

  Scenario: 16bit word register accessor
    Given an Emulator with no instructions
    And register rax is set to hex: 0011223344556677
    And a register accessor with the following parameters
      | register | isPointer | offset | scale | indexReg |
      | ax       | false     | 0      | 1     |          |
    When the accessor writes hex: FFFF 
    Then register rax should have value hex: 001122334455FFFF
    And the accessor should read hex: FFFF

  Scenario: 32bit double register accessor
    Given an Emulator with no instructions
    And register rax is set to hex: 0011223344556677
    And a register accessor with the following parameters
      | register  | isPointer | offset | scale | indexReg |
      | eax       | false     | 0      | 1     |          |
    When the accessor writes hex: FFFFFFFF
    Then register rax should have value hex: 00000000FFFFFFFF
    And the accessor should read hex: FFFFFFFF
