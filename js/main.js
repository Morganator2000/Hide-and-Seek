function showQuestionsForm() {
    const numBeacons = document.getElementById('num_beacons').value;
    if (numBeacons && !isNaN(numBeacons) && numBeacons > 0) {
        createQuestionInputs();

        // Hide setup container and show questions container
        document.getElementById('microbitSetup').style.display = 'none';
        document.getElementById('questionsContainer').style.display = 'block';
    } else {
        alert('Please enter the number of Hidden micro:bits.');
    }
}

function createAnswerInputs(parentElement, questionType, questionIndex) {
// Check if there's an existing answersContainer and remove it
const existingAnswersContainer = parentElement.querySelector('.answersContainer');
if (existingAnswersContainer) {
parentElement.removeChild(existingAnswersContainer);
}

const answersContainer = document.createElement('div');
answersContainer.className = 'answersContainer';

if (questionType === "true_false") {
// Create true and false radio buttons
['True', 'False'].forEach(value => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'flex-start';
    div.style.marginBottom = '8px';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = `answer_${questionIndex}`;
    radio.value = value.toLowerCase();
    radio.setAttribute("data-type", "true-false");

    const label = document.createElement('label');
    label.textContent = value;
    label.style.marginLeft = '5px'; // Adjusted this to marginLeft for space after the radio button

    div.appendChild(radio);
    div.appendChild(label);
    answersContainer.appendChild(div);
});

} else if (questionType === "multiple_choice") {
// Create 4 multiple choice options
for (let i = 1; i <= 4; i++) {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'flext-start';
    div.style.marginBottom = '8px';

    const correct = document.createElement('input');
    correct.type = 'radio';
    correct.name = `mc_correct_${questionIndex}`;
    correct.value = `option_${i}`;
    correct.style.marginRight = '4px';  /* Adjust this value as needed */
    
    const correctLabel = document.createElement('label');
    correctLabel.textContent = 'Answer';
    correctLabel.style.marginLeft = '5px'; // Adjusted this to marginLeft for space after the radio button

    const input = document.createElement('input');
    input.type = 'text';
    input.name = `mc_option_${questionIndex}_${i}`;
    input.placeholder = `Option ${i}`;

    div.appendChild(correct);
    div.appendChild(correctLabel);
    div.appendChild(input);
    answersContainer.appendChild(div);
}
}

parentElement.appendChild(answersContainer);
}

function createQuestionInputs() {
const questionsContainer = document.getElementById('questionsContainer');
const numQuestions = parseInt(document.getElementById('num_beacons').value, 10);

// Clear previous inputs
questionsContainer.innerHTML = '';

let pairContainer;
for (let i = 0; i < numQuestions; i++) {
// Every even question (0-based index), we start a new pair container
if (i % 2 === 0) {
    pairContainer = document.createElement('div');
    pairContainer.className = 'question-pair';
    questionsContainer.appendChild(pairContainer);
}

const div = document.createElement('div');
div.className = 'form-group';

    const questionLabel = document.createElement('label');
    questionLabel.htmlFor = `question_${i + 1}`;
    questionLabel.textContent = `Question ${i + 1}:`;
    
    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.id = `question_${i + 1}`;
    questionInput.name = `question_${i + 1}`;
    
    const typeLabel = document.createElement('label');
    typeLabel.htmlFor = `type_${i + 1}`;
    typeLabel.textContent = `Type for Question ${i + 1}:`;

    const typeSelect = document.createElement('select');
    typeSelect.id = `type_${i + 1}`;
    typeSelect.name = `type_${i + 1}`;
    typeSelect.onchange = () => createAnswerInputs(div, typeSelect.value, i + 1);

    const trueFalseOption = document.createElement('option');
    trueFalseOption.value = 'true_false';
    trueFalseOption.textContent = 'True/False';
    
    const multipleChoiceOption = document.createElement('option');
    multipleChoiceOption.value = 'multiple_choice';
    multipleChoiceOption.textContent = 'Multiple Choice';

    typeSelect.appendChild(trueFalseOption);
    typeSelect.appendChild(multipleChoiceOption);

    div.appendChild(questionLabel);
    div.appendChild(questionInput);
    div.appendChild(typeLabel);
    div.appendChild(typeSelect);

    createAnswerInputs(div, 'true_false', i + 1);

    pairContainer.appendChild(div);

}
const submitButton = document.createElement('button');
    submitButton.id = 'submitQuestionsButton';
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    questionsContainer.appendChild(submitButton);

const backButton = document.createElement('button');
    backButton.id = 'backButton'
    backButton.textContent = 'Go Back';
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    questionsContainer.appendChild(backButton);
}

// This function will be triggered when the form is submitted.
document.getElementById('microbitForm').addEventListener('submit', function(event) {
event.preventDefault();

// Extract details from the form
const beacons = document.getElementById('num_beacons').value;
const seekers = document.getElementById('num_seekers').value;

const questionElements = Array.from(document.querySelectorAll('#questionsContainer input[type=text]'));
const questionTypes = Array.from(document.querySelectorAll('#questionsContainer select'));

const questionsData = questionElements.map((question, index) => {
const type = questionTypes[index].value;
const answers = [];

if (type === 'true_false') {
            const selectedAnswer = document.querySelector(`#questionsContainer input[name=answer_${index + 1}]:checked`);
            answers.push(selectedAnswer ? selectedAnswer.value : 'None selected');
        } else if (type === 'multiple_choice') {
            for (let i = 1; i <= 4; i++) {
                const optionValue = document.querySelector(`#questionsContainer input[name=mc_option_${index + 1}_${i}]`).value;
                const isCorrectOption = document.querySelector(`#questionsContainer input[name=mc_correct_${index + 1}]:checked`);
                const isCorrect = isCorrectOption && isCorrectOption.value === `option_${i}` ? true : false;
                answers.push(`${optionValue} (Correct: ${isCorrect})`);

            }
        }

        return {
            question: question.value,
            type,
            answers
        };
    });
    
//Generate Python script
function generatePythonScripts() {

    const numBeacons = document.getElementById('num_beacons').value;
    const numSeekers = document.getElementById('num_seekers').value;

//Loop through the number of beacons and seekers to generate and download Python scripts
for (let i = 1; i <= numBeacons; i++) {
const beaconScript = `# Beacon${i} script content
# Code for when the beacon receives a message from either a seeker or retriever.

def on_received_string(receivedString):
global signal
signal = radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH)
if receivedString == "Homing":
# This is the signal from a retriever. Called if the beacon was lost.
# Boost the power to max (range unknown, but far)
radio.set_transmit_power(7)
# Reply to retriever.
radio.send_string("Here")
# Start blinking to attract attention.
basic.show_leds("""
# # # # #
# # # # #
# # # # #
# # # # #
# # # # #
""")
basic.pause(100)
basic.clear_screen()
basic.pause(100)
elif not (receivedString.includes("Beacon")):
if receivedString == "T":
# The correct answer to this question, assigned by the app.
radio.send_number(1)
basic.show_icon(IconNames.YES)
basic.pause(1000)
basic.clear_screen()
else:
radio.send_number(0)
basic.show_icon(IconNames.NO)
basic.pause(1000)
basic.clear_screen()
radio.on_received_string(on_received_string)

# Listener to send out the ID and question type to a seeker.

def on_received_value(name, value):
if name == "ask" and radio.received_packet(signal) >= signalLimit:
# The type of question (T/F or multi-choice) assigned by application
radio.send_value(questionType, question, beacon_id)
radio.on_received_value(on_received_value)

signal = 0
beacon_id = 0
signalLimit = 0
# The channel for the micro:bits.
radio.set_group(1)
# The weakest radio strength. Range of approximately 25 meters.
radio.set_transmit_power(1)
# This limits the radio strength to about 1 meter
signalLimit = -83
# ID assigned by application
beacon_id = ${i}
questionType = ''
question = ''
# Diplay beacon ID
basic.show_string("B" + str(beacon_id))
basic.pause(500)
basic.clear_screen()

def on_forever():
# Constantly sends out a signal for the seekers to hone-in on.
radio.send_string("Beacon" + str(beacon_id))
basic.pause(200)
basic.forever(on_forever)
            `;
downloadScript(`Beacon${i}.py`, beaconScript);
}




for (let i = 1; i <= numSeekers; i++) {
    const seekerScript = `# Seeker${i} script content
# Code that runs when the seeker receives a number.
def on_received_number(receivedNumber):
global score, isSeeking
if isSeeking == False:
if receivedNumber == 1:
# answer is correct
basic.show_icon(IconNames.YES)
basic.pause(1000)
basic.clear_screen()
score += 1
isSeeking = True
elif receivedNumber == 0:
# answer is incorrect
basic.show_icon(IconNames.NO)
basic.pause(1000)
basic.clear_screen()
isSeeking = True
else:
basic.show_string("Err")
radio.on_received_number(on_received_number)

# Cycle through answers
def on_button_pressed_a():
global answer
basic.clear_screen()
answer = answer - 1
if answer < 0:
answer = len(options) - 1
basic.show_string("" + (options[answer]))
input.on_button_pressed(Button.A, on_button_pressed_a)

# Pressing both buttons either requests the question from the beacon or sends the answer.
def on_button_pressed_ab():
global options
if options[0] == "N/A":
basic.clear_screen()
radio.send_value("ask", seekerId)
else:
radio.send_string("" + (options[answer]))
options = ["N/A"]
input.on_button_pressed(Button.AB, on_button_pressed_ab)

# Seeker is now looking for beacons.
# This is the seeking function. Upon receiving a string from a beacon, LEDs light up.
# Range is approximately 1 meter.
def on_received_string(receivedString):
global signal
signal = radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH)
if isSeeking == True and signal >= signalLimit:
basic.show_leds("""
. # . # .
. # . # .
# . . . #
. # # # .
. . . . .
""")
basic.pause(200)
basic.clear_screen()
radio.on_received_string(on_received_string)

# Cycle through answers
def on_button_pressed_b():
global answer
basic.clear_screen()
answer = answer + 1
if answer >= len(options):
answer = 0
basic.show_string("" + (options[answer]))
input.on_button_pressed(Button.B, on_button_pressed_b)

# Shaking the seeker will reveal the current score.
def on_gesture_shake():
global isSeeking
if isSeeking == True:
# Breifly turns off the seeking function so the score is shown clearly.
isSeeking = False
basic.show_number(score)
basic.pause(1000)
basic.clear_screen()
# Turn signal back on
isSeeking = True
else:
# If the signal was never on, you don't need to turn it back on.
basic.show_number(score)
basic.pause(1000)
basic.clear_screen()
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

# Code for when the seeker receives a "key" (string with a value)
# This covers a lot of things.
def on_received_value(name, value):
global isSeeking, answer, options
if radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH) >= signalLimit and name != "ask":
# Turns off the signal while answering the question.
isSeeking = False
answer = 0
# Value here will be the beacon's ID.
basic.show_string("Q" + str(value))
# The name is used to identify what type of question the user is answering
if name == "T/F":
options = ["T", "F"]
elif name == "M2":
options = ["A", "B"]
elif name == "M3":
options = ["A", "B", "C"]
elif name == "M4":
options = ["A", "B", "C", "D"]
else:
basic.show_string("Err")
basic.show_string("" + (options[0]))
radio.on_received_value(on_received_value)

signal = 0
answer = 0
score = 0
isSeeking = False
signalLimit = 0
options: List[str] = []
seekerId = 0
seekerId = ${i}
# The array for possible answers to a question. Currently nothing.
options = ["N/A"]
# Set channel 1. All micro:bits will use this channel.
radio.set_group(1)
radio.set_transmit_power(1)
# This limits the radio strength to about 1 meter
signalLimit = -83
# Display seeker's id
basic.show_string("S" + ("" + str(seekerId)))
basic.pause(200)
basic.clear_screen()
# Seeker is now looking for beacons.
isSeeking = True
`;
downloadScript(`Seeker${i}.py`, seekerScript);
}
}
//Function to download generated scripts
    function downloadScript(filename, content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
            }
        const submitButton = document.getElementById('submitQuestionsButton');
        submitButton.addEventListener('click', function() {

        generatePythonScripts();
});
});


function downloadRetriever(){
    const link = document.createElement('a');
        link.href = 'microbit/hex_files/microbit-retriever_base.hex';
        link.download = 'retriever.hex';

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);

        alert('Download complete. Transfer "retriever.hex" to the micro:bit by dragging it into the micro:bit\'s files.\n' + 
        'The more LEDs that light up, the closer you are to the lost beacon. Play this game of hot and cold until you find the beacon.');
    }