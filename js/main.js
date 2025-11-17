document.addEventListener('DOMContentLoaded', function() {
    // Добавление класса 'scrolled' к шапке при прокрутке
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Функциональность поиска
    const searchButton = document.querySelector('.search-button');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            // Здесь можно добавить логику открытия поиска
            alert('Функция поиска будет добавлена позже');
        });
    }

    // Мобильное меню (будет добавлено позже)
});
