**Welcome to micro:bit hide-and-seek quick-start guide:**

1. Double-click index.html. It will open in your default browser. If it doesn't, right click and choose to "Open with..." and then choose something like Firefox, Chrome, Edge, etc.
2. Enter the number of seeking micro:bits that will serve as "seekers" (the ones the students will use to find the beacons).
3. Enter the number of hidden micro:bits that will serve as "beacons" (the ones the students will search for).
4. Start entering the questions and their possible answers. You are allowed to include true/false questions and multiple choice questions with up to 4 options. Be sure to use the checkbox to indicate which option is the correct answer to the question.
5. Click "Submit". The required hexfiles will be send to your "Downloads" folder.
6. Plug in a micro:bit and drag-and-drop one of the hexfiles into it. Each micro:bit can only hold one hexfile at a time. If the download suceeds you'll see either "S#" or "B#" on the screen, where "#" is the number for that beacon/seeker.
7. Plug the battery boxes into the beacons. Turn them on if there is a switch on the battery box. Hide the beacons wherever you like. They should be at least 3 meters apart. While the players will not need to touch the beacons, they will need to be able to get within 1 meter of the beacons, so be careful when placing them in elevated positions.
8. Plug the power boxes into the seekers. Distribute the seekers among the players or groups of players.
9. Let the game begin!

**Using the Seekers.**
1. Press the button on the back of the micro:bit to turn them on and reset them. If there is a switch on the battery pack, turn that on. DO NOT turn the seeker off for the rest of the game.
2. Use the clues to track down the hidden beacons. When you are close, a [symbol] will appear on the screen.
3. Press both buttons to receive the question. It will appear on your seeker.
4. Scroll to the correct answer using the A and B buttons. Press both buttons to choose that as the correct answer.
5. You will see a checkmark if you got the question correct and an X if you got it incorrect.
6. Repeat from step 2 until you have found all the beacons. Return to your instructor when finished.
7. At any time you can shake the micro:bit to see how many questions you have answered correctly.

**Losing a Beacon:**
In the event that you lose a beacon, plug in any other micro:bit and upload the "retriever" hex file to it. It will automatically call out to any lost beacons. Then it's a game of "hot and cold" to find the lost micro:bit. The more LEDs that light up, the closer you are.

**Setting up the game from MakeCode**
1. Make your own question sheet in Word. Make sure all questions are either true/false or multiple choice with two, three, or four possible answers. Make as many questions as you have beacons. Keep in mind that you need at least 1 micro:bit to be the seeker. Print this sheet out when you’re done.  
2. Go to https://makecode.microbit.org/ and make an account. Or you can use your Algonquin account. On the main page you’ll see an “import” button. Click it. 
3. Import “microbit-beacon_main.hex” from the microbit/hex_files directory of the project. You should see the MakeCode editor appear. Find the “on start” function. 
4. There are 3 things you need to edit in each beacon. 

    a. “beacon_id” should be the question number. Each beacon will have a unique ID. 
    b. “question_type” needs to be “T/F” for a true/false question or “M2”, “M3”, or “M4” for a multiple choice question. The number denotes how many options there will be. 
    c. “answer” is the letter for the correct answer. It will only be “T”, “F”, “A”, “B”, “C”, or “D”. 
    d. After changing these 3 variables click Download in the lower left corner. Repeat steps a through d for each question on your sheet. 

5. Import “microbit-seeker_main”. For the seekers, the only thing you need to change is seekerId. Each seeker needs a unique ID. 
6. All of the required files should be in your downloads folder. You can now plug in a micro:bit and copy/paste one of the hex files. Then eject and unplug it. Repeat until all seekers and beacons are loaded up. 
7. In the event that you get an uploading error, a sad face will show on the micro:bit, followed by an error code. Likely 541. Go into debugging.txt and try the solution in there. 
8. Your game is now set up! 