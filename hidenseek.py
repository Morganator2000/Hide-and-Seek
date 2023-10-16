import tkinter as tk
from tkinter import ttk, messagebox

class App:
    def __init__(self, root):
        self.root = root
        self.root.title("Micro:bit Hide N Seek Setup")

        # Labels and Input fields
        ttk.Label(root, text="Number of Hidden Microbits:").grid(row=0, column=0, sticky=tk.W, padx=10, pady=5)
        self.num_beacons = ttk.Entry(root)
        self.num_beacons.grid(row=0, column=1, padx=10, pady=5)

        ttk.Label(root, text="Number of Seeking microbits:").grid(row=1, column=0, sticky=tk.W, padx=10, pady=5)
        self.num_seekers = ttk.Entry(root)
        self.num_seekers.grid(row=1, column=1, padx=10, pady=5)

        ttk.Label(root, text="Select Number of Clues").grid(row=2, column=0, sticky=tk.W, padx=10, pady=5)
        
        # Dropdown for selecting number of clues
        self.num_clues_var = tk.StringVar()
        self.num_clues_dropdown = ttk.Combobox(root, textvariable=self.num_clues_var, values=list(range(1,11)))
        self.num_clues_dropdown.grid(row=2, column=1, padx=10, pady=5)
        self.num_clues_dropdown.bind("<<ComboboxSelected>>", self.create_clue_entries)

        self.clue_entries = []

        # Button to submit details
        ttk.Button(root, text="Submit", command=self.generate_code).grid(row=100, column=1, pady=10)

    def create_clue_entries(self, event=None):
        # Remove existing clue entries and labels
        for entry in self.clue_entries:
            entry[0].destroy()  # destroy label
            entry[1].destroy()  # destroy entry
        self.clue_entries.clear()

        # Create new clue labels and entries
        num_clues = int(self.num_clues_var.get())
        for i in range(num_clues):
            label = ttk.Label(self.root, text=f"Clue {i+1}:")
            label.grid(row=3+i, column=0, sticky=tk.W, padx=10, pady=5)
            entry = ttk.Entry(self.root, width=40)
            entry.grid(row=3+i, column=1, padx=10, pady=5)
        self.clue_entries.append((label, entry))

    def generate_code(self):
        # Extract details from the form
        try:
            beacons = int(self.num_beacons.get())
            seekers = int(self.num_seekers.get())
            clues = [entry.get() for entry in self.clue_entries]
        except ValueError:
            messagebox.showerror("Invalid Input", "Please enter valid numbers for beacons and seekers.")
            return

        # Randomize and generate MicroPython code for the teacher's micro:bit
        # This is where Step 2 and Step 3 will be combined. For now, just showing a message.
        messagebox.showinfo("Info", "Code generation not implemented yet!")

root = tk.Tk()
app = App(root)
root.mainloop()
