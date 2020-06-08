# AdCap Clone

## Summary
The objective of this 5 day development challenge was to replicate the basic functionality of Adventure Capitalist, an idle incremental game, using JS-based technologies for both front-end and back-end.

In order to comply with these requirements and ensure the success of the process, I created a Typescript-based, express server, connected to a MongoDB database to ensure data persistence and utilizing Mongoose as an ORM to facilitate operations from and to the database. To complete my full-stack approach to the problem, I bootstrapped a create-react-app using the Typescript template and proceded to design and implement the different components needed for the visual parts of the game.

Early on the challenge, I decided to go with a NoSQL database for this specific problem for two specific reasons: no inherent, important relantionships between data were salient; and the unstructured nature of NoSQL would give me a lot of flexibility to create the appropiate schema of the data, specifically for the different properties of businesses.

I used Typescript in both the front and back, not only because I use it on a daily basis both in and out of my work hours, but because I´ve come to very much like the flexibility that it provides, facilitating early, fast prototyping when types are not as well defined, and enabling developers to ensure production-level quality and robustness when code matures. Few languages, I feel, can perform both roles as well.

As for using React, even though I tried to justify to myself utilizing vanilla JS-HTML-CSS for the UI (maybe as an extra effort of showing good fundamentals), ever since I started analizing the problem and playing the game, the way components are easily created and connected through it felt perfect for completing the UI in as short a time as possible, as my main focus was on polishing the back-end (where I wanted to use OOP and enforce SOLID principles). Also, I had never used Hooks before, so it sounded like fun.
