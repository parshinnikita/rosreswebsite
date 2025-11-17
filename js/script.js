/* ================================================
   СКРИПТЫ ДЛЯ ИНТЕРАКТИВНОСТИ И АНИМАЦИЙ
   Современные эффекты в стиле EuroChem
   ================================================ */

// Ожидание загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ЛИПКАЯ ШАПКА С ЭФФЕКТОМ ПРИ ПРОКРУТКЕ =====
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Изменение стиля шапки при прокрутке
        if (currentScroll > 100) {
            header.style.padding = '12px 0';
            header.style.boxShadow = '0 4px 20px rgba(0, 61, 130, 0.15)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 2px 8px rgba(0, 61, 130, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Проверка на валидный якорь
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Анимация дочерних элементов с задержкой
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Наблюдаем за секциями
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // CSS для анимации
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ===== АНИМАЦИЯ СЧЕТЧИКОВ В СТАТИСТИКЕ =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    const animateCounters = () => {
        if (countersAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000; // 2 секунды
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
        
        countersAnimated = true;
    };
    
    // Запуск анимации счетчиков при появлении секции
    const statsSection = document.querySelector('.about-brief');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // ===== ОБРАБОТКА ФОРМЫ ОБРАТНОЙ СВЯЗИ =====
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получение данных формы
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Здесь должна быть отправка на сервер
            console.log('Данные формы:', data);
            
            // Показываем уведомление
            showNotification('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.', 'success');
            
            // Очищаем форму
            contactForm.reset();
        });
    }
    
    // ===== ФУНКЦИЯ ПОКАЗА УВЕДОМЛЕНИЙ =====
    function showNotification(message, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Стили уведомления
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 20px 30px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-size: 16px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        // Добавляем на страницу
        document.body.appendChild(notification);
        
        // Удаляем через 5 секунд
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // CSS анимации для уведомлений
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // ===== ЭФФЕКТ ПАРАЛЛАКСА ДЛЯ HERO-БЛОКА =====
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    
    // ===== HOVER-ЭФФЕКТЫ ДЛЯ КАРТОЧЕК =====
    const cards = document.querySelectorAll('.product-card, .project-card, .advantage-card, .news-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ===== ВАЛИДАЦИЯ ТЕЛЕФОНА =====
    const phoneInput = document.querySelector('input[type="tel"]');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = '7' + value.substring(1);
                }
                
                let formattedValue = '+7';
                
                if (value.length > 1) {
                    formattedValue += ' (' + value.substring(1, 4);
                }
                if (value.length >= 5) {
                    formattedValue += ') ' + value.substring(4, 7);
                }
                if (value.length >= 8) {
                    formattedValue += '-' + value.substring(7, 9);
                }
                if (value.length >= 10) {
                    formattedValue += '-' + value.substring(9, 11);
                }
                
                e.target.value = formattedValue;
            }
        });
    }
    
    // ===== АКТИВНЫЙ ПУНКТ МЕНЮ ПРИ ПРОКРУТКЕ =====
    const navLinks = document.querySelectorAll('.main-nav a');
    const sectionIds = Array.from(navLinks).map(link => link.getAttribute('href')).filter(href => href.startsWith('#'));
    
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = header.offsetHeight;
        
        sectionIds.forEach(id => {
            const section = document.querySelector(id);
            if (section) {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                    current = id;
                }
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === current) {
                link.style.color = '#3399ff';
            }
        });
    });
    
    // ===== ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ (если будут реальные) =====
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ===== КОНСОЛЬНОЕ СООБЩЕНИЕ =====
    console.log('%c🏭 Сайт ООО "Техресурсы"', 'font-size: 20px; font-weight: bold; color: #003d82;');
    console.log('%cСовременный дизайн в стиле EuroChem', 'font-size: 14px; color: #0073e6;');
    console.log('%cРазработка 2024', 'font-size: 12px; color: #666;');
    
});

// ===== ОБРАБОТКА ОШИБОК =====
window.addEventListener('error', function(e) {
    console.error('Ошибка:', e.message);
});

// ===== ПРЕДОТВРАЩЕНИЕ МЕРЦАНИЯ ПРИ ЗАГРУЗКЕ =====
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

