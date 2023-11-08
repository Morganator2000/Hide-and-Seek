from microbit import *
#Reply from the missing beacon. Generates a dynamic bar graph
def on_received_string(receivedString):
    global signal
    if receivedString == "Here":
        signal = radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH)
        led.plot_bar_graph(Math.map(signal, -95, -42, 0, 9), 9)
radio.on_received_string(on_received_string)

signal = 0
radio.set_group(1)
#Highest power possible
radio.set_transmit_power(7)
basic.show_string("Searching", 50)

#Constantly sends out the "Homing" signal to the beacons.
def on_forever():
    radio.send_string("Homing")
    basic.pause(101)
basic.forever(on_forever)