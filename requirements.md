Domain Analysis

Introduction

The project is to create a residence management system.  The residence management system is for the Lakehead University Thunder Bay Campus and is for three main residence types; residence halls, apartments and townhouses.  The project will include social support to residents.  Rooms in the residence hall will have double, basic single or single in size and each will come with a meal plan.  The rooms in the apartments and townhouses are only for upper year students.  A manager will have access to student’s accommodations, information on accommodations and be able to post notifications for residents.  A resident will access to housing information and apply for housing.  The resident can also use a commenting system as a way to report repairs, make notifications to others and to provide feedback to the manager.

Glossary

LURMS – Lakehead University Residential Management System

General knowledge about the domain

We looked at other reservation systems, like video rental, library and other reservation systems.  Our project would be similar to those systems in theory.  We would need a user that can reserve by asking a manager for permission first before a reservation can be made.  Since, our users will need to pay for their rooms, we will need accurate personal information from the user.  The project will also need adequate security for the payment process.

Customers and users

In this project, our users will be future students requiring housing, current students wanting continuing housing, and a manager to look after the students.  The manager will need to be trained in using the reservation system because of the complexity needed to be the manager.  The users will not need training to use the reservation system.

The environment

The reservation system will work on any computer or device connected to the internet.

Tasks and procedures currently performed

The procedures needed by a reservation system are a secure login system, an information system, a payment system, a way to register, a commenting system and a way to manage users.

Competing software

There are other reservation programs out there for housing.  Since this is only a smaller reservation system, a smaller reservation system can work for this type of reservation system.  Planyo and OnRes are two examples of reservation software that can easily configured to mimic the client needs.

Similarities across domains and organizations

In each reservation system, the user needs to reserve something.  Often a manager is needed to approve reservations.  Other reservation system do not require a manager for approval before a reservation is made.  Some reservation systems need a payment system, but other systems may not.


Requirements Gathering


Functionality

Our reservation system will need to be able to make a reservation for a room at the Lakehead University.  The system will allow the user to pay by keying in information.  The user will be created in a database.  The user will be able to leave comments on a comment system to make repair requests, to ask the manager a question or many other uses a comment system can have.  The manager will be able to manage the system of users.  The manager will be able to manage the comment system and will be able to notify using the comment system.  The system will be secure.

Observation

I talked to some of the students that live in the residence about the procedure required to get a room at Lakehead University.  They said it wasn’t easy to navigate and had a hard time with the current reservation system.  They described the process.  The process was complicated and not very clear on what to do next.  However, the system did work.  The system took the students information, made a reservation and allowed the manager to approve the reservation.  The system was not user friendly, but database friendly.  Our system will need to be more user friendly and database friendly.

Requirement Analysis

Functional

A manager should assign accommodations to students using this system.  A manager should easily find out info for each room of the residence, such as what kind of devices are provided in the room, who is living in each room and the duration, etc.  The manager can also post notifications, advertise activities, etc.

Quality

The quality of the system should be good.  A well put together system that allows full functionality with ease of use.  This will allow a user friendly design and ultimately a good user experience.  The system must have usability regardless of screen size and have accessibility for screen readers and other devices.  The system’s database must have fast queries and load times.  The system must have bug free.

Platform

Based on the requirements, the ideal platform for the client is the web. It is cross-platform (browsers work the same on Linux, Mac and PC, the software can be run on mobile devices through their web browsers or through an app containing an embedded implementation of a web browser (like WebKit).  For the server and database, the platform will be Ubuntu 14.04, with either Apache or Nginx for a component of the server, Node.js for the other component of the server, and (tentatively) CouchDB as the database.  This simply because Ubuntu 14.04 is available on a very cheap hosting plan, and is the most familiar with us. CouchDB was chosen because of its HTTP API and functionality with Hood.ie (part of our client-side stack).  Node.js was chosen because of its open source software ecosystem, ease of implementation, and familiarity with members of our team (if you know C, JavaScript is easy to learn).  More specifically, on the front-end we will be using a few tools.  The first two are NPM and Bower, which are simply package managers used to for dealing with dependencies in our project.  Another tool is Grunt, which is a JavaScript task runner.  This is used to run tests, compile files, etc.  Framework-wise, we're using Hood.ie, a front end tool for making web applications super simple.  For our style sheets, we'll be using SASS with Compass to speed things up nicely, and to take advantage of mixins (this'll help with rapid prototyping and Agile development). As of right now, we're undecided about whether or not to use a client side MVC like Ember or Angular, and plan to look into this further.

Requirement Reviewing

Problem

The first version of our project was missing a nice API that was user friendly.

Background information

The group reviewed the requirements gathering section focusing on the observation section.  The student that we asked said that current reservation system was missing a good API that was user friendly.  We assumed that the user friendly API had to be fast and powerful.  Since, the users were already used to the Lakehead University website, we could imitate the look of the Lakehead website to make the API more user friendly.  This should lead to an almost seamless transition from the Lakehead website to our LURMS visually.  Almost like D2L does for students and teachers.

Environment and system models

LURMS is a browser based system.  The user will connect through their favourite browser to our system.  The hardware needed is the same hardware needed to run a browser, very common.  The internet is also needed to connect to this system.  Since, mobile devices have browsers and internet, a mobile device will work on this system as well.

Functional requirements

The new API is easy to use and yet will contain a comment system.  This comment system will allow the users to make repair request and other such requests.  The new API will also have an easy to use login system.  Creating a new user is very easy.

Quality, platform and process requirements

The quality must be better than it used to be.  The API will need to look a certain way but can be accomplished using a new platform.  The new platform is called Meteor.  A switch from hoodie to Meteor was needed to accomplish the new comment system while still keeping the API the same.  The new API looks amazing and will work well.  The process will be the same by finishing the project.

