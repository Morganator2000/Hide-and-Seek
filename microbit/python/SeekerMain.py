from microbit import radio, basic, IconNames, Button, RadioPacketProperty, Math, led, Gesture, convert_to_text, List

def on_received_number(receivedNumber):
    global score, isSeeking
    if receivedNumber == 1:
        score += 1
        radio.set_group(0)
        # answer is correct
        basic.show_icon(IconNames.YES)
        basic.pause(1000)
        basic.clear_screen()
        isSeeking = True
    elif receivedNumber == 0:
        radio.set_group(0)
        # answer is incorrect
        basic.show_icon(IconNames.NO)
        basic.pause(1000)
        basic.clear_screen()
        isSeeking = True
    else:
        basic.show_string("Err")
radio.on_received_number(on_received_number)

# Cycle through answers

def on_button_pressed_a():
    global answer
    basic.clear_screen()
    answer = answer - 1
    if answer < 0:
        answer = len(options) - 1
    basic.show_string("" + (options[answer]))
input.on_button_pressed(Button.A, on_button_pressed_a)

# Pressing both buttons either requests the question from the beacon or sends the answer.

def on_button_pressed_ab():
    global options
    if isSeeking == True:
        basic.clear_screen()
        radio.send_value("ask", seekerId)
    else:
        radio.send_value(options[answer], seekerId)
        options = ["N/A"]
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    global signal
    signal = radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH)
    if isSeeking == True and signal >= signalLimit:
        led.plot_bar_graph(Math.map(signal, -80, -42, 0, 9), 9)
radio.on_received_string(on_received_string)

# Cycle through answers

def on_button_pressed_b():
    global answer
    basic.clear_screen()
    answer = answer + 1
    if answer >= len(options):
        answer = 0
    basic.show_string("" + (options[answer]))
input.on_button_pressed(Button.B, on_button_pressed_b)

# Shaking the seeker will reveal the current score.

def on_gesture_shake():
    global isSeeking
    if isSeeking == True:
        # Breifly turns off the seeking function so the score is shown clearly.
        isSeeking = False
        basic.show_number(score)
        basic.pause(1000)
        basic.clear_screen()
        # Turn signal back on
        isSeeking = True
    else:
        # If the signal was never on, you don't need to turn it back on.
        basic.show_number(score)
        basic.pause(1000)
        basic.clear_screen()
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

# Code for when the seeker receives a "key" (string with a value)
# This covers a lot of things.

def on_received_value(name, value):
    global isSeeking, answer, options
    if name != "ask" and name.includes("S" + str(seekerId)):
        radio.set_group(value)
        # Turns off the signal while answering the question.
        isSeeking = False
        answer = 0
        # Value here will be the beacon's ID.
        basic.show_string("Q" + convert_to_text(value))
        # The name is used to identify what type of question the user is answering
        if name.includes("T/F"):
            options = ["T", "F"]
        elif name.includes("M2"):
            options = ["A", "B"]
        elif name.includes("M3"):
            options = ["A", "B", "C"]
        elif name.includes("M4"):
            options = ["A", "B", "C", "D"]
        else:
            basic.show_string("Err")
        basic.show_string("" + (options[0]))
radio.on_received_value(on_received_value)

signal = 0
answer = 0
score = 0
isSeeking = False
signalLimit = 0
options: List[str] = []
seekerId = 0
seekerId = 2
# The array for possible answers to a question. Currently nothing.
options = ["N/A"]
# Set channel 1. All micro:bits will use this channel.
radio.set_group(0)
radio.set_transmit_power(1)
# This limits the radio strength to about 1 meter
signalLimit = -65
# Display seeker's id
basic.show_string("S" + ("" + str(seekerId)))
basic.pause(200)
basic.clear_screen()
# Seeker is now looking for beacons.
isSeeking = True