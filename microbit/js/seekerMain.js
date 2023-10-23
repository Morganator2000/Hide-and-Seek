//Startup sequence
let signal = 0
let answer = 0 //This is the position in the array when answering a question.
let score = 0 //Players score. Will increase with a correct answer.
let isSeeking = false //on startup, the seeker is not looking for beacons. This will quickly change.
let seekerId = 0 //Assigned by application
let options: string[] = [] //Your IDE is probably flagging an error here. Don't worry about it.
options = ["N/A"] //The array for possible answers to a question. Currently nothing.
radio.setGroup(1) //Set channel 1. All micro:bits will use this channel.
basic.showString("S" + ("" + seekerId)) //Display seeker's id
basic.pause(200)
basic.clearScreen()
isSeeking = true //Seeker is now looking for beacons.

//This is the seeking function. Upon receiving a string from a beacon, LEDs light up.
//Range is approximately 1 meter.
radio.onReceivedString(function (receivedString) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (isSeeking == true && signal > -70) {
        led.plotBarGraph(
        Math.map(signal, -70, -42, 0, 9),
        9
        )
    }
})

//These two listeners cycle through answers
input.onButtonPressed(Button.A, function () {
    answer = answer - 1
    if (answer < 0) {
        answer = options.length - 1
    }
    basic.showString("" + (options[answer]))
})
input.onButtonPressed(Button.B, function () {
    answer = answer + 1
    if (answer >= options.length) {
        answer = 0
    }
    basic.showString("" + (options[answer]))
})

//Pressing both buttons either requests the question from the beacon or sends the answer.
input.onButtonPressed(Button.AB, function () {
    if (options[0] == "N/A") {
        basic.clearScreen()
        radio.sendValue("ask", seekerId)
    } else {
        radio.sendString("" + (options[answer]))
        options = ["N/A"]
    }
})

//Code for when the seeker receives a "key" (string with a value)
//This covers a lot of things.
radio.onReceivedValue(function (name, value) {
    if (radio.receivedPacket(RadioPacketProperty.SignalStrength) > -70) {
        isSeeking = false //Turns off the signal while answering the question.
        answer = 0
        basic.showString("Q" + value) //Value here will be the beacon's ID. 
        //The name is used to identify what type of question the user is answering
        if (name == "T/F") {
            options = ["T", "F"]
        } else if (name == "M3") {
            options = ["A", "B", "C"]
        } else if (name == "M4") {
            options = [
            "A",
            "B",
            "C",
            "D"
            ]
        } else if (name == "M5") {
            options = [
            "A",
            "B",
            "C",
            "D",
            "E"
            ]
        } else {
            basic.showString("Err")
        }
        basic.showString("" + (options[0]))
    }
})

//Code that runs when the seeker receives a number.
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) { //answer is correct
        basic.showIcon(IconNames.Yes)
        basic.pause(1000)
        basic.clearScreen()
        score += 1
        isSeeking = true
    } else if (receivedNumber == 0) { //answer is incorrect
        basic.showIcon(IconNames.No)
        basic.pause(1000)
        basic.clearScreen()
        isSeeking = true
    } else {
        basic.showString("Err")
    }
})

//Shaking the seeker will reveal the current score.
input.onGesture(Gesture.Shake, function () {
    if (isSeeking == true) {
        isSeeking = false //Breifly turns off the seeking function so the score is shown clearly.
        basic.showNumber(score)
        basic.pause(1000)
        basic.clearScreen()
        isSeeking = true //Turn signal back on
    } else { //If the signal was never on, you don't need to turn it back on.
        basic.showNumber(score)
        basic.pause(1000)
        basic.clearScreen()
    }
})
