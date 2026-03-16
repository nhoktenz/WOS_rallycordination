let numLeaders = 0;
let openRallyTime = 0;
let leaders = [];

function setupLeaders() {
    numLeaders = parseInt(document.getElementById('numLeaders').value);
    openRallyTime = parseInt(document.getElementById('openRallyTime').value);
    
    if (numLeaders < 2) {
        alert('Please enter at least 2 rally leaders!');
        return;
    }
    
    // Hide setup section and show leaders section
    document.getElementById('setup-section').classList.add('hidden');
    document.getElementById('leaders-section').classList.remove('hidden');
    
    // Generate input fields for each leader
    const leadersInputsDiv = document.getElementById('leadersInputs');
    leadersInputsDiv.innerHTML = '';
    
    for (let i = 1; i <= numLeaders; i++) {
        const leaderCard = document.createElement('div');
        leaderCard.className = 'leader-card';
        leaderCard.innerHTML = `
            <h3>Rally Leader ${i}</h3>
            <div class="form-group">
                <label for="leader${i}Name">Leader Name:</label>
                <input type="text" id="leader${i}Name" placeholder="Enter leader name" value="Leader ${i}">
            </div>
            <div class="form-group">
                <label>Marching Time to Center/Building:</label>
                <div class="time-inputs">
                    <div>
                        <label for="leader${i}Minutes" style="font-size: 0.9em;">Minutes:</label>
                        <input type="number" id="leader${i}Minutes" min="0" max="60" value="0" placeholder="Minutes">
                    </div>
                    <div>
                        <label for="leader${i}Seconds" style="font-size: 0.9em;">Seconds:</label>
                        <input type="number" id="leader${i}Seconds" min="0" max="59" value="0" placeholder="Seconds">
                    </div>
                </div>
            </div>
        `;
        leadersInputsDiv.appendChild(leaderCard);
    }
}

function parseTimeToSeconds(minutes, seconds) {
    return parseInt(minutes) * 60 + parseInt(seconds);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0 && secs > 0) {
        return `${mins}m ${secs}s`;
    } else if (mins > 0) {
        return `${mins}m`;
    } else {
        return `${secs}s`;
    }
}

function calculateTiming() {
    leaders = [];
    
    // Collect all leader data
    for (let i = 1; i <= numLeaders; i++) {
        const name = document.getElementById(`leader${i}Name`).value || `Leader ${i}`;
        const minutes = parseInt(document.getElementById(`leader${i}Minutes`).value) || 0;
        const seconds = parseInt(document.getElementById(`leader${i}Seconds`).value) || 0;
        const marchingTime = parseTimeToSeconds(minutes, seconds);
        
        if (marchingTime === 0) {
            alert(`Please enter a valid marching time for ${name}!`);
            return;
        }
        
        // Total time = open rally time + marching time
        const totalTime = openRallyTime + marchingTime;
        
        leaders.push({
            name: name,
            marchingTime: marchingTime,
            totalTime: totalTime,
            minutes: minutes,
            seconds: seconds
        });
    }
    
    // Sort leaders by total time (longest first)
    leaders.sort((a, b) => b.totalTime - a.totalTime);
    
    // Find the longest total time
    const longestTotalTime = leaders[0].totalTime;
    
    // Calculate when each leader should start their rally
    leaders.forEach((leader, index) => {
        leader.delay = longestTotalTime - leader.totalTime;
        leader.order = index + 1;
    });
    
    // Display results
    displayResults();
}

function displayResults() {
    // Hide leaders section and show results section
    document.getElementById('leaders-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    // Add summary
    const summary = document.createElement('div');
    summary.className = 'summary';
    const longestTotalTime = leaders[0].totalTime;
    const longestMarchingTime = leaders[0].marchingTime;
    summary.innerHTML = `
        <h3>📋 Summary</h3>
        <p><strong>Number of Rally Leaders:</strong> ${numLeaders}</p>
        <p><strong>Open Rally Time (waiting period):</strong> ${formatTime(openRallyTime)}</p>
        <p><strong>Longest Marching Time:</strong> ${formatTime(longestMarchingTime)} <span class="leader-highlight">${leaders[0].name}</span></p>
        <p><strong>Longest Total Time:</strong> ${formatTime(longestTotalTime)} <span class="leader-highlight">${leaders[0].name}</span></p>
        <p><strong>All rallies will hit the target at the same time!</strong></p>
    `;
    resultsDiv.appendChild(summary);
    
    // Add each leader's timing
    leaders.forEach((leader, index) => {
        const resultCard = document.createElement('div');
        resultCard.className = index === 0 ? 'result-card first' : 'result-card';
        
        let timingText = '';
        if (index === 0) {
            timingText = `<p><strong>Start Rally:</strong> Start NOW! (First to rally)</p>`;
        } else {
            timingText = `<p><strong>Start Rally:</strong> Wait ${formatTime(leader.delay)} after ${leaders[0].name} starts</p>`;
        }
        
        resultCard.innerHTML = `
            <h3>${leader.name}</h3>
            <p><strong>Marching Time:</strong> ${formatTime(leader.marchingTime)}</p>
            <p><strong>Total Time:</strong> ${formatTime(openRallyTime)} (wait) + ${formatTime(leader.marchingTime)} (march) = ${formatTime(leader.totalTime)}</p>
            ${timingText}
            <span class="badge">Rally Order: #${leader.order}</span>
        `;
        
        resultsDiv.appendChild(resultCard);
    });
    
    // Add execution timeline
    const timeline = document.createElement('div');
    timeline.className = 'summary';
    timeline.innerHTML = '<h3>⏱️ Execution Timeline</h3>';
    
    leaders.forEach((leader, index) => {
        const timelineItem = document.createElement('p');
        if (index === 0) {
            timelineItem.innerHTML = `<strong>T+0s:</strong> <span class="leader-highlight timeline-leader first-leader">${leader.name}</span> opens rally (waits ${formatTime(openRallyTime)}, then marches ${formatTime(leader.marchingTime)})`;
        } else {
            timelineItem.innerHTML = `<strong>T+${formatTime(leader.delay)}:</strong> <span class="leader-highlight timeline-leader">${leader.name}</span> opens rally (waits ${formatTime(openRallyTime)}, then marches ${formatTime(leader.marchingTime)})`;
        }
        timeline.appendChild(timelineItem);
    });
    
    const hitTime = document.createElement('p');
    hitTime.innerHTML = `<strong>T+${formatTime(longestTotalTime)}:</strong> 🎯 All rallies hit the target simultaneously!`;
    hitTime.style.color = '#4CAF50';
    hitTime.style.fontWeight = 'bold';
    hitTime.style.fontSize = '1.2em';
    hitTime.style.marginTop = '15px';
    timeline.appendChild(hitTime);
    
    resultsDiv.appendChild(timeline);
}

function reset() {
    // Reset all data
    numLeaders = 0;
    openRallyTime = 0;
    leaders = [];
    
    // Reset form
    document.getElementById('numLeaders').value = 2;
    document.getElementById('openRallyTime').value = 60;
    
    // Show setup section and hide others
    document.getElementById('setup-section').classList.remove('hidden');
    document.getElementById('leaders-section').classList.add('hidden');
    document.getElementById('results-section').classList.add('hidden');
}
