# Idea Hunt
===========

Post your startup idea on Idea Hunt and get suggestions from the community on how to make it better. Its like Product Hunt...but for Ideas. 

##Overview

Idea Hunt allows budding entrepreneurs to post their startup idea, share the idea's unique URL with their friends and family and enable them to provide helpful feedback before the entrepreneur spends too much time in building the idea

##Motivation

The motivation for this project is to empower budding enrepreneurs to be able to collect helpful feedback from the community for free!


##Built With:

* Node.js
* Express
* MongoDB
* jQuery/AJAX
* Bootstrap

##Installs/Dependencies:

In order to run locally, this app requires the following steps:
* Clone Repo
* Install the necessary node modules (see below for full list)
* Start server

In order to run locally, this app requires the following node modules
* body-parser
* cors
* express
* express-session
* mongoose
* underscore




###Find it here: [http://startupwdi.herokuapp.com/](http://startupwdi.herokuapp.com/)

###Known issues
To reproduce:
User, if logged in, currently is unable to navigate to any of the tabs on the homepage.
* Sign up with a new user
* Try to navigate to any of the tabs

Reason: Its because the ID names for each of the tabs are the same. When the event handler is triggered, currently it finds the first ID match which is on the Logged out state. 

Potential Solution: Change IDs to something unique and add them both to the eventhandler 


--------------------

![ScreenShot](public/images/Screenshot 2015-07-23 16.00.01.png)