radio.onReceivedString(function (receivedString) {
    if (receivedString == "Here") {
        signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        led.plotBarGraph(
        Math.map(signal, -95, -42, 0, 9),
        9
        )
    }
})
let signal = 0
radio.setGroup(1)
radio.setTransmitPower(7)
basic.showString("Searching", 50)
basic.forever(function () {
    radio.sendString("Homing")
    basic.pause(101)
})