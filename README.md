# Whiteout Survival - Rally Coordinator 🎯

A web-based tool to coordinate rally attacks in Whiteout Survival, ensuring all rally leaders hit the target simultaneously from different locations. Includes advanced features like UTC timelines and enemy hit estimation.

## 🎮 Features

### Rally Coordinator Tab
- **Multi-leader Support**: Coordinate 2-10 rally leaders simultaneously
- **Precise Timing**: Account for both open rally time and marching distance
- **Visual Timeline**: Clear execution timeline showing when each leader should start
- **UTC Timeline Support**: Optional 24-hour UTC clock integration for global coordination
- **Countdown Timer**: Real-time countdown with leader alerts
- **Live Execution Tracking**: Monitor rally progress with T+ offset tracking

### Enemy Hit Estimator Tab
- **Independent Calculations**: Calculate enemy rally hit times separately
- **Flexible Inputs**: Enter any march time and open rally duration
- **Optional UTC Support**: Sync enemy estimates with UTC timeline if needed

### General Features
- **Bootstrap UI Framework**: Modern, professional responsive design
- **Mobile Friendly**: Optimized for desktop and mobile devices
- **Intuitive Interface**: Tab-based navigation between features
- **Easy to Use**: Simple, clear input forms with validation

## 🚀 How to Use

### Rally Coordinator
1. **Setup Phase**
   - Select the number of rally leaders (2-10)
   - Choose the open rally time (1, 3, 5, or 10 minutes)

2. **Enter Leader Information**
   - For each leader, enter:
     - Leader name
     - Marching time from their city to the target (minutes and seconds)

3. **View Results**
   - See exactly when each leader should start their rally
   - View the complete execution timeline with T+ offsets
   - Add more leaders directly from the results screen
   - Enable UTC timeline for 24-hour clock coordination (optional)
   - Start countdown timer to monitor rally execution

### Enemy Hit Estimator
1. **Enter March Time**: Leader's total march time to target
2. **Enter Open Rally Time**: Target's open rally duration
3. **View Result**: Exact time when enemy rally will hit
4. **Optional UTC**: Enter UTC start time to display clock time

## 📖 How It Works

### Rally Coordinator Algorithm
The calculator uses this formula:
```
Total Time = Open Rally Time (waiting) + Marching Time
```

The leader with the **longest total time** starts first. Other leaders start later based on the time difference, ensuring all rallies arrive simultaneously.

**Example:**
- Open Rally Time: 3 minutes
- Leader 1: 5 min march → 8 min total (starts at T+0:00)
- Leader 2: 2:45 march → 5:45 total (starts at T+2:15)
- Leader 3: 4:20 march → 7:20 total (starts at T+0:40)

Result: All three rallies hit the target at the exact same time! ⚔️

### Enemy Hit Estimator Algorithm
```
Enemy Hit Time = Current Time + Open Rally Time + Marching Time
```

Calculate when an enemy rally will arrive at your location based on their march time and open rally duration.

### UTC Timeline
Optional feature that converts all calculations to a specific UTC start time. If enabled:
- Enter a T (UTC time) in 24-hour format (HH:MM:SS)
- All leader start times display as both T+ offsets and full UTC clock times
- Useful for coordinating across different time zones

## � Technology Stack

- **Framework**: Bootstrap 5.3.3 (responsive UI components)
- **Frontend**: Vanilla JavaScript (no dependencies)
- **Styling**: Bootstrap utilities + custom CSS
- **Browser**: Works in any modern web browser

## 🛠️ Installation

Simply open `index.html` in any modern web browser. No installation, build process, or server required!

**File Structure:**
- `index.html` - Main application structure with dual-tab interface
- `script.js` - Rally coordinator logic, enemy estimator, UTC utilities, countdown timer (780+ lines)
- `styles.css` - Custom theming and responsive design (550+ lines)

## 📝 Version History

**v1.0.0** - Current Release
- Full Rally Coordinator with multi-leader support
- Enemy Hit Estimator tab
- UTC timeline support with 24-hour format
- Countdown timer with leader notifications
- Bootstrap 5.3.3 UI framework
- Responsive mobile design
- Complete form validation

## 🎯 Game: Whiteout Survival

This tool is designed for players of Whiteout Survival who need to coordinate multiple rally attacks to ensure simultaneous hits on enemy buildings or targets.

## 📞 Support

For issues or suggestions, feel free to open an issue on GitHub or contact **nhokTenZ** in state 2608.

## 📝 License

**Created by:** [ADT]『ᴺʰᵒˣᴛᴇɴᴢᴬᴰᵀ༒天ヅ』

Made for the Whiteout Survival community ❄️⚔️

---

**Last Updated:** v1.0.0 | Bootstrap-integrated, fully tested
