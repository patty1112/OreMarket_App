
TEAM MEMBERS:
	CAMRYN ELLIOT
	PATRICK MAES
	BUMSOO KIM



1) Were there areas of unexpected complexity? If so, how did you handle them or how did you decide to cut scope?
	One area of unexpected complexity was tracking state for login and the current user. When using useState alone,
	the state would refresh whenever the route changed. To solve this, we used the localStorage instead of cookies,
	since the client needs the state and not the server.

2) What was the most interesting part of the final project?
	The most interesting part of the final project was creating the backend and frontend routes, since we had a 
	lot of freedom and considerations for the structure of the project. We decided to keep the routes in their own
	files in both the frontend and backend for each object type in the database. The login and signup was also newer
	to us, so it was interesting to look at how to conditionally render items on the page based on state.

3) If you had more time, what do you wish you could have added to the final project?
	We definetly wish we could have added authentication and encryption to the final version.
	This would have required the use of HTTPS for secure data transmission, the use of an encryption
	algorithm to secure user information in the database, and the removal of user information from the 
	frontend using something like tokens. The process of encryption would have required the backend
	to encrypt a request's password and compare it to the stored password for that user. It would have 
	also needed to factor in username somehow to avoid identical passwords being mapped to the same hash.


