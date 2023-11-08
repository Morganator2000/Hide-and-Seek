# Import the py2hex function from the uflash module
from uflash import py2hex
import os

# Specify the path to the Python script in the current directory
script_filename = "sample.py"
script_path = os.path.join(os.getcwd(), script_filename)

# Read the Python script from the file
with open(script_path, "r") as script_file:
    python_script = script_file.read()

# Convert the script to a hex file
hex_file = py2hex(script_filename)

# Specify the path to save the hex file on C:\microbit
hex_filename = "microbit_script.hex"
hex_path = os.path.join("C:\microbit", hex_filename)

# Save the hex file to the specified directory
with open(hex_path, "w") as hex_file:
    hex_file.write(hex_file)

print(f"Hex file saved to: {hex_path}")
