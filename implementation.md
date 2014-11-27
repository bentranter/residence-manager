##Implementation

####First Attempt: A Failure

The first version of our software was so painfully complicated that we couldn't get it to run succesfully in a Windows environment, and coudln't get a successful deployment at all. Windows had issues with the install script and conflicts with the package managers used (we used NPM and Bower). This limited development to Macs and Linux machines, which wasn't ideal for a group where 4/5 users owned Windows machines. 

The first deployment was an awful failure. Our database queries were so slow that it sometimes took more than a minute and a half for the round trip from the client to the server to database and back. Obviously, that wasn't acceptable amount of time for an application that was supposed to be real time. We considered some options, like ditching Hoodie, using Sock.js instead of Socket.io, ditching Hapi for Restify (to write a faster REST API and have next to no server functionality), and to use Redis or Memcache instead of CouchDB (since they're supposed to have ridiculously fast reads and writes). Realizing we needed to leverage WebSockets (and rely on them almost entirely), we looked for a framework with good WebSocket support built in. This is how we found Meteor.

####Second Attempt: A Surprising Success

We were able to get our application rebuilt to the point where it was in our first demo using Meteor in (honestly) about three hours. From there, it was simple to expand the application to where it is now. Despite a few security bugs, our application is actually fairly stable: it didn't crash during our demo, our user system is very secure (bcrypt and different hashing and salting algorithms are built into Meteor - you could never get a user's password in plaintext). Deployment was amazingly easy with Meteor: we simply ran a deployment command and pushed our app to Meteors development server (see: residence-manager.meteor.com).

####Development Details

Our code is divided into three parts: our client, our lib, and our server. In the client directory, the code only runs in the client's browser. Here we put our templates, our stylesheet, and our client-side JavaScript. In the lib directory, we put the code that was shared between the client and the server. This was stuff like our collections, our shared methods, our permissions, and the router. In the server directory, our fixture data (data used to test databse connectivity, and to fill our application with some data for general testing) and our publications (the data from the database sent to the client based on what the router was asking for). There is also a hidden directory `.meteor`which contains all the library code from the framework.

######Client

The client is pretty simple. Its just a bunch of templates (using a templating engine called 'Spacebars'), along with some JavaScript helper code. The JavaScript is almost exclusively for event handling, like when a user clicks "Discuss", they should be brought to that discussion page. There was some helpers that allowed Spacebars to render the templates a bunch of times to make the list of posts, lists of comments, and list of residences. There is also a CSS file that defines the styles for our application. Although its almost 1500 lines long, it isn't actually doing much more than defining a bunch of different styles and defining how the page should look on desktop screens and mobile devices.


######Lib

Lib has a folder called 'Collections'. Collections are used to create the data models. Some collections also have colection specific code that serve as helper functions, to do things like validations and throw errors.

The other two files are 'permissions' and 'router'. Permissions contains literally one function, and that checks if a user owns a document. The router is actually a beast of a file, since it defines our views, our routes, and acts as a controller. It basically tells the app what data to show when. The router is probably the most important code in our app.

######Server

The server just has two files: 'fixtures' and 'publications'. Both of these have already been mentioned, and basically just serve as helpers to the router.

####Testing

Our tests could have been a lot better. We basically performed tests by coming up with a use case that might result in unwanted behaviour, running the app, and then seeing if that behavour occured. In retrospect, we should have done two types of test:

1. Unit Tests - Unit testing would've ensured all our helper functions executed successfully. For example, we should've wrote a test for our function that was supposed to prevent more than four users from resgitering for the same residence. None of us actually really know how to write unit tests properly for a full stack application, so this got neglected.
2. Load Tests - Even though our application didn't experience failure during the demo, we had no way of knowing whether or not it was going to work during the demo with 15 users all online at the same time. Three things could've easuly gone wrong, that we should've tested for:
    1. Memory Leaks - with a stateful application like ours, the browser remains open and doesn't reload the page as events occur. It woudld've been very easy to crash the browser with some bad code that, getting excuted many times, would leak so much memory that the browser would eventually crash.
    2. Race Conditions - again with regards to statefulness, race conditions could've easily occured in our application since it's 'realtime'. Since there is some latency, a ton of problems coudld've occured because of that. We actually discovered one on the day of presenting: if you attempt to make a comment, press "Add Comment" and then press "Add Comment" again very very quickly, your comment is posted twice. This is because the browser can't parse the existing comment out of the input field faster than the event can be sent to the server.
    3. Stress - with WebSockets, each conection consumes significantly more RAM from the server than an HTTP request does. We had no idea how much stress our server could handle before running out of memory and crashing! We really should've tested for this.

####Afterthoughts

One interesting problem we would've had if our application was larger was the intial load time. While our app does feel very fast once its loaded, the inital load time can be long. The problem is that there is no server side rendring in our app, so during the intial load, the following happens:

1. The client makes one (the only in our app) HTTP request, and receives a payload containing our CSS (which it has to parse), our JavaScript (which it has to interpret and execute), and our templates.
2. The client opens a WebSocket connection to our server.
3. The client waits for the data to come from the server, and the populates our templates with the necessary data.
4. Finally, the client renders the templates and we see the entire app ready to use.

With a lot of CSS, templates, data, and JavaScript, this could take a long time! Especially since JavaScript isn't know for being a fast language. What I wish we would've done instead, is this:

1. The client makes an HTTP request.
2. The server renders the template based on the current route, and sends that. No data, no templates, just a rendered HTML page.
3. From here, steps 2 - 4 happen from the list above.

This would cause much faster initial load times, without sacrificing any sense of speed from the app (since the user would be reading the page while the client is doing the rendering and WebSocket connection stuff in the background - this can be done with HTML5 PushState). The only disadvantage is more complexity for the programmers.
