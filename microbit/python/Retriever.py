def on_received_string(receivedString):
    global signal
    if receivedString == "Here":
        signal = radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH)
        led.plot_bar_graph(Math.map(signal, -95, -42, 0, 9), 9)
radio.on_received_string(on_received_string)

signal = 0
radio.set_group(1)
radio.set_transmit_power(7)
basic.show_string("Searching", 50)

def on_forever():
    radio.send_string("Homing")
    basic.pause(101)
basic.forever(on_forever)
s