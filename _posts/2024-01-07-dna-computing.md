---
layout: post
title: Leonard Adleman - Computing With DNA
date: 2024-01-07 10:14:00-0400
description: When electrons are hard to come by
tags: computing-history computing
categories: blog-post
giscus_comments: false
related_posts: false
---

Leonard Adleman is most widely known for being awarded the "Nobel Prize of Computer Science" in 2002 for his contribution to RSA encryption (he was the A). Co-developed with Ron Rivest and Adi Shamir, this encryption technique utilizes massive products of massive prime numbers, creating a key that users can't decrypt without the two factors. Due to these factors being prime, even the world's strongest supercomputers struggle when looking for these behemoth numbers, now reaching 2048 binary bits. Since its announcement in 1977, it has been one of the most viable forms of public-key cryptography, and today is the most widely used form. But of course, Adleman is much more than the computer scientist who helped create the RSA algorithm. While often overshadowed, he is also referred to as the "Father of DNA computing," which we will explore next. 

One of the more recent forms of unconventional computing began in 1994 when Adleman published his paper “Molecular Computation of Solutions To Combinatorial Problems.” In it, he described the similarities between the 2 state binary that is classical digital computing and the 4 state system of DNA. In DNA, there are four bases or nucleotides: Adenine (A), Cytosine (C), Guanine (G), and Thymine (T). Of these, A and T combine, as well as G and C. Similarly to bits, these 4 states fundamentally encode information that describes complex systems, in this case, the very basis of biology. Seeing this similarity, Adleman worked to determine problems that could be more easily computed using a DNA computer. 

Using previously known methods in the field of genetics, Adleman was able to solve a Hamiltonian (Travelling-Salesman-esque) path problem using strands of DNA. He did this by utilizing the four nucleotide bases to design DNA strands that represented each of the “paths” in the problem, and then he used a method called PCR (polymerase chain reaction) to amplify the paths that were possible. This method makes copies of a strand of DNA and is often used in forensics or disease diagnosis settings. Similar to Grover’s Algorithm from Quantum Computing (which Adleman’s method and PCR predated), this isolates the paths that “make sense” for the problem, and all that was needed afterward was more Adleman to remove the sequences that were too long, and then sequence the strands that were left over. 

Based on his original paper, there was an immediate stir in the computing community. Could DNA computing solve problems that traditional silicon-based computers could not? Surely if DNA is composed of trillions of components, and is infamously extremely numerable and easy to obtain, it could scale at a rate faster than the finite size of silicon wafers at the nanoscale. However, many problems, such as a very complicated TSP, would require such massive amounts of DNA that it wouldn’t make sense to solve them using this method. Rather, the main realization from these experiments is that DNA can be inherently “programmed” to operate similarly to a computer, which at a small scale can positively benefit biochemists. 

After this first experiment, several more were made to analyze the extent of DNA computing. Since Adleman’s 1996 Hamiltonian, scientists have designed a basic tic-tac-toe game based on DNA computing, a simple neural network, and very basic memory systems. 

While this exhibits some promise, it is unlikely that DNA computing will ever “make it big” with the various limitations that prevent its implementation. While it can store data at a smaller scale than traditional computers, it is much slower to read and write to DNA (by thousands of magnitudes), and the last 6 decades of R&D have made it so that traditional computing is significantly more reliable. DNA strands are fragile when being manipulated, resulting in a high probability of failure (compared to digital equivalents). Who can say if we will ever be able to use a computer composed of DNA for anything extraordinarily useful, but with the advent of new unconventional computing research due to the collapse of Moore’s Law, time can only tell. 


## References: 

https://en.wikipedia.org/wiki/DNA_computing#History

https://www.britannica.com/technology/DNA-computing

https://www.pluralsight.com/resources/blog/cloud/what-is-dna-computing-technology

https://www.britannica.com/science/polymerase-chain-reaction
