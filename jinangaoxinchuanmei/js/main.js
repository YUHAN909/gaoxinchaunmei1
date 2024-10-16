document.addEventListener('DOMContentLoaded', () => {
    // 照片数据
    const photos = [
        { id: 1, src: '/Users/shangyuhan/Desktop/jinangaoxinchuanmei/images imgs/WechatIMG121.jpg', alt: '济南高新区传媒图片1' },
        { id: 2, src: '/Users/shangyuhan/Desktop/jinangaoxinchuanmei/images imgs/WechatIMG120.jpg', alt: '济南高新区传媒图片2' },
        { id: 3, src: '/Users/shangyuhan/Desktop/jinangaoxinchuanmei/images imgs/WechatIMG119.jpg', alt: '济南高新区传媒图片3' },
        { id: 4, src: '/Users/shangyuhan/Desktop/jinangaoxinchuanmei/images imgs/WechatIMG122.jpg', alt: '济南高新区传媒图片4' },
        { id: 5, src: '/Users/shangyuhan/Desktop/jinangaoxinchuanmei/images imgs/WechatIMG118.jpg', alt: '济南高新区传媒图片5' }
    ];

    // VR项目数据
    const vrProjects = [
        { id: 1, title: '海棠郡实景', src: '/Users/shangyuhan/Desktop/jinangaoxinchuanmei/images imgs/haitangjun.jpg', link: 'http://wx.sdwwcm.com/projet/wxjigaohaitangjun/indexkehu.php#' },
        { id: 2, title: '揽月实景', src: '/Users/shangyuhan/Desktop/jinangaoxinchuanmei/images imgs/lanyue.jpg', link: 'http://wx.sdwwcm.com/projet/wxJigaoLanyue/indexkehu.php#' },
        { id: 3, title: '凤凰路壹号院', src: '/Users/shangyuhan/Desktop/jinangaoxinchuanmei/images imgs/fanghuanglu.jpg', link: 'http://wx.sdwwcm.com/projet/wxFHLyihaoyuan/indexkehu.php#' },
        { id: 4, title: '珑悦府', src: '/Users/shangyuhan/Desktop/jinangaoxinchuanmei/images imgs/longyuejun.jpg', link: 'https://www.720yun.com/vr/a802eaz69ta' }
    ];

    // 加载照片
    const photoGrid = document.querySelector('.photo-grid');
    function loadPhotos() {
        photoGrid.innerHTML = '';
        photos.forEach(photo => {
            const photoItem = document.createElement('div');
            photoItem.classList.add('photo-item');
            photoItem.innerHTML = `<img src="${photo.src}" alt="${photo.alt}">`;
            photoGrid.appendChild(photoItem);
        });
    }
    loadPhotos();

    // 加载VR项目
    const vrProjectsContainer = document.querySelector('.vr-projects');
    vrProjects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('vr-project');
        projectElement.innerHTML = `
            <img src="${project.src}" alt="${project.title}">
            <div class="vr-project-info">
                <h3>${project.title}</h3>
                <a href="${project.link}" class="btn" target="_blank">体验VR</a>
            </div>
        `;
        vrProjectsContainer.appendChild(projectElement);
    });

    // Lightbox功能
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const closeLightbox = document.getElementById('close-lightbox');

    photoGrid.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            lightboxImg.src = e.target.src;
            lightbox.classList.remove('hidden');
        }
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 返回顶部按钮
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 懒加载图片
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, options);

        images.forEach(img => imageObserver.observe(img));
    };

    lazyLoadImages();

    // 添加淡入效果
    const fadeInElements = document.querySelectorAll('.fade-in');
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    fadeInElements.forEach(element => fadeInObserver.observe(element));

    // 搜索功能
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPhotos = photos.filter(photo => 
            photo.category.toLowerCase().includes(searchTerm)
        );

        searchResults.innerHTML = '';
        filteredPhotos.forEach(photo => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result-item');
            resultItem.innerHTML = `<img src="${photo.src}" alt="Photo ${photo.id}">`;
            searchResults.appendChild(resultItem);
        });

        if (filteredPhotos.length === 0) {
            searchResults.innerHTML = '<p>有找到匹配的结果</p>';
        }
    });

    // 评论系统
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('comment-name');
        const contentInput = document.getElementById('comment-content');

        if (nameInput.value && contentInput.value) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <h4>${nameInput.value}</h4>
                <p>${contentInput.value}</p>
            `;
            commentsList.appendChild(commentElement);

            nameInput.value = '';
            contentInput.value = '';
        }
    });

    // 分享功能
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('查看这个令人惊叹的摄影作品集！');
            let shareUrl;

            switch (button.dataset.platform) {
                case 'weibo':
                    shareUrl = `http://service.weibo.com/share/share.php?url=${url}&title=${text}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
            }

            window.open(shareUrl, '_blank');
        });
    });

    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slides[slideIndex-1].style.display = "block";  
    }

    // 自动轮播
    setInterval(() => {
        plusSlides(1);
    }, 5000); // 每5秒切换一次图片
});
