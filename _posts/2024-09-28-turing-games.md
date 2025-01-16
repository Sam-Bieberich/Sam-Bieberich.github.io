---
layout: post
title: The World of Turing Complete Video Games
---

{{ page.title }}
================

<p class="meta">28 Sep 2024</p>

Funny enough, video games are one of the most expansive applications of the trinitarian relationship between physics, mathematics, and computer science. Ever since the first games, such as Pong, physics and mathematics have been a critical part of video games. It is cool to see inside of these mechanics when playing games, as it allows for greater respect for both the game design and computer science fields. 

On the last day of March in 1999, The Matrix hit theatres, introducing a new genre of science-fiction into the movie industry. In the movie, the protagonist Neo learns that he is living the "The Matrix," a computer simulation designed to keep humans content while robots harvest their energy. If you are wondering what this has to do with anything, wait a second! During the latter part of the film, Neo is converted from a naive victim to a "true believer," and it is revealed he is a messianic character who can see the inside of the Matrix code. During one infamous scene, Neo looks across a hallway and sees everything: the walls, people, floor, as binary code. Scrolling green text reveals definitively that he is not only living in a simulation but the master of it as well. It is this feeling that video games can evoke for people with CS knowledge. 

Looking at video games in general, like other parts of the Entertainment industry, they are designed to attract audiences to various pleasures, be it "winning" against other players or watching numbers go up, while occasionally encouraging them to shell out some money to keep the developers' heat running (and their boss's jacuzzi on). While this is a very simplified definition, it can be modified to meet the goals of most of the world's most popular games. Minecraft, the world's best-selling video game, promotes goals of survival and creativity. Leaving these two open-ended ideas allows for endless replayability. Likewise, Pokemon, the world's most valuable IP, boasts a series of games with the goal of "catching them all" and beating other computer-controlled players. It can be hard to see inside of the Matrix in these and other games, as they have perceivable, non-educational goals, ultimately designed to sell something to fellow people around the world. 

However, video games can be a lot deeper than this. Unless you are playing Cookie Clicker or something with actually no value (I can't blame you it's fun), many games, be they video games or tangible games, can simulate the same binary operations that a computer does. You may be thinking, "Of course, all you need is a light switch to perform yes and no binary operations." However, while computers are in essence just billions of switches, their ability to perform logical operations (AND, OR, NOT) is even more important. It is probably at this point we should go back to what a computer and a Turing machine even is.

As stated in one of my previous articles, a Turing machine, named after the theory by Alan Turing, the most famous Computer Scientist of the twentieth century, is composed of an infinite strip of "tape" split into equal-sized cells upon which symbols can be written and read. The machine itself involves three components: 

- The infinitely long tape that stores the inputs, outputs, and calculations you made in between. 
- A tape reader, also called a tape head, reads the cells one at a time and either does nothing or writes over them. 
- A program or instruction set that the machine can convert from symbols to actions performed by the other parts of the machine. 

This definition is fairly broad in our modern world, encompassing many seemingly inconspicuous programs, such as Microsoft Excel, almost any programming language, and creative products (with a smart program by users) such as Lego or K’Nex. The main point of contention revolves around the fact that there cannot be a conceivably “infinitely long tape,” but realistically, Turing Completeness doesn’t require truly infinite inputs. Turing Completeness is often used to describe the ability to compute any programmed computation (theoretically), and while it seems trivial at the time, this was not always the case. When Turing wrote his papers in the 1930s, it was formal to make a machine to do one specific task, such as the early artillery calculators or ocean tide predictors. 

In modern computer science, the term Turing Completeness also can be used to describe the ability of two computers approximately simulate any other computer. A common example would be an emulator, which allows for one computer to behave like another. Some programs, like Bluestacks, emulate Android devices, allowing for the use of Android apps on other computers, like a Chromebook or Mac. This makes the previous concepts discussed above even more intriguing. For example, if Microsoft Excel is Turing Complete by definition, a program on an iPhone, say watching a basic video, can be emulated by it. This is why users often use a relatively trivial basis to help prove Turing Completeness, like running Doom on a TI-84 or playing the Bad Apple video on a Commodore 64. As long as your “programming language” possesses the qualities above and an ability to perform basic conditionals, the world is your oyster. 

So, what stops us from utilizing the impressive capabilities of Turing Complete video games, such as Terraria or Minecraft, from actually performing meaningful computations? The main leg up that traditional computers have (as well as actual programming languages like C or Python), is clock speed. In a game like Minecraft, which is itself running on a computer, the visuals require significant amounts of data to render, limiting the game’s “Redstone” circuitry mechanic to running at an abysmally slow clock speed. While a modern processor may be in the GigaHertz scale, Minecraft is well short of 1000 Hz, a magnitude of several million times slower. Other games are even worse, like Dwarf Fortress, where the clock is on the scale of close to 1 Hz in some basic computers, or Civilization VI, which is not even on the Hz scale. 

In part, this article was inspired by a video on YouTube, as well as a well-maintained GitHub repo, by Xander Naumenko (From Scratch on YT). Check out his video if you want to learn more about the process of computation inside of a video game, I was personally unfamiliar with the mechanics of the game, however, it was valuable and well presented nonetheless. 

---

**References:**

- [What is Turing Complete? - Bitstamp](https://www.bitstamp.net/learn/blockchain/what-is-turing-complete/)
- [Turing Machines - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/turing-machine/)