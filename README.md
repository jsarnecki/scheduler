# Interview Scheduler

Interview Scheduler is a single-page application designed for allowing a student book an interview with a mentor.  Users are able to book on anyday of the working week between noon and 5pm.  

## Final Product

*screen shots*

## Dependancies

-Storybook
-Jest
-Cypress
-Axios
-@testing-library/react-hooks
-React-test-renderer
-Babel

## Getting Started

-Install all dependancies.
-Run `npm start` to load the development server.
-Make sure the scheduler-api is also concurrently running to run the live psql database.
-The development server should open up your browser and bring you to localhost:8000.
-You are now able to start scheduling!
-On the left navigation bar you can click on any day you wish to schedule.  Each day will show a live count of how many spots are available to be scheduled.
-You can click on any of the add buttons at the center of the empty blocks to fill in your name, and click on an interviewer's avatar available for that day.
-Upon clicking save, the spot will book.  You have the option of deleting or editing the booked spot.  If you click delete, a confirmation block will pop up to confirm this action.  