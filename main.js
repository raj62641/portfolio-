// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. CUSTOM CURSOR LOGIC
       ========================================= */
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    const cursorText = document.getElementById("cursorText");
    
    const xToDot = gsap.quickTo(dot, "x", {duration: 0.1, ease: "power3"});
    const yToDot = gsap.quickTo(dot, "y", {duration: 0.1, ease: "power3"});
    const xToRing = gsap.quickTo(ring, "x", {duration: 0.3, ease: "power3"});
    const yToRing = gsap.quickTo(ring, "y", {duration: 0.3, ease: "power3"});

    window.addEventListener("mousemove", (e) => {
        xToDot(e.clientX); yToDot(e.clientY);
        xToRing(e.clientX); yToRing(e.clientY);
    });

    document.querySelectorAll(".interactive").forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });

    document.querySelectorAll(".view-trigger").forEach(el => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.remove("cursor-hover");
            document.body.classList.add("cursor-view");
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-view");
        });
    });

    /* =========================================
       2. THEME TOGGLE
       ========================================= */
    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = document.getElementById('themeIcon');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    /* =========================================
       3. SCENE 1: HERO ANIMATION
       ========================================= */
    const nameEl = document.getElementById("heroName");
    if (nameEl) {
        const text = nameEl.textContent;
        nameEl.innerHTML = "";

        text.split("").forEach(char => {
            const span = document.createElement("span");
            span.textContent = char;
            span.className = "letter";
            if (char === " ") {
                span.style.width = "0.3em";
            }
            nameEl.appendChild(span);
        });
    }

    const tlHero = gsap.timeline();
    tlHero.to("#heroName .letter", { opacity: 1, y: 0, duration: 1.2, stagger: 0.08, ease: "expo.out" })
          .fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "-=0.8")
          .to("#scrollInd", { opacity: 1, duration: 1 }, "-=0.5");

    /* =========================================
       4. SCENE 2: WHO I AM
       ========================================= */
    const desc = document.getElementById('aboutDesc');
    if (desc) {
        const words = desc.innerText.split(' ');
        desc.innerHTML = '';
        words.forEach(word => {
            desc.innerHTML += `<span class="reveal-word"><span>${word}</span></span> `;
        });
    }

    const tlAbout = gsap.timeline({ scrollTrigger: { trigger: "#scene-about", start: "top 70%" } });
    tlAbout.fromTo("#aboutImg img", { scale: 1.4 }, { scale: 1, duration: 1.5, ease: "power3.out" })
           .fromTo("#aboutTitle", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1 }, "-=1")
           .to(".reveal-word span", { y: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: "power3.out" }, "-=0.8");

    /* =========================================
       5. SCENE 3: TIMELINE
       ========================================= */
    gsap.to("#timeProgress", {
        height: "100%", ease: "none",
        scrollTrigger: { trigger: ".timeline", start: "top 60%", end: "bottom 80%", scrub: true }
    });

    gsap.utils.toArray('.time-node').forEach((node, i) => {
        gsap.to(node, {
            scrollTrigger: { trigger: node, start: "top 70%", toggleClass: "active" },
            x: 0, opacity: 1, duration: 0.8, ease: "power2.out"
        });
    });

    /* =========================================
       6. SCENE 4: WHAT I DO
       ========================================= */
    const tlDo = gsap.timeline({
        scrollTrigger: { trigger: "#scene-do", start: "top top", end: "+=300%", pin: true, scrub: 1 }
    });

    tlDo.to(".word-1", { y: 0, opacity: 1, duration: 1 })
        .to(".word-1", { y: -100, opacity: 0, duration: 1, delay: 0.5 })
        .to(".word-2", { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .to(".word-2", { y: -100, opacity: 0, duration: 1, delay: 0.5 })
        .to(".word-3", { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .to(".word-3", { scale: 1.2, opacity: 0, duration: 1, delay: 0.5 });

    /* =========================================
       7. SCENE 5: PROJECTS
       ========================================= */
    const panels = gsap.utils.toArray('.project-panel');
    const tlProjects = gsap.timeline({
        scrollTrigger: { trigger: "#projectsPin", start: "top top", end: "+=400%", pin: true, scrub: 1 }
    });

    panels.forEach((panel, i) => {
        if(i !== 0) { tlProjects.to(panel, { y: 0, ease: "none", duration: 1 }); }
    });

    /* =========================================
       8. SCENE 6: GRAPHIC SHOWCASE
       ========================================= */
    const track = document.getElementById("galleryTrack");
    if (track) {
        gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: { trigger: "#horizontalPin", start: "center center", end: () => "+=" + track.scrollWidth, pin: true, scrub: 1 }
        });
    }

    /* =========================================
       9. SCENE 7 & 8: STATS & TESTIMONIALS
       ========================================= */
    const statsElement = document.getElementById("statsCounter");
    let countObj = { val: 0 };
    if (statsElement) {
        ScrollTrigger.create({
            trigger: ".stats-wrapper", start: "top 80%", once: true,
            onEnter: () => {
                gsap.to(countObj, {
                    val: 200, duration: 2.5, ease: "power2.out",
                    onUpdate: () => { statsElement.innerHTML = Math.floor(countObj.val) + "+"; }
                });
            }
        });
    }

    const slides = document.querySelectorAll('.word-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000);
    }

    /* =========================================
       10. SCENE 9: CONTACT REVEAL
       ========================================= */
    gsap.utils.toArray('.gs-fade').forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: "top 85%" }, y: 30, opacity: 0, duration: 1, ease: "power3.out" });
    });

    /* =========================================
       11. LIGHTBOX GALLERY LOGIC 
       ========================================= */
       
       const lightboxData = {
        'sathya': [
            "Videos/GD/Sathya Medicals Branding/Branding Page 1.jpg",
            "Videos/GD/Sathya Medicals Branding/Branding Page 2.jpg",
            "Videos/GD/Sathya Medicals Branding/Branding Page 3.jpg",
            "Videos/GD/Sathya Medicals Branding/Branding Page 4.jpg",
            "Videos/GD/Sathya Medicals Branding/Branding Page 5.jpg",
            "Videos/GD/Sathya Medicals Branding/Branding Page 6.jpg",
            "Videos/GD/Sathya Medicals Branding/Broucher-1.jpg",
            "Videos/GD/Sathya Medicals Branding/Sathiya.png",
            "Videos/GD/Sathya Medicals Branding/Bill book.jpg",
        ],
        'thumbnails': [
            "Videos/GD/R graphixx Design/1.jpg",
            "Videos/GD/R graphixx Design/2.jpg",
            "Videos/GD/R graphixx Design/3.png",
            "Videos/GD/R graphixx Design/4.png",
            "Videos/GD/R graphixx Design/5.png",
            "Videos/GD/R graphixx Design/6.png",
            "Videos/GD/R graphixx Design/____.r_a_j______-20260503-0004.jpg.jpeg",
        ],
        'identity': [
            "Videos/GD/Blood line (Vijay in).jpg",
            "Videos/GD/bsstudiosofficial5.jpeg",
            "Videos/GD/bsstudiosofficial5-20260503-0001.jpg.jpeg",
            "Videos/GD/babu Kasi.jpg",
            "Videos/GD/Announcment Bloodline final.jpg",
            "Videos/GD/Thumbnail.jpg.jpeg",
            "Videos/GD/College poster-1.jpg",
            "Videos/GD/____.r_a_j______-20260503-0005.jpg.jpeg",
            "Videos/GD/bsstudiosofficial5-20260503-0003.jpg.jpeg",
        ],
        'posters': [
            "Videos/GD/Colour correction/1.jpeg",
            "Videos/GD/Colour correction/2.jpeg",
            "Videos/GD/Colour correction/3.jpeg",
            "Videos/GD/Colour correction/4.jpeg",
            "Videos/GD/Colour correction/6.jpeg",
            "Videos/GD/Colour correction/7.jpeg",
            "Videos/GD/Colour correction/8.jpeg",
            "Videos/GD/Colour correction/9.jpeg",
            "Videos/GD/Colour correction/10.png",
            "Videos/GD/Colour correction/5.jpeg"
        ],
        'branding': [
            "Videos/GD/Normal Edit/7.jpeg",
            "Videos/GD/Normal Edit/3.jpg",
            "Videos/GD/Normal Edit/5.jpeg",
            "Videos/GD/Normal Edit/2.jpg",
            "Videos/GD/Normal Edit/1.jpg",
            "Videos/GD/Normal Edit/6.jpeg",
            "Videos/GD/Normal Edit/4.jpg",
        ]
    };

    let currentImgIndex = 0;
    let currentCategoryArray = []; 

    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCounter = document.getElementById('lightboxCounter');

    window.openLightbox = function(categoryName) {
        currentCategoryArray = lightboxData[categoryName]; 
        currentImgIndex = 0;
        
        updateLightbox();
        lightbox.classList.add('active');
        gsap.to(lightbox, { opacity: 1, duration: 0.4, ease: "power2.out" });
        document.body.style.overflow = "hidden"; 
    };

    window.closeLightbox = function() {
        gsap.to(lightbox, { opacity: 0, duration: 0.4, ease: "power2.out", onComplete: () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = "auto"; 
        }});
    };

    window.changeImage = function(direction) {
        currentImgIndex += direction;
        
        if (currentImgIndex >= currentCategoryArray.length) currentImgIndex = 0;
        if (currentImgIndex < 0) currentImgIndex = currentCategoryArray.length - 1;
        
        gsap.to(lightboxImg, { opacity: 0, scale: 0.95, duration: 0.2, onComplete: () => {
            updateLightbox();
            gsap.to(lightboxImg, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
        }});
    };

    function updateLightbox() {
        lightboxImg.src = currentCategoryArray[currentImgIndex];
        lightboxCounter.innerText = `${currentImgIndex + 1} / ${currentCategoryArray.length}`;
    }

/* =========================================
       12. PROJECT GALLERIES (YOUTUBE + DRIVE + SMART CURSOR FIX)
       ========================================= */
    const projectModal = document.getElementById('projectModal');
    const projectTitle = document.getElementById('projectModalTitle');
    const projectGrid = document.getElementById('projectVideoGrid');

    const projectsData = {
        'bloopers': { 
            title: 'Trailer Cuts', 
            type: 'horizontal', 
            videos: [ 
                "https://drive.google.com/file/d/1UxG3kCPL200065LZFfA3hAX8tcTUuFwh/view?usp=sharing", // <-- Google Drive Link
                "https://drive.google.com/file/d/1e7gnLe0gLdj6ecZoqUUcBu3VI_eijSAo/view?usp=drive_link",
                "https://drive.google.com/file/d/1x2Kjv51T1-fa8iN2-89dPhIWFOvM2r08/view?usp=drive_link",
                "https://drive.google.com/file/d/1nDfTVg69bsdVC2OvkWjezOTN1K8GTEdJ/view?usp=drive_link",
                "https://drive.google.com/file/d/1h6mEpwvnA75xXzMHliBc7m0lw0mGHmCr/view?usp=drive_link",
                "https://drive.google.com/file/d/1YzMPQQ6zJO2vMupb6aDeUhC-lu_y2HbB/view?usp=drive_link",
                "https://drive.google.com/file/d/1rfX8aE2Bj-jsJFKmWhwzFyEMCkhVTIWM/view?usp=drive_link",
                "https://drive.google.com/file/d/1HNPuNcp3eDRTQXgzRT6kd4g7xzfvgPhW/view?usp=drive_link",
                "https://drive.google.com/file/d/1BeBXP9l9MuRv41V8irTtWjN5VNBOV12C/view?usp=drive_link",
                "https://drive.google.com/file/d/1dXVeIDW3oLYYEm6yaoTjhAJ_wLSWx-Z-/view?usp=drive_link"
            ]
        },
        'social': { 
            title: 'Social Media Reels', 
            type: 'vertical', 
            videos: [ 
                "https://drive.google.com/file/d/1Dz0-QfVFceVZwZ8XJD0lzBUkMfQ8Eu4K/view?usp=drive_link",
                "https://drive.google.com/file/d/1ix851hDZ-Y9BYaCyB1B_fMVRIdgrLI92/view?usp=drive_link",
                "https://drive.google.com/file/d/1xZGfz5TXcOnunr0zvY8XQNTHGProjlc-/view?usp=drive_link",
                "https://drive.google.com/file/d/1-aHy4EqO7AEVHwJ1CRN5hC7p7kspvJzV/view?usp=drive_link",
                "https://drive.google.com/file/d/1eOlzciST59NWEGowNRqfIOEqm7Gq-6sh/view?usp=drive_link",
                "https://drive.google.com/file/d/1wBZewLCECeAysdtSJewt5ylIMK2UhcOO/view?usp=drive_link",
                "https://drive.google.com/file/d/1pDOeeQeWGNO0cKXe0njSSYpilFRPxAGO/view?usp=drive_link",
                "https://drive.google.com/file/d/1-7I_ScAJoPX0_0DT54OVm0Xfy-rhc0Wd/view?usp=drive_link",
                "https://drive.google.com/file/d/14cq7zebI38rlR3RYs7ArsEnSlSTz77pF/view?usp=drive_link",
                "https://drive.google.com/file/d/1ou99ia_hrk_HpyuEmfgToL2_hXNMCx7P/view?usp=drive_link",
                "https://drive.google.com/file/d/1hga9ANpJ5Qp4zvm95dWUTZLUheccGnB2/view?usp=sharing",
                "https://drive.google.com/file/d/1-BlMe_WG6zTle0r-6iztsZCiXTGYOMn-/view?usp=drive_link",
            ]
        },
        'parikshe': { 
            title: 'Visual animation', 
            type: 'horizontal', 
            videos: [ 
                "Videos/GD/Sathya Medicals Branding/Sathya medical AD.mp4",
                "Videos/GD/Motion Designs/Rjgraphixx Signature.mp4",
                "Videos/GD/Motion Designs/Animation (2).mp4",
            ]
        },
        'system': { 
            title: 'System Support Case Studies', 
            type: 'horizontal', 
            images: [ 
                "Images/System/1.jpg",
                "Images/System/2.jpg",
                "Images/System/3.jpg",
                "Images/System/4.jpg",
                "Images/System/5.jpg",
                "Images/System/6.jpg",
                "Images/System/7.jpg",
                "Images/System/8.jpg",
                "Images/System/9.jpg",
                "Images/System/10.jpg"
            ]
        }
    };

    window.openProjectGallery = function(projectId) {
        const data = projectsData[projectId];
        projectTitle.innerText = data.title;
        
        let mediaHtml = '';
        
        if (data.videos) {
            data.videos.forEach(videoUrl => {
                
                // --- SMART CHECK 1: IS IT A YOUTUBE LINK? ---
                if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
                    
                    let videoId = "";
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    const match = videoUrl.match(regExp);
                    if (match && match[2].length === 11) {
                        videoId = match[2];
                    }

                    mediaHtml += `
                        <div class="video-card interactive" style="position: relative; overflow: hidden;">
                            <iframe width="100%" height="100%" style="min-height: 250px; border: none; object-fit: cover; border-radius: 10px;"
                                src="https://www.youtube.com/embed/${videoId}?rel=0" 
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerpolicy="strict-origin-when-cross-origin" 
                                allowfullscreen>
                            </iframe>
                        </div>
                    `;
                } 
                // --- SMART CHECK 2: IS IT A GOOGLE DRIVE LINK? ---
                else if (videoUrl.includes("drive.google.com")) {
                    let driveId = "";
                    // Extract ID from drive URL
                    const match = videoUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
                    if (match && match[1]) {
                        driveId = match[1];
                    }

                    mediaHtml += `
                        <div class="video-card interactive" style="position: relative; overflow: hidden;">
                            <iframe width="100%" height="100%" style="min-height: 250px; border: none; object-fit: cover; border-radius: 10px;"
                                src="https://drive.google.com/file/d/${driveId}/preview" 
                                title="Google Drive Video Player"
                                allow="autoplay" 
                                allowfullscreen>
                            </iframe>
                        </div>
                    `;
                }
                // --- SMART CHECK 3: IF NOT YOUTUBE OR DRIVE, PLAY NORMAL MP4 ---
                else {
                    mediaHtml += `
                        <div class="video-card interactive">
                            <video autoplay muted loop playsinline controls src="${videoUrl}" onclick="if(this.muted){this.muted = false; this.currentTime = 0;}"></video>
                        </div>
                    `;
                }
            });
        } 
        else if (data.images) {
            data.images.forEach(imageUrl => {
                mediaHtml += `
                    <div class="video-card interactive">
                        <img src="${imageUrl}" alt="${data.title}">
                    </div>
                `;
            });
        }
        
        projectGrid.innerHTML = mediaHtml;
        projectGrid.className = `video-grid grid-${data.type}`;

        // --- NEW CURSOR FIX OVER IFRAMES ---
        document.querySelectorAll('.video-card').forEach(card => {
            const hasIframe = card.querySelector('iframe');

            card.addEventListener('mouseenter', () => {
                if (hasIframe) {
                    // Hide custom cursor smoothly when hovering over the Google Drive/YouTube box
                    gsap.to("#cursorDot, #cursorRing", { opacity: 0, duration: 0.2 });
                } else {
                    document.body.classList.add('cursor-hover');
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (hasIframe) {
                    // Bring the custom cinematic cursor back when leaving the box
                    gsap.to("#cursorDot, #cursorRing", { opacity: 1, duration: 0.2 });
                } else {
                    document.body.classList.remove('cursor-hover');
                }
            });
        });

        projectModal.classList.add('active');
        gsap.to(projectModal, { opacity: 1, duration: 0.4, ease: "power2.out" });
        document.body.style.overflow = "hidden"; 
    };

    window.closeProjectGallery = function() {
        gsap.to(projectModal, { opacity: 0, duration: 0.4, ease: "power2.out", onComplete: () => {
            projectModal.classList.remove('active');
            projectGrid.innerHTML = ''; 
            document.body.style.overflow = "auto";
        }});
    };

});

/* =========================================
       13. NAME HOVER SPARKLE EFFECT
       ========================================= */
    const heroNameElement = document.getElementById("heroName");
    
    if (heroNameElement) {
        heroNameElement.addEventListener("mouseenter", (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            for (let i = 0; i < 15; i++) {
                createSparkle(mouseX, mouseY);
            }
        });
    }

    function createSparkle(x, y) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        document.body.appendChild(sparkle);

        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 80 + 30; 
        
        const destinationX = Math.cos(angle) * distance;
        const destinationY = Math.sin(angle) * distance;

        gsap.to(sparkle, {
            x: destinationX, 
            y: destinationY, 
            duration: 0.6, 
            ease: "power3.out",
            onComplete: () => {
                sparkle.remove();
            }
        });
    }