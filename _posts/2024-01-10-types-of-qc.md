---
layout: post
title: The Many Types of Quantum Hardware
date: 2024-01-10 10:14:00-0400
description: Quantum computers are not all created equally
tags: quantum-computing
categories: blog-post
giscus_comments: false
related_posts: false
toc:
  sidebar: left
---

Quantum computers are not all created equally. Like how classical computers, especially in the modern market, can be one of several architectures, quantum computers are also very broad in scope and can be one of a variety of designs. Due to new quantum engineering and software engineering work, we are also learning new, more efficient ways to make quantum computers yearly! What are some of the most common hardware architectures, and how do they differ from one another?

## Superconducting

Spearheaded by big-name hardware companies in the classical computing field, like IBM and Google, Superconducting quantum computing is the most instantaneously recognizable quantum computing model in the media. The science-fiction-esque golden chandeliers, frozen at a few milli-Kelvin above absolute zero, harbor advanced cooling technology and control electronics that keep the qubits, located in small, often thumb-drive or smaller chips, at a temperature colder than space to allow for minimal error in the remarkably fragile inner workings. These qubits are often referred to as artificial atoms and are controlled by microwave signals from the control electronics. Either due to corporate gloating or legitimate scientific progress, of which I will have to get back to you, IBM and Google have both made quantum supremacy claims regarding their superconducting devices and currently. This means that they performed tests that, at the time of the programming, would have been intractable on a classical computer (meaning it could've run forever and never finished or been sufficiently accurate). 

Primarily working due to the unique properties of Josephson Junctions, this hardware is one of the furthest developed due to massive funding from Silicon Valley and overlaps with other scientific research. Superconductivity has been a buzzword in Computing for years, so converting the decades of research to early quantum computing design was a natural progression. Likewise, even if this model fails in the long run, superconductivity has so many practical applications that any research Google, IBMQ, and others produce will still be extremely useful for future Computer Architecture optimization. 

## Trapped Ion

Trapped Ion quantum computing is likely the most practical model for quantum computing in the following decades, and companies like Quantinuum have been on a tear concerning recent hardware upgrades. Other companies that produce these computers include IonQ and Oxford Ionics. Why is this model particularly good, and what separates it from other options?

Trapped ion quantum computers, in a nutshell, use electric fields to trap ions inside of little "pockets", and then use lasers to manipulate these qubits. The best ions are Group II single-charged ions, in particular, Be-9. If this sounds kinda slow compared to the microwave signal-superconducting method, that's because it is. While sub-one millisecond entanglement is still on the horizon (which people with CS or EE background will know is VERY slow), this model has the best gate fidelity. What this means is that calculations are often accurate, whereas superconducting qubits in general have a major tendency toward errors, restricting their current growth. Benchmarks, such as the IBM-created Quantum Volume metric, seem to prove that at this point, this has allowed trapped-ion quantum computers to outperform superconducting devices by several magnitudes, but it is likely that unless runtimes for basic gates are decreased, this gap will close. 

## Photonics

The Holy Grail of quantum computing would be with photonics. Superconducting and Trapped Ion quantum computers need to be very cold, and thus require a massive amount of energy and infrastructure to perform relatively basic computations. Photonics would not have to be cold, and theoretically, barring one step, could operate at room temperature. We also, like superconducting quantum computers, have a lot of research in the field already, as photonics and fiber optics are nearly synonymous, and photonic computing is already a modern alternative to digital computing (see Lightmatter). Photonics, the manipulation of light particles, or photons, is a well-researched phenomenon that already has deep roots in computing. Companies like Xanadu and, in particular PsiQuantum, have pulled in hundreds of millions of dollars from Silicon Valley investors who think that the most commercially viable model involves photonics. Then why is this model not advancing as quickly as the other two?

Quantum Photonic computing has an interesting history, particularly in the last few years. Xanadu claimed quantum supremacy with their Borealis photonic QC, as Google had with their superconducting QC, but this was later debunked.  Other companies however have started to make advances in the field, and PsiQuantum claims their first QC is on the near-term horizon. The reason this model seems so far behind is due to the apples-and-oranges comparison it features with other models. 

Kind of like comparing analog and digital computing, photonic and non-photonic QCs are vastly different in design. The classic NOT, CNOT, H, and RX, RY, RZ gates that gate-model quantum systems, like the two aforementioned types, do not have direct translations in photonic QC. Photonic QC features a whole new library of gates, and even rebrands qubits as qumodes, which just denies the Bloch Sphere representation of the qubit that everyone else uses for a more analog-looking, translation-based model. This makes more sense to computer architects since it is more similar to digital and analog computing, but it is so wildly different from other forms of quantum computing that it looks foreign to physicists. 

Current photonic computers, like Xanadu's aforementioned Borealis, are promising steps in the right direction, but they're still prohibitively large and currently don't offer many more benefits than the other two models mentioned above. Due to this, they may have a good trajectory when it comes to future success, but currently, there is limited development compared to the other types. 

## Quantum Annealing

The most controversial method so far, and arguably not even a conventional quantum computer, quantum annealers feature some of the most advanced hardware yet and are the most commercially applicable quantum computing backend at the time of this writing. D-Wave, the only relevant quantum annealing company, has had significant success (except on the Stock Exchange) within the industry, and their devices are hosted by various companies and research entities around the world, such as NASA, Mastercard, and Deloitte. 

So what did I mean when I said that it was "controversial" and "not ... a quantum computer?" As opposed to gate-based quantum computers like those hosted at IBMQ or Quantinuum, D-Wave's annealers are very specialized. In a simple sense, they put an initial state into a Hamiltonian, or an Energy function, and perform operations to find the lowest possible energy state at the end of the job. This can be applied broadly to optimization problems in industry, from common tasks such as resource routing to organizational tasks and manufacturing processes. 

While still very useful for many applicable problems, these computers are generally not considered "on the same level" as quantum computers due to their limited-by-design nature. Many of the most famous quantum algorithms, such as Shor's can't be run on quantum annealers, whereas the other three aforementioned models would be able to. However, because they use an "easier" problem-solving method, they have scaled quickly(er) than other QCs. D-Wave has some annealers with 5000 qubits, and they are launching a 7000+ qubit system shortly. Meanwhile, IBMQ and Google have 400 and 50-100 superconducting qubits respectively, but they can still be considered more powerful, given the right problem set. 

In conclusion, quantum computing is a new but growing field, and researchers and engineers are still trying to figure out which form of quantum computers will be the best in the future. These four methods will likely all stay relevant, and even possible that more than one will eventually become practical for valid quantum supremacy claims, separating itself from traditional digital computing in a significant way. 

## References:

https://www.popsci.com/technology/in-photos-journey-to-the-center-of-a-quantum-computer/

https://pennylane.ai/qml/demos/tutorial\_trapped\_ions

https://arxiv.org/pdf/1904.04178.pdf

https://pennylane.ai/qml/demos/tutorial\_photonics\#photonic-quantum-computers

https://quantumzeitgeist.com/differences-between-quantum-annealers-and-gate-based-quantum-computing/
