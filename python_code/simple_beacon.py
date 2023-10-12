def on_received_number(receivedNumber):
    if receivedNumber == 4:
        basic.show_icon(IconNames.YES)
    else:
        basic.show_icon(IconNames.NO)
    basic.pause(2000)
    basic.clear_screen()
radio.on_received_number(on_received_number)

def on_button_pressed_ab():
    radio.send_string("2+2=?")
input.on_button_pressed(Button.AB, on_button_pressed_ab)

radio.set_group(1)
radio.set_transmit_power(2)
id2 = 1
for index in range(5):
    basic.show_number(id2)
    basic.pause(100)
    basic.clear_screen()
    basic.pause(100)