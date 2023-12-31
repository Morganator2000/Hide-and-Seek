def on_received_number(receivedNumber):
    global score
    score += receivedNumber
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    global answer
    answer = answer - 1
    if answer < 0:
        answer = len(options) - 1
    basic.show_string("" + (options[answer]))
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global homing
    radio.send_string("" + (options[answer]))
    homing = 1
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    global signal
    signal = radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH)
    if homing == 1:
        basic.clear_screen()
        led.plot_bar_graph(Math.map(signal, -94, -42, 0, 9), 9)
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global answer
    answer = answer + 1
    if answer >= len(options):
        answer = 0
    basic.show_string("" + (options[answer]))
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_shake():
    global homing
    homing = 0
    basic.show_number(score)
    basic.pause(1000)
    basic.clear_screen()
    homing = 1
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def on_received_value(name, value):
    global homing, answer, options
    answered_questions: List[str] = []
    homing = 0
    answered_questions.append("" + name + str(value))
    answer = 0
    if name == "T/F":
        options = ["T", "F"]
    elif name == "M3":
        options = ["A", "B", "C"]
    elif name == "M4":
        options = ["A", "B", "C", "D"]
    elif name == "M5":
        options = ["A", "B", "C", "D", "E"]
    else:
        basic.show_string("Err")
    basic.show_string("" + (options[0]))
radio.on_received_value(on_received_value)

signal = 0
answer = 0
options: List[str] = []
score = 0
homing = 0
radio.set_group(1)
seeker_id = 1
homing = 0
score = 0
found_beacons: List[number] = []
options = ["T", "F"]
basic.show_string("S" + str(seeker_id))
basic.pause(200)
basic.clear_screen()
homing = 1