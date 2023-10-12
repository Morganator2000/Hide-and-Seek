def on_button_pressed_a():
    global counter
    counter += -1
    basic.show_string("" + str((counter)))
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    if counter == 4:
        basic.show_icon(IconNames.YES)
    else:
        basic.show_icon(IconNames.NO)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global counter
    counter += 1
    basic.show_string("" + str((counter)))
input.on_button_pressed(Button.B, on_button_pressed_b)

counter = 0
index = 0
while index < 0:
    basic.show_string("2+2=?")
    index += 1
counter = 0

def on_forever():
    pass
basic.forever(on_forever)
