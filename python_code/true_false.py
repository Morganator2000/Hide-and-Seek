Choice = 0

def on_button_pressed_a():
    global Choice
    Choice = 1
    basic.show_leds("""
        # # # # #
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        """)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    if Choice == 1:
        basic.show_icon(IconNames.YES)
    else:
        basic.show_icon(IconNames.NO)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global Choice
    Choice = 0
    basic.show_leds("""
        . # # # #
        . # . . .
        . # # # .
        . # . . .
        . # . . .
        """)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_forever():
    pass
basic.forever(on_forever)
