# Emotional intelligence streakapp

## Answer to question

question: how you would implement a streak reminder push notification system that alerts users when they’re at risk of losing their streak?

answer: I am not familiar with either GCP or Firebase. So i cannot answer those question straight forward.
I would do some spike investigation to figure out the implementation. Show results to the team, discuss or best course of action with them making sure to take in suggestion to people with more indepth knowledge regarding the matter, after geting feedback the next step would then be to rollout a POC. After the POC, the rest will just be polish and refinement of the implementation, taking into consideration how it will handle security & stress testing and the like.

## Initial setup on environment

Go to each project directory folder and installl dependencies

Run command in root directory for api
```
cd streakapp-api // navigate to project
npm install // install dependencies
npm run start // start project localy
```

Run command in root directory for frontend
```
cd streakapp-frontend // navigate to project
npm install // install dependencies
npm run start // start project localy
```

## Start front end

Follow readme inside `streakapp-frontend` project folder
Frontend will run at `http://localhost:3000`

## Start backend

Follow readme inside `streakapp-api` project folder
Backend will run at `http://localhost:8080`
