import frappe
from frappe import _
import datetime
from tkinter import messagebox
import tkinter as tk

def check_reminders():
    # Get current datetime
    now = datetime.datetime.now()

    # Query the database for matching reminders
    leads = frappe.get_all(
        "Lead",
        filters={"custom_reminder": ["=", now.strftime("%Y-%m-%d %H:%M:%S")]},
        fields=["name", "lead_name"]
    )

    # If there are matching reminders, show popup for each
    for lead in leads:
        root = tk.Tk()
        root.withdraw()  # Hide the main window
        messagebox.showinfo(
            "Reminder",
            _("Hey please contact {0}").format(lead.lead_name)
        )

    # Schedule the next check
    frappe.enqueue_doc(
        'System Settings', 'System Settings', 'check_reminders',
        queue='long', timeout=300
    )

def setup_reminder_check():
    # Schedule the first check
    frappe.enqueue_doc(
        'System Settings', 'System Settings', 'check_reminders',
        queue='long', timeout=300
    )
