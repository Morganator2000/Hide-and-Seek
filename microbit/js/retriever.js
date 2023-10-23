//Startup sequence
let signal = 0
radio.setGroup(1)
radio.setTransmitPower(7) //broadcasts at strongest power.
basic.showString("Searching", 50) //Startup displayed

//Starts sending out this signal, calling the beacons
basic.forever(function () {
    radio.sendString("Homing")
    basic.pause(101)
})

//When the retriever gets a reply, the graph displays a "hot-and-cold" led to guide the user to the beacon.
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Here") {
        signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        led.plotBarGraph(
        Math.map(signal, -95, -42, 0, 9),
        9
        )
    }
})