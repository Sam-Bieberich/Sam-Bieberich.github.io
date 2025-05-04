---
layout: post
title: The Five Stages of Computing History, and What Could be Next for Quantum Computing (Part 1)
---

{{ page.title }}
================

<p class="meta">4 Apr 2025</p>

## Introduction

Recently, when I was reading Heterogeneous Computing: Hardware and Software Perspectives, the author, Mohamed Zahran, proposed the following five sequential goals in the history of computing: Correctness, Speed, Power, Reliability, and Security. While it is certainly arguable that there was overlap amongst all five of these goals, this point raises a critical question: how may it be related to quantum computing? Quantum computing is one of the few high-performance unconventional computing paradigms that offers a completely new hardware approach, as well as software. Thus, for the first time since the transition to transistor-based computing, the analysis of all five of these goals is valid. Will quantum computing utility be dependent on all five, and what added difficulties are there? The first two will be analyzed below, and the following three in the second part of this article. 

## Correctness

Considered the first step for the realization of classical computers, this same criteria holds for new, quantum computers. This is also the stage that current R&D is the most focused on, as evidenced by the “Noisy” term in Noisy-Intermediate Scale QC (NISQ), the era of quantum computing we are in. Due to their inherent nature as quantum systems, quantum computers are highly susceptible to noise/errors. This has resulted in quantum error correction becoming one of the leading software initiatives in the field, with Google Quantum AI focusing on this in recent years more so than pure hardware/qubit increases. 

The book "The Complexity of Noise" by Aram Harrow provides an in-depth exploration of these challenges and the theoretical frameworks being developed to address them. As the field progresses, achieving and maintaining correctness will continue to be a fundamental requirement for the practical use of quantum computing technologies.

## Speed

While quantum computers are currently deficient in correctness, they are most famous for their potential to dramatically accelerate certain types of computations. The most celebrated example is Shor’s algorithm, which theoretically allows quantum computers to factor large numbers exponentially faster than classical algorithms, a feat with profound implications for cryptography. Other algorithms, like Grover’s algorithm, promise quadratic speedups for unsorted search problems.

However, it’s important to recognize that quantum speedup is not universal. For many practical tasks, especially those outside a narrow set of quantum-suitable problems, today’s quantum computers are actually much slower than their classical counterparts. This is due to both hardware limitations (such as short coherence times and high error rates) and the overhead of error correction and control.

A common misconception is that quantum computers “try all possibilities at once.” Popular media often exaggerates this, suggesting quantum devices can “explore parallel universes” to instantly solve problems. In reality, quantum computers leverage superposition and entanglement to explore many computational paths simultaneously, but the final measurement collapses the system to a single outcome. Clever algorithm design is required to amplify the probability of measuring the correct answer. Otherwise, the quantum advantage over a digital schema is lost.

It’s also worth noting that quantum computers are not replacements for classical computers, but rather accelerators for specific tasks. In practice, a quantum computer is often part of a hybrid system: classical computers handle most operations, while the quantum processor is reserved for the parts of a problem where it can provide a true speedup. As quantum hardware and algorithms mature, the hope is that more real-world problems will become accessible to quantum acceleration. Until then, the “speed” advantage of quantum computing remains both its most tantalizing promise, and its most misunderstood aspect.

## References  

[What You Shouldn't Know About Quantum Computers](https://www.goodreads.com/book/show/213847532-what-you-shouldn-t-know-about-quantum-computers)
[A Shortcut Through Time](https://www.goodreads.com/book/show/416598.A_Shortcut_Through_Time)
[Quantum Computing Challenges (The Quantum Insider)](https://thequantuminsider.com/2023/03/24/quantum-computing-challenges/)