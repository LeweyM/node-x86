Feature: End to end tests
  End to end tests of the x86 Emulator

  Scenario: Simple example
    Given an emulator with the following raw input
      | RAW INPUT             |
      | movq    %rsp, %rbp    |
      | foo:                  |
      | pushq   %rbp          |
      | movq    %rsp, %rbp    |
      | movl    $5, %eax      |
      | popq    %rbp          |
      | ret                   |
      | main:                 |
      | pushq   %rbp          |
      | movq    %rsp, %rbp    |
      | movl    $0, %eax      |
      | call    foo           |
      | popq    %rbp          |
    And register rbp is set to 8 
    # rip 48 to start at main:
    And register rip is set to 48 
    And register rsp is set to 80
    When emulator has run
    Then the process should output 5

  # Scenario: processing and outputing instructions
  #   Given an emulator with the following raw input
  #      | foo:                       |
  #      | pushq   %rbp               |
  #      | movq    %rsp, %rbp         |
  #      | movq    %rdi, -24(%rbp)    |
  #      | movl    %esi, -28(%rbp)    |
  #      | movl    $0, -4(%rbp)       |
  #      | movl    $0, -8(%rbp)       |
  #      | jmp     .L2                |
  #      | .L3:                       |
  #      | movl    -8(%rbp), %eax     |
  #      | cltq                       |
  #      | leaq    0(,%rax,4), %rdx   |
  #      | movq    -24(%rbp), %rax    |
  #      | addq    %rdx, %rax         |
  #      | movl    (%rax), %eax       |
  #      | addl    %eax, -4(%rbp)     |
  #      | addl    $1, -8(%rbp)       |
  #      | .L2:                       |
  #      | movl    -8(%rbp), %eax     |
  #      | cmpl    -28(%rbp), %eax    |
  #      | jl      .L3                |
  #      | movl    -4(%rbp), %eax     |
  #      | popq    %rbp               |
  #      | ret                        |
  #      | main:                      |
  #      | pushq   %rbp               |
  #      | movq    %rsp, %rbp         |
  #      | subq    $16, %rsp          |
  #      | movl    $1, -16(%rbp)      |
  #      | movl    $2, -12(%rbp)      |
  #      | movl    $3, -8(%rbp)       |
  #      | movl    $4, -4(%rbp)       |
  #      | leaq    -16(%rbp), %rax    |
  #      | movl    $4, %esi           |
  #      | movq    %rax, %rdi         |
  #      | call    foo                |
  #      | leave                      |
  #      | ret                        |
  #   And register rbp is set to 8
  #   # rip 48 to start at main:
  #   And register rip is set to 160
  #   And register rsp is set to 80
  #   When emulator has run