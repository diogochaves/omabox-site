#!/usr/bin/env python3
"""A small GTK4 Preferences window for the video's check report. SAVE_SHIFT=N moves the Save
button N px down: the change `omabox check` should find."""
import os
import gi

gi.require_version("Gtk", "4.0")
from gi.repository import Gtk  # noqa: E402


def build(app):
    win = Gtk.ApplicationWindow(application=app, title="Preferences")
    win.set_default_size(460, 300)
    box = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=12)
    for m in ("top", "bottom", "start", "end"):
        getattr(box, f"set_margin_{m}")(18)
    for label, active in (("Start at login", True), ("Show in the bar", True), ("Notify when a download finishes", False)):
        row = Gtk.Box(spacing=12)
        text = Gtk.Label(label=label, xalign=0, hexpand=True)
        sw = Gtk.Switch(active=active)
        row.append(text)
        row.append(sw)
        box.append(row)
    buttons = Gtk.Box(spacing=8, halign=Gtk.Align.END, vexpand=True, valign=Gtk.Align.END)
    cancel = Gtk.Button(label="Cancel", valign=Gtk.Align.START)
    buttons.append(cancel)
    save = Gtk.Button(label="Save")
    save.add_css_class("suggested-action")
    shift = int(os.environ.get("SAVE_SHIFT", "0"))  # the row keeps its height: only Save moves
    save.set_valign(Gtk.Align.START)
    save.set_margin_top(shift)
    save.set_margin_bottom(6 - shift)
    buttons.append(save)
    box.append(buttons)
    win.set_child(box)
    win.present()


app = Gtk.Application(application_id="app.omabox.Prefs")
app.connect("activate", build)
app.run()
