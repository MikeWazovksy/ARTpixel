document.addEventListener('DOMContentLoaded', function () {
    // Инициализация иконок Lucide
    lucide.createIcons();

    // Мобильное меню
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Иконка закрыть
        const icon = menuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.setAttribute('data-lucide', 'menu');
        } else {
            icon.setAttribute('data-lucide', 'x');
        }
        lucide.createIcons();
    });

    // Закрытие меню при клике
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });


    // Параллакс главного экрана
    const heroContent = document.getElementById('hero-content');
    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 40;
            const y = (clientY / window.innerHeight - 0.5) * 40;
            heroContent.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    // Таймер обратного отсчета
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        let targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 1);
        targetDate.setHours(0, 0, 0, 0);

        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(timer);
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }
    startCountdown();

    // Анимация появления элементов при скролле
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    revealElements.forEach(el => observer.observe(el));

    // Анимация блока "Резюме после курса"
    const profiles = [
        { avatar: '/Design/image/avatars/avatar1.jpg', title: 'Бренд-дизайнер', salary: '90 000 ₽' },
        { avatar: '/Design/image/avatars/avatar2.jpg', title: 'SMM-дизайнер', salary: '110 000 ₽' },
        { avatar: '/Design/image/avatars/avatar3.jpg', title: 'Веб-дизайнер', salary: '95 000 ₽' },
        { avatar: '/Design/image/avatars/avatar4.jpg', title: 'Digital-дизайнер', salary: '120 000 ₽' },
    ];
    let currentProfileIndex = 0;
    const profileSliderContent = document.getElementById('profile-slider-content');
    const profileAvatar = document.getElementById('profile-avatar');
    const profileTitle = document.getElementById('profile-title');
    const profileSalary = document.getElementById('profile-salary');

    if(profileSliderContent) {
        setInterval(() => {
            profileSliderContent.style.opacity = 0;
            setTimeout(() => {
                currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
                const nextProfile = profiles[currentProfileIndex];
                profileAvatar.src = nextProfile.avatar;
                profileTitle.textContent = nextProfile.title;
                profileSalary.textContent = nextProfile.salary;
                profileSliderContent.style.opacity = 1;
            }, 500);
        }, 4000);
    }


    // Анимация блока зарплат
    const salariesSection = document.getElementById('salaries');
    if (salariesSection) {
        const salaryCounters = salariesSection.querySelectorAll('.salary-counter');
        const bars = salariesSection.querySelectorAll('.bar-inner');

        const animateCountUp = (el) => {
            const target = parseInt(el.dataset.target, 10);
            let current = 0;
            const duration = 2000;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    el.innerText = target.toLocaleString('ru-RU');
                } else {
                    el.innerText = Math.floor(current).toLocaleString('ru-RU');
                }
            }, stepTime);
        };

        const salaryObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    salaryCounters.forEach(animateCountUp);
                    bars.forEach(bar => bar.classList.add('animate'));
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        salaryObserver.observe(salariesSection);
    }


    // Логика аккордеонов
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const item = toggle.closest('.accordion-item');
            item.classList.toggle('open');
        });
    });


    // Слайдер отзывов
    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (slider) {
        const slides = slider.children;
        const slideCount = slides.length;
        let currentIndex = 0;
        let slideInterval;

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSlider();
        }

        function startSlider() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopSlider() {
            clearInterval(slideInterval);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlider();
            startSlider();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlider();
            startSlider();
        });

        startSlider();
    }
});

// --- Функции валидации ---
function validateName(name) {
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    return regex.test(name.trim());
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

function validatePhone(phone) {
    const regex = /^\+7\d{10}$/;
    return regex.test(phone.trim());
}

// --- Автодобавление +7 ---
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function() {
    if (!this.value.startsWith('+7')) {
        this.value = '+7' + this.value.replace(/\D/g, '');
    }
    if (this.value.length > 12) {
        this.value = this.value.slice(0, 12);
    }
});

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastAlert = document.getElementById('toast-alert');
    const toastBadge = document.getElementById('toast-badge');
    const toastText = document.getElementById('toast-text');

    let bgColor, badgeColor, badgeText;
    switch(type) {
        case 'success':
            bgColor = 'bg-gray-500/90';
            badgeColor = 'bg-gray-900/50';
            badgeText = 'Success';
            break;
        case 'error':
            bgColor = 'bg-rose-500/90';
            badgeColor = 'bg-rose-900/50';
            badgeText = 'Error';
            break;
        default:
            bgColor = 'bg-indigo-800';
            badgeColor = 'bg-indigo-500';
            badgeText = 'Info';
    }

    toastAlert.className = `p-4 rounded-lg flex items-center space-x-3 shadow-lg transition-all duration-300 ${bgColor}`;
    toastBadge.className = `flex rounded-full px-2 py-1 text-xs font-bold uppercase ${badgeColor}`;
    toastBadge.textContent = badgeText;
    toastText.textContent = message;

    toast.classList.remove('hidden');
    toast.classList.add('opacity-100');

    // Авто-скрытие через 5 секунд
    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 5000);
}

// Закрытие кнопкой
document.getElementById('toast-close').addEventListener('click', () => {
    const toast = document.getElementById('toast');
    toast.classList.add('opacity-0');
    setTimeout(() => toast.classList.add('hidden'), 300);
});

const formButton = document.querySelector('button[type="submit"]');
formButton.addEventListener('click', function(e) {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    let message = '';
    let type = '';

    // Проверяем пустые поля
    if (!name || !email || !phone) {
        message = 'Все поля должны быть заполнены';
        type = 'error';
    }
    // Проверяем корректность данных
    else if (!validateName(name) || !validateEmail(email) || !validatePhone(phone)) {
        message = 'Проверьте корректность данных';
        type = 'error';
    }
    // Всё ок
    else {
        message = 'Форма успешно отправлена!';
        type = 'success';
    }

    showToast(message, type);
});




