radio.onReceivedString(function (receivedString) {
    if (receivedString == "Homing") {
        radio.setTransmitPower(7)
        radio.sendString("Here")
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
    } else if (receivedString == "C") {
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
})
radio.onReceivedValue(function (name, value) {
    radio.sendValue("M4", beacon_id)
})
let beacon_id = 0
radio.setGroup(1)
radio.setTransmitPower(1)
beacon_id = 1
basic.showString("B" + beacon_id)
basic.pause(500)
basic.clearScreen()
basic.forever(function () {
    radio.sendString("B" + beacon_id)
    basic.pause(200)
})
