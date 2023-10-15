def on_button_pressed_ab():
    basic.show_string("Q" + str(beacon_id))
    radio.send_value("M4", beacon_id)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    if receivedString == correct_answer:
        radio.send_number(1)
        basic.show_icon(IconNames.YES)
    else:
        radio.send_number(0)
        basic.show_icon(IconNames.NO)
    basic.pause(1000)
    basic.clear_screen()
radio.on_received_string(on_received_string)

correct_answer = ""
beacon_id = 0
radio.set_group(1)
radio.set_transmit_power(1)
beacon_id = 1
correct_answer = "C"
basic.show_string("B" + str(beacon_id))
basic.pause(500)
basic.clear_screen()

def on_forever():
    radio.send_string("B" + str(beacon_id))
    basic.pause(200)
basic.forever(on_forever)
