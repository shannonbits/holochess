// Sample lessons data
const lessons = [
    {
        id: 1,
        title: "how the pieces move",
        description: "learn how each chess piece moves and captures",
        stars: 3,
        completed: true,
        category: "basics"
    },
    {
        id: 2,
        title: "basic checkmates",
        description: "learn how to checkmate with king and queen vs king",
        stars: 5,
        completed: true,
        category: "checkmates"
    },
    {
        id: 3,
        title: "the italian game",
        description: "introduction to one of the oldest chess openings",
        stars: 4,
        completed: false,
        category: "openings"
    },
    {
        id: 4,
        title: "fork and pin",
        description: "learn these two fundamental tactical motifs",
        stars: 5,
        completed: false,
        category: "tactics"
    },
    {
        id: 5,
        title: "endgame basics",
        description: "key concepts for playing the endgame",
        stars: 4,
        completed: false,
        category: "endgame"
    },
    {
        id: 6,
        title: "the french defense",
        description: "learn this solid response to e4",
        stars: 5,
        completed: false,
        category: "openings"
    }
];

// Initialize lessons
function initLessons() {
    const lessonCardsContainer = document.getElementById('lesson-cards');
    
    lessons.forEach(lesson => {
        const lessonCard = document.createElement('div');
        lessonCard.className = 'lesson-card';
        lessonCard.innerHTML = `
            <div class="lesson-image">♞</div>
            <div class="lesson-content">
                <h3 class="lesson-title">${lesson.title}</h3>
                <p class="lesson-desc">${lesson.description}</p>
                <div class="lesson-meta">
                    <div class="lesson-stars">${'★'.repeat(lesson.stars)}</div>
                    ${lesson.completed ? 
                        '<div class="lesson-status">completed</div>' : 
                        '<div class="lesson-status" style="background-color: var(--secondary)">start</div>'}
                </div>
            </div>
        `;
        
        lessonCard.addEventListener('click', () => {
            alert(`Starting lesson: ${lesson.title}`);
        });
        
        lessonCardsContainer.appendChild(lessonCard);
    });
}

// Initialize leaderboard
function initLeaderboard() {
    const leaderboardData = [
        { rank: 1, name: "chessmaster", stars: 125, rating: 2200 },
        { rank: 2, name: "holochessfan", stars: 118, rating: 2100 },
        { rank: 3, name: "pawnpusher", stars: 110, rating: 2050 },
        { rank: 4, name: "queensgambit", stars: 105, rating: 2000 },
        { rank: 5, name: "bobbyfischer", stars: 100, rating: 1950 },
        { rank: 6, name: "newplayer", stars: 45, rating: 1200 },
        { rank: 7, name: "beginner123", stars: 30, rating: 1000 }
    ];
    
    const leaderboardContainer = document.getElementById('leaderboard');
    
    // Create header
    const header = document.createElement('div');
    header.className = 'leaderboard-header';
    header.innerHTML = `
        <div>rank</div>
        <div>name</div>
        <div>stars</div>
        <div>rating</div>
    `;
    leaderboardContainer.appendChild(header);
    
    // Create entries
    leaderboardData.forEach(player => {
        const entry = document.createElement('div');
        entry.className = 'leaderboard-entry';
        entry.innerHTML = `
            <div class="leaderboard-rank">${player.rank}</div>
            <div class="leaderboard-name">${player.name}</div>
            <div class="leaderboard-stars">${'★'.repeat(Math.floor(player.stars / 25))}</div>
            <div class="leaderboard-rating">${player.rating}</div>
        `;
        leaderboardContainer.appendChild(entry);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLessons();
    initLeaderboard();
});
