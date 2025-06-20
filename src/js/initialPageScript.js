// Функция для загрузки и вставки HTML-контента
async function loadHTML(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error('Не удалось загрузить HTML:', error);
        document.getElementById(elementId).innerHTML = `<p style="color: red;">Ошибка загрузки контента: ${error.message}</p>`;
    }
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadHTML('imported-content', 'src/external.html');
});