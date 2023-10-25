// Code that runs when the seeker receives a number.
radio.onReceivedNumber(function (receivedNumber) {
    if (isSeeking == false) {
        if (receivedNumber == 1) {
            // answer is correct
            basic.showIcon(IconNames.Yes)
            basic.pause(1000)
            basic.clearScreen()
            score += 1
            isSeeking = true
        } else if (receivedNumber == 0) {
            // answer is incorrect
            basic.showIcon(IconNames.No)
            basic.pause(1000)
            basic.clearScreen()
            isSeeking = true
        } else {
            basic.showString("Err")
        }
    }
})
// Cycle through answers
input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    answer = answer - 1
    if (answer < 0) {
        answer = options.length - 1
    }
    basic.showString("" + (options[answer]))
})
// Pressing both buttons either requests the question from the beacon or sends the answer.
input.onButtonPressed(Button.AB, function () {
    if (options[0] == "N/A") {
        basic.clearScreen()
        radio.sendValue("ask", seekerId)
    } else {
        radio.sendString("" + (options[answer]))
        options = ["N/A"]
    }
})
// Seeker is now looking for beacons.
// This is the seeking function. Upon receiving a string from a beacon, LEDs light up.
// Range is approximately 1 meter.
radio.onReceivedString(function (receivedString) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (isSeeking == true && signal >= signalLimit) {
        led.plotBarGraph(
        Math.map(signal, -80, -42, 0, 9),
        9
        )
    }
})
// Cycle through answers
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    answer = answer + 1
    if (answer >= options.length) {
        answer = 0
    }
    basic.showString("" + (options[answer]))
})
// Shaking the seeker will reveal the current score.
input.onGesture(Gesture.Shake, function () {
    if (isSeeking == true) {
        // Breifly turns off the seeking function so the score is shown clearly.
        isSeeking = false
        basic.showNumber(score)
        basic.pause(1000)
        basic.clearScreen()
        // Turn signal back on
        isSeeking = true
    } else {
        // If the signal was never on, you don't need to turn it back on.
        basic.showNumber(score)
        basic.pause(1000)
        basic.clearScreen()
    }
})
// Code for when the seeker receives a "key" (string with a value)
// This covers a lot of things.
radio.onReceivedValue(function (name, value) {
    if (radio.receivedPacket(RadioPacketProperty.SignalStrength) >= signalLimit && name != "ask") {
        // Turns off the signal while answering the question.
        isSeeking = false
        answer = 0
        // Value here will be the beacon's ID.
        basic.showString("Q" + value)
        // The name is used to identify what type of question the user is answering
        if (name == "T/F") {
            options = ["T", "F"]
        } else if (name == "M2") {
            options = ["A", "B"]
        } else if (name == "M3") {
            options = ["A", "B", "C"]
        } else if (name == "M4") {
            options = [
            "A",
            "B",
            "C",
            "D"
            ]
        } else {
            basic.showString("Err")
        }
        basic.showString("" + (options[0]))
    }
})
let signal = 0
// This is the position in the array when answering a question.
let answer = 0
// Players score. Will increase with a correct answer.
let score = 0
// On startup, the seeker is not looking for beacons. This will quickly change.
let isSeeking = false
let signalLimit = 0
let options: string[] = []
// Assigned by application
let seekerId = 0
seekerId = 1
// The array for possible answers to a question. Currently nothing.
options = ["N/A"]
// Set channel 1. All micro:bits will use this channel.
radio.setGroup(1)
radio.setTransmitPower(1)
// This limits the radio strength to about 1 meter
signalLimit = -83
// Display seeker's id
basic.showString("S" + ("" + seekerId))
basic.pause(200)
basic.clearScreen()
// Seeker is now looking for beacons.
isSeeking = true
