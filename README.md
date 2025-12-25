# MCSR Ranked Summary Overlay

A simple overlay for OBS which shows current rank + elo and last 10 matches / elo changes (including decays).

## Usage

To use this overlay add the following browser source to your OBS:

`https://mcsr-summary-overlay.vercel.app/<YOUR_MINECRAFT_NAME>`

Crop the overlay using ALT + left click drag.

Overlay updates the match history every 10 seconds since there are no available webhooks in the official MCSR Ranked API docs. The delay should be negligible.
