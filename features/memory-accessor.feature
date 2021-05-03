Feature: Accessor
  Memory accessor

  Scenario: byte memory reader
    Given an Emulator with no instructions
    And the following in memory
    | memAddress | hex |
    | 0          | FF  | 
    | 1          | EE  | 
    | 2          | DD  | 
    | 3          | CC  | 
    | 4          | BB  | 
    | 5          | AA  | 
    | 6          | 99  | 
    | 7          | 88  | 
    Then reading 1 byte of memory from address 0 should give hex: FF
    Then reading 2 byte of memory from address 0 should give hex: FFEE
    Then reading 4 byte of memory from address 0 should give hex: FFEEDDCC
    Then reading 8 byte of memory from address 0 should give hex: FFEEDDCCBBAA9988

  Scenario: 1 byte memory writer
    Given an Emulator with no instructions
    When writing 1 byte of memory at address 0 to hex: FF
    Then reading 8 byte of memory from address 0 should give hex: FF00000000000000

  Scenario: 2 byte memory writer
    Given an Emulator with no instructions
    When writing 2 byte of memory at address 0 to hex: FFEE
    Then reading 8 byte of memory from address 0 should give hex: FFEE000000000000

  Scenario: 4 byte memory writer
    Given an Emulator with no instructions
    When writing 4 byte of memory at address 0 to hex: FFEEDDCC
    Then reading 8 byte of memory from address 0 should give hex: FFEEDDCC00000000

  Scenario: 8 byte memory writer
    Given an Emulator with no instructions
    When writing 8 byte of memory at address 0 to hex: FFEEDDCCBBAA9988
    Then reading 8 byte of memory from address 0 should give hex: FFEEDDCCBBAA9988