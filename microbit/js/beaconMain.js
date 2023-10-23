
let signal = 0
let beacon_id = 0
radio.setGroup(1) //The channel for the micro:bits.
radio.setTransmitPower(1) //The weakest radio strength. Range of approximately 25 meters.
beacon_id = 2 //ID assigned by application
basic.showString("B" + beacon_id) //Diplay beacon ID
basic.pause(500)
basic.clearScreen()
basic.forever(function () { //Constantly sends out a signal for the seekers to hone-in on.
    radio.sendString("Beacon" + beacon_id)
    basic.pause(200)
})

//Code for when the beacon receives a message from either a seeker or retriever.
radio.onReceivedString(function (receivedString) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (receivedString == "Homing") { //This is the signal from a retriever. Called if the beacon was lost.
        radio.setTransmitPower(7) //Boost the power to max (range unknown, but far)
        radio.sendString("Here") //Reply to retriever.
        //Start blinking to attract attention.
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
        if (receivedString == "C") { //The correct answer to this question, assigned by the app.
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

//Listener to send out the ID and question type to a seeker.
radio.onReceivedValue(function (name, value) {
    if (name == "ask") {
        radio.sendValue("M4", beacon_id)  //The type of question (T/F or multi-choice) assigned by application
    }
})