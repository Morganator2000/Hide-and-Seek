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
// Create submit button
const submitButton = document.createElement('button');
    submitButton.id = 'submitQuestionsButton';
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    questionsContainer.appendChild(submitButton);

// create back button
const backButton = document.createElement('button');
    backButton.id = 'backButton'
    backButton.textContent = 'Go Back';
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    questionsContainer.appendChild(backButton);

 // Create Save Button
 const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.type = 'button';
    saveButton.textContent = 'Save Questions';
    saveButton.onclick = saveQuestions;
    questionsContainer.appendChild(saveButton);

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

// Displaying the extracted values
const questionsDisplay = questionsData.map(q => `Question: ${q.question}, Type: ${q.type}, Answers: ${q.answers.join(', ')}`).join('\n');
alert(`Beacons: ${beacons}\nSeekers: ${seekers}\n${questionsDisplay}`);
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

    function saveQuestions() {
        // Collect question and answer data
        const questionsData = [];
        const numQuestions = parseInt(document.getElementById('num_beacons').value, 10);
    
        for (let i = 0; i < numQuestions; i++) {
            const question = document.getElementById(`question_${i + 1}`).value;
            const type = document.getElementById(`type_${i + 1}`).value;
            const answers = [];
    
            if (type === 'true_false') {
                const selectedAnswer = document.querySelector(`input[name=answer_${i + 1}]:checked`);
                answers.push(selectedAnswer ? selectedAnswer.value : 'none');
            } else if (type === 'multiple_choice') {
                for (let j = 1; j <= 4; j++) {
                    const optionValue = document.querySelector(`input[name=mc_option_${i + 1}_${j}]`).value;
                    const isCorrectOption = document.querySelector(`input[name=mc_correct_${i + 1}]:checked`);
                    const isCorrect = isCorrectOption && isCorrectOption.value === `option_${j}`;
                    answers.push({ option: optionValue, correct: isCorrect });
                }
            }
    
            questionsData.push({ question, type, answers });
        }
    
        // Convert data to JSON
        const jsonData = JSON.stringify(questionsData, null, 2);
    
        // Create Blob from JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });
    
        // Create a link and trigger download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'questions.json';
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link); // Clean up
        URL.revokeObjectURL(url); // Free up memory
    }
    