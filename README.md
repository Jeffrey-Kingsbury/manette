# Manette
## Final Project for Concordia Bootcamp by Jeffrey Kingsbury

Manette is a bug tracking application designed for the quality assurance domain.
#
### Getting started:

##### __* * *Please note this will require two terminals to function properly.*__

## Starting the server:
* Open a new terminal.
* Navigate to the server folder with ```cd server``` from the root.
* Install the dependencies with ```yarn install``` or ```npm install```.
* Start the server with ```yarn dev:server```.

## Starting the client:
* Open a new terminal. (Ensure the server remains running)
* Navigate to the client folder with ```cd client``` from the root.
* Install the dependencies with ```yarn install``` or ```npm install```.
* Start the server with ```yarn dev:client```.

#
## Users will be able to:
* Create tickets 
* Edit tickets
* Search
* Upload media (Images / video / .dmp / txt) 
* Assign tickets
* Create user roles with different permissions
* Create simple profiles with avatars
* Login / logout
* Recover passwords via email
* Create new projects with different permission levels (public / private)

#
## Stretch goals: 
* 2FA 
* Custom themes
* Greater details in profiles
* Adding comments to tickets
* Tagging users in comments
* Notifications
* Progress tracking and analytics
* Exporting individual ticket or whole project datas to CSV or PDF
* Custom severities 
* Custom componenets (ex: UI/UX, Frontend, Backend) when creating tickets

#
# Tech used:
#### Frontend
* React
* React styled componenets
* React icons
* Images from Unsplash

#### Backend
* Express
* Bcrypt
* Body-parser
* Cookie-Parser
* Multer
* NodemMailer
* UUID
* JsonWebToken


