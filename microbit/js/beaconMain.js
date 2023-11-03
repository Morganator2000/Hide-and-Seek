// Code for when the beacon receives a message from either a seeker or retriever.
radio.onReceivedString(function (receivedString) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (receivedString == "Homing") {
        // This is the signal from a retriever. Called if the beacon was lost.
        // Boost the power to max (range unknown, but far)
        radio.setTransmitPower(7)
        // Reply to retriever.
        radio.sendString("Here")
        // Start blinking to attract attention.
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        basic.pause(100)
        basic.clearScreen()
        basic.pause(100)
    } else if (!(receivedString.includes("Beacon"))) {
        if (receivedString == "T") {
            // The correct answer to this question, assigned by the app.
            radio.sendNumber(1)
            basic.showIcon(IconNames.Yes)
            basic.pause(1000)
            basic.clearScreen()
        } else {
            radio.sendNumber(0)
            basic.showIcon(IconNames.No)
            basic.pause(1000)
            basic.clearScreen()
        }
    }
})
// Listener to send out the ID and question type to a seeker.
radio.onReceivedValue(function (name, value) {
    if (name == "ask" && radio.receivedPacket(signal) >= signalLimit) {
        // The type of question (T/F or multi-choice) assigned by application
        radio.sendValue("T/F", beacon_id)
    }
})
let signal = 0
let beacon_id = 0
let signalLimit = 0
// The channel for the micro:bits.
radio.setGroup(1)
// The weakest radio strength. Range of approximately 25 meters.
radio.setTransmitPower(1)
// This limits the radio strength to about 1 meter
signalLimit = -83
// ID assigned by application
beacon_id = 2
// Diplay beacon ID
basic.showString("B" + beacon_id)
basic.pause(500)
basic.clearScreen()
basic.forever(function () {
    // Constantly sends out a signal for the seekers to hone-in on.
    radio.sendString("Beacon" + beacon_id)
    basic.pause(200)
})
