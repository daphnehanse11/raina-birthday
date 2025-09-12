document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.tribute-card, .timeline-item, .wish-card, .photo-placeholder');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'scale(0.95)';
        heroSection.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'scale(1)';
        }, 100);
    }

    const addWishPlaceholder = document.querySelector('.add-wish-placeholder');
    if (addWishPlaceholder) {
        addWishPlaceholder.addEventListener('click', function() {
            alert('You can add more birthday wishes by editing the HTML file!');
        });
    }

    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const caption = this.querySelector('.caption').textContent;
            alert(`Click here to add a photo for: ${caption}`);
        });
    });

    function createConfetti() {
        const colors = ['#FF69B4', '#FFD700', '#FF1493', '#BA55D3', '#FFB6C1', '#FFA500', '#FF6347'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '9999';
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.opacity = Math.random() + 0.5;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.transition = `all ${Math.random() * 3 + 2}s linear`;
            confettiContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.style.top = '110%';
                confetti.style.transform = `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 200 - 100}px)`;
            }, 10);
        }

        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }

    const birthdayBadge = document.querySelector('.birthday-badge');
    if (birthdayBadge) {
        birthdayBadge.addEventListener('click', createConfetti);
        birthdayBadge.style.cursor = 'pointer';
    }

    const birthdayIcons = document.querySelectorAll('.birthday-icon');
    birthdayIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5) rotate(360deg)';
            this.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                createMiniConfetti(this);
            }, 200);
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    function createMiniConfetti(element) {
        const rect = element.getBoundingClientRect();
        const colors = ['#FF69B4', '#FFD700', '#FF1493', '#BA55D3', '#FFB6C1'];
        
        for (let i = 0; i < 10; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = rect.left + rect.width / 2 + 'px';
            confetti.style.top = rect.top + rect.height / 2 + 'px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            document.body.appendChild(confetti);

            const angle = (Math.PI * 2 * i) / 10;
            const velocity = 50 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 30;

            let x = 0;
            let y = 0;
            let opacity = 1;

            const animate = () => {
                x += vx * 0.02;
                y += vy * 0.02 + 2;
                opacity -= 0.02;

                confetti.style.transform = `translate(${x}px, ${y}px)`;
                confetti.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };

            requestAnimationFrame(animate);
        }
    }

    let titleColorIndex = 0;
    const titleColors = ['#FF69B4', '#FF1493', '#FFD700', '#BA55D3'];
    const nameHighlight = document.querySelector('.name-highlight');
    
    if (nameHighlight) {
        setInterval(() => {
            titleColorIndex = (titleColorIndex + 1) % titleColors.length;
            nameHighlight.style.color = titleColors[titleColorIndex];
            nameHighlight.style.transition = 'color 2s ease';
        }, 3000);
    }

    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const text = mainTitle.innerHTML;
        mainTitle.innerHTML = '';
        let delay = 0;
        
        text.split('').forEach((char, index) => {
            if (char === '<') {
                const closeIndex = text.indexOf('>', index);
                const tag = text.substring(index, closeIndex + 1);
                mainTitle.innerHTML += tag;
                return;
            }
            
            if (char !== ' ' && !text.substring(0, index).includes('<')) {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.animation = `fadeInUp 0.5s ease ${delay}s forwards`;
                mainTitle.appendChild(span);
                delay += 0.05;
            } else if (char === ' ') {
                mainTitle.innerHTML += ' ';
            }
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});