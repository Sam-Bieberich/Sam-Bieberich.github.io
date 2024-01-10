---
layout: post
title: Why Minecraft is Turing Complete but a Quantum Computer can’t be
date: 2024-01-02 10:14:00-0400
description: Why Minecraft is Turing Complete but a Quantum Computer can’t be
tags: turing-completeness computing
categories: blog-post
giscus_comments: false
related_posts: false
---

It seems funny that a videogame that is over a decade old can be Turing Complete, but Minecraft is one of many examples of constructs in our daily lives that are a product of the Turing machine simulation metric. That being said, we ought to define Turing Completeness first before anyone gets bothered and decides to pull out of their stocks in quantum computing and switch to Microsoft and Wizards of the Coast (yeah, Magic is Turing complete too). 

Turing Completeness refers to when a system can be used to simulate a Turing machine. People in the field of Computer Science are very familiar with these fabled machines, not because of their rarity but their prevalence in society. A Turing machine, named for the theory by Alan Turing, the most famous Computer Scientist of the twentieth century, is composed of an infinite strip of "tape" split into equal-sized cells upon which symbols can be written and read. The machine itself involves three components: 

<ol type="a">
  <li>The infinitely long tape which stores the inputs, outputs, and calculations you made in between. </li>
  <li>A tape reader, also called a tape head, reads the cells one at a time and either does nothing or writes over them.</li>
  <li>A program or instruction set that the machine can convert from symbols to actions performed by the other parts of the machine.</li>
</ol>


This seems fairly broad... because it is! Many constructs that far predate computers, such as spoken language, are technically Turing Complete, and now that we have Turing Complete computers, the possibilities are endless! Microsoft Excel has been proven to be Turing Complete, as well as Minesweeper, TeX, the printf string, and Minecraft. So why can a quantum computer not be Turing Complete?

Let's get some things out of the way first: quantum computers can be simulated by classical computers, which are Turing Complete. In the Noisy Intermediate Scale era of Quantum Computing, called NISQ for short, many computations are performed on quantum simulators first, as they can avoid (and accurately simulate if you want) any of the numerous errors that quantum machines experience throughout the computation. The reason quantum computers are not Turing complete is because this relationship is not reciprocal. Quantum computers can not simulate classical computers. 

Quantum Computers, unlike classical ones, need to have reversible or "unitary" gate sets. This means that going backward essentially yields the same output through each step. This does not apply to classical gates, such as the NAND (NOT AND) gate, which itself is considered universal, as a computer could operate using only those gates. Why is this so for quantum computers? It has to do with how they compute problems in the first place. 

Looking at a Bloch Sphere, or even just at a Hamiltonian (energy function in quantum mechanics), all of the qubits must have a sum of possible probabilities equal to 1, or 100\%. For example, the final state of a qubit can't be 80\% 1 and 55\% 0, as they do not sum to 100\%. All of quantum mechanics in that sense is unitary/reversible, making this not just a curse for quantum engineers but an intentional design characteristic of quantum computers themselves. 

A second reasoning behind why quantum computers are not Turing Complete is their tendency towards "spooky action at a distance." While Turing machines have an infinite amount of cells, the cells each have one symbol on them that can only be read, deleted, or written over. Using the same analogy, entanglement would require some cells to share a state, meaning that as soon as one changes, the other does as well. Likewise, if read, all entangled qubit state cells would collapse! This is straying very far from the already "out there" infinite tape experiment.

Lastly, Turing machines aren't able to solve all the problems a quantum computer can. The last sentence is sort of a lie: they can simulate any situation that is computable. However, Turing machines running Shor's algorithm for example would take beyond the lifetime of the universe to finish. Briefly, for those who do not know of Shor's algorithm, it is one of the primary reasons companies and governments are investing in quantum computing, as it promises a way to break RSA encryption. RSA encryption is based on keys which are composed of extremely, inconceivably large numbers which are the product of two equally massive large prime numbers. Thus, the keys are difficult to break, even if a computer starts crunching all of the numbers between 0 and RSA. Quantum computers' ability to be in a superposition of multiple states is the only reason that it is even possible to compute. However, we are still years if not decades from implementation. Like Shor's Algorithm, which solves the "Period-Finding Problem," there are also other algorithms that could be solved by a Turing machine, but not in a finite amount of time. These problems are often called NP-Hard by Computer Scientists and Theorists. 

Given this information, it is easy to see why quantum computers are unique from the tools we use regularly. While conceivably simulatable by backends such as Excel or Minecraft, quantum computers can't do the opposite, but they can do much more in return. Of course, don't let me stop you from placing some redstone and trying regardless. 

## References

https://pennylane.ai/qml/demos/tutorial\_photonics\#photonic-quantum-computers

https://quantumzeitgeist.com/differences-between-quantum-annealers-and-gate-based-quantum-computing/
