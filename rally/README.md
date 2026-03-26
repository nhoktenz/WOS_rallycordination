# Rally Coordinator & Defense Estimator 🎯

Attack and defense timing tool for Whiteout Survival.

## Live Page

- https://wos.nhoktenz.com/rally/

## Features

- Coordinate 2-10 rally leaders
- Rally Coordinator section for attack timing
- Open-rally duration + march-time calculation
- Execution timeline with T+ offsets
- Countdown timer with start alerts
- Handles same-start leaders (tie timing)
- Edit leader card directly from results
- Enemy hit estimator section for defense timing with multiple enemy rallies and per-rally UTC input
- My march timing recommendation to arrive 1 second after the first enemy hit
- Optional UTC time support

## How It Works

Formula:

```
Total Time = Open Rally Time + Marching Time
```

- Leader with longest total time starts first.
- Others start after a delay equal to the difference.
- Result: all rallies hit at the same time.

## Files

- `index.html` - Attack and defense timing UI
- `script.js` - Rally logic, defense estimator, timer, edit flow
- `styles.css` - Styling

## Author

Created by [ADT]『ᴺʰᵒˣᴛᴇɴᴢᴬᴰᵀ༒天ヅ』- 2608
