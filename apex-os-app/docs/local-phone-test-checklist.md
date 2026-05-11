# Local S25 Ultra Test Checklist

Run the app on the laptop:

```sh
npm run dev -- --host 0.0.0.0
```

Open the shown network URL from the S25 Ultra on the same Wi-Fi.

- Verify bottom navigation is reachable with one thumb and stays above system gestures.
- Open Home, Workout, Records, and Fuel and confirm no horizontal scrolling.
- Start Focus Mode, complete one set with tap fallback, and confirm the completion overlay returns to Home.
- In Records, switch between History and Benchmarks and expand a workout detail card.
- In Fuel, open add-food, edit-targets, and add-grocery sheets; verify each scrolls and closes with the backdrop.
- Rotate briefly to landscape and back to confirm the centered shell does not break.
