# Feature: End to end tests
#   End to end tests of the x86 Emulator

#   Scenario: processing and outputing instructions
#     Given an emulator with the following input
#       | movl    $5, %edi       |
#       | movl    $6, %esi       |
#       | pushq   %rbp           |
#       | movq    %rsp, %rbp     |
#       | subq    $16, %rsp      |
#       | movl    %edi, -4(%rbp) |
#       | movl    $5, %edi       |
#       | movl    $6, %esi       |
#       | callq   square         |
#       | addq    $16, %rsp      |
#       | popq    %rbp           |
#       | retq                   |
#     When the emulator instructionSet is processed
#     Then the process should output 30
      