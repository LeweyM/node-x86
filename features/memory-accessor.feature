Feature: Accessor
  Memory accessor

  Scenario: byte memory reader
    Given an Emulator with no instructions
    And the following in memory
    | memAddress | hex |
    | 7          | FF  | 
    | 6          | EE  | 
    | 5          | DD  | 
    | 4          | CC  | 
    | 3          | BB  | 
    | 2          | AA  | 
    | 1          | 99  | 
    | 0          | 88  | 
    Then reading 1 byte of memory from address 0 should give hex: 88
    Then reading 2 byte of memory from address 0 should give hex: 9988
    Then reading 4 byte of memory from address 0 should give hex: BBAA9988
    Then reading 8 byte of memory from address 0 should give hex: FFEEDDCCBBAA9988

  Scenario: 1 byte memory writer
    Given an Emulator with no instructions
    When writing 1 byte of memory at address 0 to hex: EF
    Then reading 8 byte of memory from address 0 should give hex: EF

  Scenario: 2 byte memory writer
    Given an Emulator with no instructions
    When writing 2 byte of memory at address 0 to hex: FF
    Then reading 8 byte of memory from address 0 should give hex: FF

  Scenario: 4 byte memory writer
    Given an Emulator with no instructions
    When writing 4 byte of memory at address 0 to hex: CCDDEEFF
    Then reading 8 byte of memory from address 0 should give hex: CCDDEEFF

  Scenario: 8 byte memory writer
    Given an Emulator with no instructions
    When writing 8 byte of memory at address 0 to hex: 8877AABBCCDDEEFF
    Then reading 8 byte of memory from address 0 should give hex: 8877AABBCCDDEEFF