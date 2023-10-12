def on_button_pressed_a():
    global counter
    counter += -1
    basic.show_number(counter)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    radio.send_number(counter)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    basic.show_string(receivedString)
    basic.pause(200)
    basic.clear_screen()
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global counter
    counter += 1
    basic.show_number(counter)
input.on_button_pressed(Button.B, on_button_pressed_b)

counter = 0
radio.set_group(1)
counter = 0