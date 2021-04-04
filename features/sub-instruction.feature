# Feature: Sub Instructions
#     Subtract instruction

#     Scenario: sub instructions
#     Given an emulator with the following instructions
#       | instruction | type        | lhs | rhs |
#       | mov         | constToReg  | 15  | rax |
#       | mov         | constToReg  | 6   | rbx |
#       | sub         | constToReg  | 1   | rbx |
#       | sub         | regToReg    | rbx | rax |
#     When emulator steps 4 times
#     Then register rbx should have value 5
#     And register rax should have value 10

