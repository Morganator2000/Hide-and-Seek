from microbit import radio, basic, IconNames, RadioPacketProperty, List
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
radio.on_received_string(on_received_string)

# Listener to send out the ID and question type to a seeker.

def on_received_value(name, value):
    global signal, answering_seeker
    signal = radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH)
    if name == "ask" and signal >= signalLimit:
        answering_seeker = value
        # The type of question (T/F or multi-choice) assigned by application
        radio.send_value("S" + str(answering_seeker) + question_type, beacon_id)
        radio.set_group(beacon_id)
    elif name == answer and value == answering_seeker:
        radio.send_number(1)
        answering_seeker = 0
        radio.set_group(0)
        basic.show_icon(IconNames.YES)
        basic.pause(1000)
        basic.clear_screen()
    elif name != answer and value == answering_seeker:
        radio.send_number(0)
        answering_seeker = 0
        radio.set_group(0)
        basic.show_icon(IconNames.NO)
        basic.pause(1000)
        basic.clear_screen()
    else:
        pass
radio.on_received_value(on_received_value)

signal = 0
answering_seeker = 0
answer = ""
question_type = ""
beacon_id = 0
signalLimit = 0
# The channel for the micro:bits.
radio.set_group(0)
# The weakest radio strength. Range of approximately 25 meters.
radio.set_transmit_power(1)
# This limits the radio strength to about 1 meter
signalLimit = -65
# ID assigned by application
beacon_id = 1
question_type = "true_false"
answer = "true"
answering_seeker = 0
# Diplay beacon ID
basic.show_string("B" + ("" + str(beacon_id)))
basic.pause(500)
basic.clear_screen()

def on_forever():
    # Constantly sends out a signal for the seekers to hone-in on.
    radio.send_string("Beacon" + ("" + str(beacon_id)))
    basic.pause(200)
basic.forever(on_forever)
