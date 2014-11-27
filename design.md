##Design

Our project is designed to run in real time, within a web browser. Further details are below.

####Architectural Design

Like any web based application, there are three parts: the client, the server, and the database. Originally, our stack was painfully complex:

Client: 
- HTML for prototyping (seeing hard coded data, trying designs, etc)
- SCSS for style (compiled to CSS using a Grunt task)
- Bootstrap as a front-end grid framework (for a responsive layout, allowing the site to look good on phones and tablets)
- Backbone (client side rendering, handling models, views, and providing a router)
- Underscore (mostly for templating, using helper functions for rendering)
- jQuery (for easier DOM manipulations)
- PouchDB (part of a framework called "Hoodie", for writing to the browser's localstorage (or the browsers WebSQL on mobile devices, PouchDB is basically just an adapter), was also used for basic state management (is the user signed in, signed out, have they dismissed a notification, etc)

Server:
- Hapi (requests, responses, endpoints)
- Hoodie (adapter for CouchDB)
- a huge amount of modules that were part of Hoodie's framework
- SocketIO (was never even close to successfully implemented in this stack)

Database:
- CouchDB (JSON based document store, HTTP API, uses Map-Reduce for indexes)

Our final stack was much different, and much smaller:

Client, Server:
- Meteor (since Meteor uses WebSockets instead of HTTP, code is shared between the client and server)

Database:
- MongoDB (comes bundled with Meteor)

For a client-server application, our second stack was way easier to work with compared to the first one. having a simpler architecture meant faster development time, build time, and better cross platform development compatibility.

####Modelling Design

In the design of our models, we considered each model as a "collection". The idea is that each collection has its own unique data per item in the collection, and has associated methods. One interesting thing about MongoDB is that it is schemaless, so its very easy to corrupt your data or denormalize it, so each collection has a few methods to handle this (you can see our `check` function in `Meteor.methods({ ... });`. These methods also defined permissions for each collection. For example, here is the code that checks if a user owns a document. This was used to make sure users can only edit their own posts:

```javascript
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
};
```

The data was also pushed to the client using a publish/subscribe system. Once a collection was created, different "views" (basically just different URLS) get associated with different publications and subscriptions. This was basically just done to mkae sure the entire contents of the database don't get pushed to the client. See the implementation section for a more in-depth explanation.

####User-Centered Design and Possible Usage Patterns

Our approach to user-centered design was to make our web application real time. This is by far the best experience for the user, since they got to see what's happening on the site as its happening. This is especially useful in something like a residence management system, where a lot of students would be trying to register for housing around the same time. The students would be able to see which residences were full (or filling up) as it was happening, and would be a lot less likely to try to register for a residence, only to have the page refresh returning an error message. An administrator could also monitor the registraton activity in real time, and could resolve any issues as they arose.

The next use pattern was our messaging system (which was the most fun to program and we ended up spending too much time on). A student, or an administrator could post a message and have it publicly available to read on the site. Anyone could then upvote the message, or comment on it. The post-upvote-comment pattern is by far the most common usage pattern in our application.

####Modeling Interactions and Behaviours

Let's consider two interactions and behaviours:

######A) A student registers for a residence:

1. The student navigates to the residence section.
2. The student browses the residences, taking note of the amenities each room provides.
3. Upon seeing a residence the student likes, they may sign up if there is space available in that residence. If space is not available, the user is shown an error message (NOTE: this is not functioning perfectly in our application, as shown during our demo).
4. The number of available spaces is immediately updated, and is notifies the admin the approval is required.

######B) An admin wishes to delete a public message.

1. The admin signs in as 'admin'.
2. The system grants the user 'admin' all priveleges.
3. The admin navigates to the 'posts' section.
4. The admin clicks the huge 'DELETE' button on that post.
5. The system removes the post from the DOM, the database, and deletes all associated comments.


####User Interface Design

Our user interface design was fairly simple, since the goal was to keep the interface clean, very fast, and adaptable for all screen sizes. Because of these requirements, our layout had to extremely simple. Each post, comment, or residence is layed out as a full width container filled with relevant content. The colour scheme simply follows Lakehead's colour scheme. 

<<<<<<< HEAD
Another thing we considered was the use of visual things like buttons. The primary actions are big bold buttons (see the Vote, Rent, Discuss, and Add Comment buttons). This makes it easier to identify the primary actions.
=======
Another thing we considered was the use of visual things like buttons. The primary actions are big bold buttons (see the Vote, Rent, Discuss, and Add Comment buttons). This makes it easier to identify the primary actions.
>>>>>>> FETCH_HEAD
