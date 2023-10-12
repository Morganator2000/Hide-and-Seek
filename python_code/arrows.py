for index in range(2):
    basic.show_leds("""
        . . # . .
        . # # # .
        # . . . #
        . . # . .
        . . # . .
        """)
    basic.show_leds("""
        . # # # #
        . . . # #
        . . # . #
        . # . . #
        # . . . .
        """)
    basic.show_leds("""
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        """)
    basic.show_leds("""
        # . . . .
        . # . . #
        . . # . #
        . . . # #
        . # # # #
        """)
    basic.show_leds("""
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        """)
    basic.show_leds("""
        . . . . #
        # . . # .
        # . # . .
        # # . . .
        # # # # .
        """)
    basic.show_leds("""
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        """)
    basic.show_leds("""
        # # # # .
        # # . . .
        # . # . .
        # . . # .
        . . . . #
        """)

def on_forever():
    pass
basic.forever(on_forever)
