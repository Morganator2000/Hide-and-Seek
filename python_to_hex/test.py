import uflash

# Specify the name of the Python script in the current directory
python_script = 'sample.py'

# Specify the output hex file path
output_hex_path = 'C:\microbit'

# Convert the Python script to a micro:bit hex file C:\microbit\micropython.hex
uflash.flash(path_to_python=python_script, paths_to_microbits=[output_hex_path])