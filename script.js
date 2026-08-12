function generateWithPollinations(characterName, userAvatarUrl) {
    // Формируем промпт
    const prompt = `${characterName} spiderman character, person's face`;
    
    // Создаем URL для генерации
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512`;
    
    // Если есть аватарка, добавляем как reference
    if (userAvatarUrl) {
        return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&image=${encodeURIComponent(userAvatarUrl)}`;
    }
    
    return imageUrl;
}
// Конфигурация
const config = {
    useAI: true, // Включить AI-генерацию
    aiProvider: 'pollinations', // 'pollinations' или 'craiyon'
    fallbackToEmoji: true // Использовать эмодзи если AI не работает
};

// Персонажи с промптами для AI
const characters = {
    peter_parker: {
        name: 'Питер Паркер',
        title: 'Дружелюбный сосед',
        description: 'Ты - классический Человек-паук! Ответственный, добрый и всегда готов помочь другим.',
        traits: ['Ответственный', 'Добрый', 'Умный', 'Скромный'],
        emoji: '🕷️',
        prompt: 'Peter Parker Spider-Man, red and blue superhero suit, comic book style',
        colors: ['#e62429', '#0055a4']
    },
    miles_morales: {
        name: 'Майлз Моралес',
        title: 'Новое поколение',
        description: 'Ты - Майлз Моралес! Современный герой с уникальным стилем.',
        traits: ['Креативный', 'Смелый', 'Стильный', 'Вдохновляющий'],
        emoji: '🎨',
        prompt: 'Miles Morales Spider-Man, black and red suit, graffiti art style',
        colors: ['#ff0000', '#000000']
    },
    spider_gwen: {
        name: 'Гвен Стейси',
        title: 'Паук-Гвен',
        description: 'Ты - Гвен Стейси! Независимая, сильная и талантливая.',
        traits: ['Независимая', 'Сильная', 'Талантливая', 'Решительная'],
        emoji: '🩰',
        prompt: 'Spider-Gwen, white and pink superhero suit, ballet pose',
        colors: ['#ffffff', '#ff69b4']
    },
    spider_noir: {
        name: 'Нуарный Человек-паук',
        title: 'Детектив',
        description: 'Ты - Нуарный Человек-паук! Загадочный и наблюдательный.',
        traits: ['Загадочный', 'Умный', 'Наблюдательный', 'Хитрый'],
        emoji: '🕵️',
        prompt: 'Spider-Man Noir, black and white detective style, 1930s',
        colors: ['#2c3e50', '#95a5a6']
    },
    spider_ham: {
        name: 'Свин-паук',
        title: 'Весельчак',
        description: 'Ты - Свин-паук! Жизнерадостный и с отличным чувством юмора.',
        traits: ['Веселый', 'Оптимистичный', 'Дружелюбный', 'Креативный'],
        emoji: '🐷',
        prompt: 'Spider-Ham, cartoon pig in spider costume, funny style',
        colors: ['#f39c12', '#e74c3c']
    },
    dr_strange: {
        name: 'Доктор Стрэндж',
        title: 'Верховный маг',
        description: 'Ты - Доктор Стрэндж! Мудрый и загадочный.',
        traits: ['Мудрый', 'Могущественный', 'Загадочный', 'Решительный'],
        emoji: '🔮',
        prompt: 'Doctor Strange, mystical superhero, magic portals',
        colors: ['#9b59b6', '#2c3e50']
    },
    mysterio: {
        name: 'Мистерио',
        title: 'Мастер иллюзий',
        description: 'Ты - Мистерио! Харизматичный и артистичный.',
        traits: ['Харизматичный', 'Умный', 'Амбициозный', 'Артистичный'],
        emoji: '🎭',
        prompt: 'Mysterio, green and gold armor, illusion master',
        colors: ['#2ecc71', '#f1c40f']
    },
    green_goblin: {
        name: 'Зеленый Гоблин',
        title: 'Гений и безумие',
        description: 'Ты - Зеленый Гоблин! Гениальный и непредсказуемый.',
        traits: ['Гениальный', 'Амбициозный', 'Непредсказуемый', 'Смелый'],
        emoji: '🎃',
        prompt: 'Green Goblin, green and purple suit, glider',
        colors: ['#27ae60', '#8e44ad']
    }
};

let currentQuestion = 0;
let scores = {};
let userAvatar = null;
let vkBridge = null;

// Инициализация
try {
    vkBridge = window.vkBridge;
} catch (error) {
    console.log('VK Bridge not available');
}

// Получение данных пользователя
async function initApp() {
    showStartScreen();
    
    if (vkBridge) {
        try {
            const user = await vkBridge.send('VKWebAppGetUserInfo');
            if (user.photo_200) {
                userAvatar = user.photo_200;
            }
        } catch (error) {
            console.log('Could not get user avatar');
        }
    }
}

// Генерация изображения персонажа
async function generateCharacterImage(character) {
    const imageContainer = document.getElementById('character-image-container');
    
    // Показываем заглушку
    imageContainer.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Генерируем изображение...</p>
        </div>
    `;
    
    try {
        if (config.useAI) {
            let imageUrl;
            
            if (config.aiProvider === 'pollinations') {
                // Используем Pollinations.ai (бесплатно)
                let prompt = character.prompt;
                
                if (userAvatar) {
                    prompt += `, person face from reference image`;
                    imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true`;
                    
                    // Пытаемся добавить референс аватарки
                    try {
                        const response = await fetch('https://image.pollinations.ai/upload', {
                            method: 'POST',
                            body: JSON.stringify({ image: userAvatar })
                        });
                        if (response.ok) {
                            const data = await response.json();
                            imageUrl += `&image=${data.url}`;
                        }
                    } catch (uploadError) {
                        console.log('Could not upload avatar, using text only');
                    }
                } else {
                    imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true`;
                }
                
                // Показываем изображение
                imageContainer.innerHTML = `
                    <img src="${imageUrl}" 
                         alt="${character.name}" 
                         class="character-image"
                         onerror="showFallbackImage('${character.emoji}', '${character.colors[0]}', '${character.colors[1]}')">
                `;
                
            } else if (config.aiProvider === 'craiyon') {
                // Используем Craiyon API
                const response = await fetch('https://api.craiyon.com/v3', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: character.prompt + (userAvatar ? ' with user face' : ''),
                        model: 'art'
                    })
                });
                
                const data = await response.json();
                if (data.images && data.images.length > 0) {
                    imageContainer.innerHTML = `
                        <img src="data:image/jpeg;base64,${data.images[0]}" 
                             alt="${character.name}" 
                             class="character-image">
                    `;
                }
            }
        }
    } catch (error) {
        console.error('AI generation failed:', error);
        showFallbackImage(character.emoji, character.colors[0], character.colors[1]);
    }
}

// Показ запасного изображения (эмодзи)
function showFallbackImage(emoji, color1, color2) {
    const imageContainer = document.getElementById('character-image-container');
    imageContainer.innerHTML = `
        <div class="fallback-image" style="background: linear-gradient(135deg, ${color1}, ${color2})">
            <span class="fallback-emoji">${emoji}</span>
        </div>
    `;
}

// Обновленная функция показа результата
async function showResult() {
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
            <div id="character-image-container"></div>
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
    
    // Генерируем изображение
    await generateCharacterImage(character);
}

// Остальной код (вопросы, логика теста) остается тем же...
// [Вставьте сюда код вопросов из предыдущей версии]
