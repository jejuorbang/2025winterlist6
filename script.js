// 스크롤 시 애니메이션 효과
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// 애니메이션을 적용할 요소들 관찰
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .why-card, .step, .offer-item');
    animateElements.forEach(el => observer.observe(el));
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 스크롤 시 헤더 효과 (선택사항)
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // 스크롤 방향에 따른 추가 효과를 원할 경우 여기에 구현

    lastScroll = currentScroll;
});

// 상품 카드 호버 효과 강화
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// CTA 버튼 클릭 시 피드백
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // 전화/이메일 링크는 정상 작동하도록 유지
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// 페이지 로드 시 환영 효과
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// 카테고리별 필터링 기능 (향후 확장 가능)
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// 모바일 터치 제스처 개선
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY;
    // 스와이프 제스처에 대한 추가 기능 구현 가능
}

// 이미지 레이지 로딩 최적화
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // 레이지 로딩을 지원하지 않는 브라우저를 위한 폴백
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// 상품 카운터 애니메이션 (통계가 있을 경우)
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 급상승 효과 (BEST 제품 강조)
setInterval(() => {
    document.querySelectorAll('.badge.best').forEach(badge => {
        badge.style.animation = 'none';
        setTimeout(() => {
            badge.style.animation = 'pulse 1s ease-in-out';
        }, 10);
    });
}, 3000);

// 스크롤 진행률 표시 (선택사항)
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;

    // 진행률 바가 있다면 업데이트
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollProgress + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// 제품 이미지 로드 에러 처리
document.querySelectorAll('.product-image img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18"%3E이미지 준비중%3C/text%3E%3C/svg%3E';
    });
});

// 성능 최적화: 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 리사이즈 이벤트 최적화
const debouncedResize = debounce(() => {
    // 리사이즈 시 필요한 재계산
    console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);

// 콘솔 환영 메시지
console.log('%c오르방 겨울상품 랜딩페이지', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%c2024-25 Winter Collection', 'color: #764ba2; font-size: 16px;');
console.log('문의: 010-8606-7815 | jejusonghouse@naver.com');