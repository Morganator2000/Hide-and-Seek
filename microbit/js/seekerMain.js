radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        basic.showIcon(IconNames.Yes)
        basic.pause(1000)
        basic.clearScreen()
        score += 1
        isSeeking = 1
    } else if (receivedNumber == 0) {
        basic.showIcon(IconNames.No)
        basic.pause(1000)
        basic.clearScreen()
        isSeeking = 1
    } else {
        basic.showString("Err")
    }
})
input.onButtonPressed(Button.A, function () {
    answer = answer - 1
    if (answer < 0) {
        answer = options.length - 1
    }
    basic.showString("" + (options[answer]))
})
input.onButtonPressed(Button.AB, function () {
    if (options[0] == "N/A") {
        basic.clearScreen()
        radio.sendValue("ask", seekerId)
    } else {
        radio.sendString("" + (options[answer]))
        options = ["N/A"]
    }
})
radio.onReceivedString(function (receivedString) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (isSeeking == 1 && signal > -70) {
        led.plotBarGraph(
        Math.map(signal, -70, -42, 0, 9),
        9
        )
    }
})
input.onButtonPressed(Button.B, function () {
    answer = answer + 1
    if (answer >= options.length) {
        answer = 0
    }
    basic.showString("" + (options[answer]))
})
input.onGesture(Gesture.Shake, function () {
    if (isSeeking == 1) {
        isSeeking = 0
        basic.showNumber(score)
        basic.pause(1000)
        basic.clearScreen()
        isSeeking = 1
    } else {
        basic.showNumber(score)
        basic.pause(1000)
        basic.clearScreen()
    }
})
radio.onReceivedValue(function (name, value) {
    if (radio.receivedPacket(RadioPacketProperty.SignalStrength) > -70) {
        isSeeking = 0
        answer = 0
        basic.showString("Q" + value)
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
let signal = 0
let answer = 0
let options: string[] = []
let score = 0
let isSeeking = 0
let seekerId = 0
radio.setGroup(1)
seekerId = 1
isSeeking = 0
score = 0
options = ["N/A"]
basic.showString("S" + ("" + seekerId))
basic.pause(200)
basic.clearScreen()
isSeeking = 1
