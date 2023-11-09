from microbit import *
# Code for when the beacon receives a message from either a seeker or retriever.

def on_received_string(receivedString):
    global signal
    signal = radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH)
    if receivedString == "Homing":
        # This is the signal from a retriever. Called if the beacon was lost.
        # Boost the power to max (range unknown, but far)
        radio.set_transmit_power(7)
        # Reply to retriever.
        radio.send_string("Here")
        # Start blinking to attract attention.
        basic.show_leds("""
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            """)
        basic.pause(100)
        basic.clear_screen()
        basic.pause(100)
    elif not (receivedString.includes("Beacon")):
        if receivedString == "T":
            # The correct answer to this question, assigned by the app.
            radio.send_number(1)
            basic.show_icon(IconNames.YES)
            basic.pause(1000)
            basic.clear_screen()
        else:
            radio.send_number(0)
            basic.show_icon(IconNames.NO)
            basic.pause(1000)
            basic.clear_screen()
radio.on_received_string(on_received_string)

# Listener to send out the ID and question type to a seeker.

def on_received_value(name, value):
    global signal
    signal = radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH)
    if name == "ask" and signal >= signalLimit:
        # The type of question (T/F or multi-choice) assigned by application
        radio.send_value("T/F", beacon_id)
radio.on_received_value(on_received_value)

signal = 0
beacon_id = 0
signalLimit = 0
# The channel for the micro:bits.
radio.set_group(1)
# The weakest radio strength. Range of approximately 25 meters.
radio.set_transmit_power(1)
# This limits the radio strength to about 1 meter
signalLimit = -65
# ID assigned by application
beacon_id = 1
# Diplay beacon ID
basic.show_string("B" + ("" + str(beacon_id)))
basic.pause(500)
basic.clear_screen()

def on_forever():
    # Constantly sends out a signal for the seekers to hone-in on.
    radio.send_string("Beacon" + ("" + str(beacon_id)))
    basic.pause(200)
basic.forever(on_forever)
