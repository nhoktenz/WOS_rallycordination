let players = [];

function addPlayer() {
    const nameInput = document.getElementById('playerName');
    const powerInput = document.getElementById('playerPower');
    
    const name = nameInput.value.trim();
    const power = parseInt(powerInput.value, 10);
    
    if (!name) {
        alert('Please enter a player name!');
        return;
    }
    
    if (!power || power < 1) {
        alert('Please enter a valid power value (1 or higher)!');
        return;
    }
    
    players.push({ name, power });
    
    nameInput.value = '';
    powerInput.value = '';
    nameInput.focus();
    
    renderPlayersList();
    updateDivideButton();
}

function removePlayer(index) {
    players.splice(index, 1);
    renderPlayersList();
    updateDivideButton();
}

function renderPlayersList() {
    const listDiv = document.getElementById('playersList');
    
    if (players.length === 0) {
        listDiv.innerHTML = '<p class="empty-message">No players added yet.</p>';
        return;
    }
    
    listDiv.innerHTML = '<h3>Players Added:</h3>' + players.map((player, index) =>
        `<div class="player-item">
            <span class="player-info"><strong>${player.name}</strong> - Power: <span class="power-badge">${player.power}</span></span>
            <button onclick="removePlayer(${index})" class="btn btn-remove">✕</button>
        </div>`
    ).join('');
}

function updateDivideButton() {
    const divideBtn = document.getElementById('divideBtn');
    divideBtn.disabled = players.length < 3;
}

function divideTeams() {
    if (players.length < 3) {
        alert('Need at least 3 players to divide into 3 teams!');
        return;
    }
    
    const teams = balanceTeams(players);
    displayTeams(teams);
}

function balanceTeams(playerList) {
    const sorted = [...playerList].sort((a, b) => b.power - a.power);
    const teams = [[], [], []];
    const teamPowers = [0, 0, 0];
    
    sorted.forEach((player) => {
        const minTeamIndex = teamPowers.indexOf(Math.min(...teamPowers));
        teams[minTeamIndex].push(player);
        teamPowers[minTeamIndex] += player.power;
    });
    
    return teams.map((team, index) => ({
        name: `Team ${index + 1}`,
        players: team,
        totalPower: team.reduce((sum, p) => sum + p.power, 0),
        avgPower: team.length > 0 ? Math.round(team.reduce((sum, p) => sum + p.power, 0) / team.length) : 0
    }));
}

function displayTeams(teams) {
    document.getElementById('input-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    const output = document.getElementById('teamsOutput');
    const teamColors = ['#4facfe', '#f093fb', '#43e97b'];
    
    output.innerHTML = teams.map((team, index) =>
        `<div class="team-card" style="border-left: 4px solid ${teamColors[index]}">
            <h3>${team.name}</h3>
            <p><strong>Members:</strong> ${team.players.length}</p>
            <p><strong>Total Power:</strong> <span class="power-total">${team.totalPower}</span></p>
            <p><strong>Avg Power:</strong> ${team.avgPower}</p>
            <div class="team-players">
                ${team.players.map(p => 
                    `<div class="team-player-item">
                        <span>${p.name}</span>
                        <span class="player-power">${p.power}</span>
                    </div>`
                ).join('')}
            </div>
        </div>`
    ).join('');
}

function resetPlayers() {
    players = [];
    document.getElementById('playerName').value = '';
    document.getElementById('playerPower').value = '';
    document.getElementById('playerName').focus();
    
    document.getElementById('input-section').classList.remove('hidden');
    document.getElementById('results-section').classList.add('hidden');
    
    renderPlayersList();
    updateDivideButton();
}

// Initialize
renderPlayersList();
updateDivideButton();
