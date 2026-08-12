// Данные для теста
const questions = [
    {
        question: 'Какой твой идеальный выходной?',
        answers: [
            { text: 'Помогать другим и делать добрые дела', points: { peter_parker: 3, spider_gwen: 1 } },
            { text: 'Творить искусство и создавать что-то новое', points: { miles_morales: 3, spider_gwen: 2 } },
            { text: 'Решать сложные головоломки и задачи', points: { dr_strange: 3, spider_noir: 2 } },
            { text: 'Веселиться с друзьями и шутить', points: { spider_ham: 3, miles_morales: 1 } }
        ]
    },
    {
        question: 'Что для тебя важнее всего?',
        answers: [
            { text: 'Семья и близкие люди', points: { peter_parker: 2, miles_morales: 2, spider_gwen: 2 } },
            { text: 'Свобода и независимость', points: { spider_gwen: 3, spider_noir: 2 } },
            { text: 'Знания и мудрость', points: { dr_strange: 3, spider_noir: 2 } },
            { text: 'Власть и влияние', points: { green_goblin: 3, mysterio: 2 } }
        ]
    },
    {
        question: 'Как ты действуешь в опасной ситуации?',
        answers: [
            { text: 'Быстро принимаю решение и действую', points: { peter_parker: 2, spider_gwen: 2, miles_morales: 2 } },
            { text: 'Сначала анализирую все варианты', points: { dr_strange: 3, spider_noir: 3 } },
            { text: 'Использую юмор, чтобы разрядить обстановку', points: { spider_ham: 3, miles_morales: 2 } },
            { text: 'Действую нестандартно и непредсказуемо', points: { green_goblin: 3, mysterio: 2 } }
        ]
    },
    {
        question: 'Какая суперспособность тебе ближе?',
        answers: [
            { text: 'Паучье чутье и ловкость', points: { peter_parker: 3, spider_gwen: 2, miles_morales: 1 } },
            { text: 'Магия и управление реальностью', points: { dr_strange: 3, mysterio: 2 } },
            { text: 'Создание иллюзий и обман', points: { mysterio: 3, spider_noir: 1 } },
            { text: 'Суперсила и мощное оружие', points: { green_goblin: 3, spider_ham: 1 } }
        ]
    },
    {
        question: 'Какой твой стиль общения?',
        answers: [
            { text: 'Дружелюбный и открытый', points: { peter_parker: 2, spider_ham: 3, miles_morales: 2 } },
            { text: 'Загадочный и таинственный', points: { spider_noir: 3, dr_strange: 2 } },
            { text: 'Уверенный и харизматичный', points: { mysterio: 3, green_goblin: 2 } },
            { text: 'Честный и прямой', points: { spider_gwen: 3, peter_parker: 1 } }
        ]
    },
    {
        question: 'Что бы ты сделал с большой силой?',
        answers: [
            { text: 'Защищал слабых и боролся за справедливость', points: { peter_parker: 3, spider_gwen: 2, miles_morales: 2 } },
            { text: 'Использовал для достижения своих целей', points: { green_goblin: 3, mysterio: 2 } },
            { text: 'Изучал и совершенствовал свои способности', points: { dr_strange: 3, spider_noir: 2 } },
            { text: 'Веселился и развлекался', points: { spider_ham: 3, miles_morales: 1 } }
        ]
    },
    {
        question: 'Какой цвет тебе больше нравится?',
        answers: [
            { text: 'Красный и синий', points: { peter_parker: 3, miles_morales: 1 } },
            { text: 'Черный и белый', points: { spider_noir: 3, spider_gwen: 2 } },
            { text: 'Зеленый и фиолетовый', points: { green_goblin: 3, mysterio: 2 } },
            { text: 'Яркие и неоновые цвета', points: { miles_morales: 3, spider_ham: 2 } }
        ]
    },
    {
        question: 'Какая твоя главная черта характера?',
        answers: [
            { text: 'Ответственность', points: { peter_parker: 3, dr_strange: 2 } },
            { text: 'Креативность', points: { miles_morales: 3, spider_gwen: 2 } },
            { text: 'Амбициозность', points: { green_goblin: 3, mysterio: 2 } },
            { text: 'Оптимизм', points: { spider_ham: 3, spider_gwen: 1 } }
        ]
    }
];

const characters = {
    peter_parker: {
        name: 'Питер Паркер',
        title: 'Дружелюбный сосед',
        description: 'Ты - классический Человек-паук! Ответственный, добрый и всегда готов помочь другим.',
        traits: ['Ответственный', 'Добрый', 'Умный', 'Скромный'],
        emoji: '🕷️'
    },
    miles_morales: {
        name: 'Майлз Моралес',
        title: 'Новое поколение',
        description: 'Ты - Майлз Моралес! Современный герой с уникальным стилем.',
        traits: ['Креативный', 'Смелый', 'Стильный', 'Вдохновляющий'],
        emoji: '🎨'
    },
    spider_gwen: {
        name: 'Гвен Стейси',
        title: 'Паук-Гвен',
        description: 'Ты - Гвен Стейси! Независимая, сильная и талантливая.',
        traits: ['Независимая', 'Сильная', 'Талантливая', 'Решительная'],
        emoji: '🩰'
    },
    spider_noir: {
        name: 'Нуарный Человек-паук',
        title: 'Детектив',
        description: 'Ты - Нуарный Человек-паук! Загадочный и наблюдательный.',
        traits: ['Загадочный', 'Умный', 'Наблюдательный', 'Хитрый'],
        emoji: '🕵️'
    },
    spider_ham: {
        name: 'Свин-паук',
        title: 'Весельчак',
        description: 'Ты - Свин-паук! Жизнерадостный и с отличным чувством юмора.',
        traits: ['Веселый', 'Оптимистичный', 'Дружелюбный', 'Креативный'],
        emoji: '🐷'
    },
    dr_strange: {
        name: 'Доктор Стрэндж',
        title: 'Верховный маг',
        description: 'Ты - Доктор Стрэндж! Мудрый и загадочный.',
        traits: ['Мудрый', 'Могущественный', 'Загадочный', 'Решительный'],
        emoji: '🔮'
    },
    mysterio: {
        name: 'Мистерио',
        title: 'Мастер иллюзий',
        description: 'Ты - Мистерио! Харизматичный и артистичный.',
        traits: ['Харизматичный', 'Умный', 'Амбициозный', 'Артистичный'],
        emoji: '🎭'
    },
    green_goblin: {
        name: 'Зеленый Гоблин',
        title: 'Гений и безумие',
        description: 'Ты - Зеленый Гоблин! Гениальный и непредсказуемый.',
        traits: ['Гениальный', 'Амбициозный', 'Непредсказуемый', 'Смелый'],
        emoji: '🎃'
    }
};

let currentQuestion = 0;
let scores = {};
let vkBridge = null;

// Инициализация VK Bridge
try {
    vkBridge = window.vkBridge;
} catch (error) {
    console.log('VK Bridge not available');
}

// Показать стартовый экран
function showStartScreen() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="start-screen">
            <div class="spider-logo">🕷️</div>
            <h1>Кто ты из вселенной<br>Человека-паука?</h1>
            <p class="subtitle">Пройди тест и узнай своего персонажа из "Spider-Man: No Way Home"</p>
            <button class="start-btn" onclick="startTest()">Начать тест</button>
        </div>
    `;
}

// Начать тест
function startTest() {
    currentQuestion = 0;
    scores = {};
    showQuestion();
}

// Показать вопрос
function showQuestion() {
    const question = questions[currentQuestion];
    const app = document.getElementById('app');
    const progress = (currentQuestion / questions.length) * 100;
    
    app.innerHTML = `
        <div class="counter">Вопрос ${currentQuestion + 1} из ${questions.length}</div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <div class="question">${question.question}</div>
        <div class="answers">
            ${question.answers.map((answer, index) => `
                <button class="answer-btn" onclick="answerQuestion(${index})">
                    ${answer.text}
                </button>
            `).join('')}
        </div>
    `;
}

// Ответить на вопрос
function answerQuestion(answerIndex) {
    const question = questions[currentQuestion];
    const answer = question.answers[answerIndex];
    
    for (const [character, points] of Object.entries(answer.points)) {
        scores[character] = (scores[character] || 0) + points;
    }
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Показать результат
function showResult() {
    let maxScore = 0;
    let winner = null;
    
    for (const [character, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            winner = character;
        }
    }
    
    const character = characters[winner];
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="result-card">
            <h2>Твой персонаж:</h2>
            <div class="character-image">${character.emoji}</div>
            <div class="character-name">${character.name}</div>
            <div class="character-title">${character.title}</div>
            <div class="character-description">${character.description}</div>
            <div class="traits">
                ${character.traits.map(trait => `
                    <span class="trait-tag">${trait}</span>
                `).join('')}
            </div>
            <button class="share-btn" onclick="shareResult()">Поделиться</button>
            <button class="retry-btn" onclick="startTest()">Пройти еще раз</button>
        </div>
    `;
}

// Поделиться результатом
async function shareResult() {
    if (vkBridge) {
        try {
            await vkBridge.send('VKWebAppShowWallPostBox', {
                message: '🕷️ Я прошел тест "Кто ты из Человека-паука?"! А кто ты?'
            });
        } catch (error) {
            console.error('Share error:', error);
            alert('Не удалось поделиться результатом');
        }
    } else {
        alert('Поделиться можно только в VK');
    }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', showStartScreen);
