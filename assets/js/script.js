/**
 * =============================================
 * CODEWEBSEPT - Script Principal
 * Auteur: Ben Astier - By Seven
 * Description: Gestion des animations, canvas,
 * effets cyberpunk et interactions utilisateur
 * =============================================
 */

/* =============================================
ATTENTE DU CHARGEMENT COMPLET DU DOM
On attend que tous les éléments HTML soient chargés
avant d'exécuter nos scripts
============================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    /* =============================================
    INITIALISATION DES VARIABLES GLOBALES
    Références vers les éléments du DOM
    qu'on utilisera plusieurs fois
    ============================================= */
    
    // Éléments principaux
    const body = document.body;
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    const customCursor = document.getElementById('customCursor');
    
    // Boutons de contrôle
    const themeToggle = document.getElementById('themeToggle');
    const fullscreenToggle = document.getElementById('fullscreenToggle');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Année courante pour le copyright
    const currentYearSpan = document.getElementById('currentYear');
    
    /* =============================================
    CONFIGURATION DES IMAGES POUR LE CANVAS
    Les 5 images qui flotteront en arrière-plan
    ============================================= */
    const imageSources = [
        'assets/images/picSept1.png',
        'assets/images/picSept2.png',
        'assets/images/picSept3.png',
        'assets/images/picSept4.png',
        'assets/images/picSept5.png'
    ];
    
    // Tableau qui contiendra les objets Image chargés
    const loadedImages = [];
    
    // Compteur d'images chargées
    let imagesLoaded = 0;
    
    /* =============================================
    MISE À JOUR DE L'ANNÉE DANS LE FOOTER
    Affiche automatiquement l'année courante
    ============================================= */
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    /* =============================================
    SYSTÈME DE THÈME SOMBRE/CLAIR
    Sauvegarde le choix de l'utilisateur
    dans le localStorage
    ============================================= */
    
    /**
     * Initialise le thème au chargement
     * Vérifie si un thème est déjà sauvegardé
     */
    const initTheme = () => {
        // Récupère le thème sauvegardé ou utilise 'dark' par défaut
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
    };
    
    /**
     * Bascule entre le thème sombre et clair
     * Et sauvegarde le choix
     */
    const toggleTheme = () => {
        // Récupère le thème actuel
        const currentTheme = body.getAttribute('data-theme');
        // Détermine le nouveau thème (inverse)
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        // Applique le nouveau thème
        body.setAttribute('data-theme', newTheme);
        // Sauvegarde dans le localStorage
        localStorage.setItem('theme', newTheme);
    };
    
    // Initialise le thème au démarrage
    initTheme();
    
    // Écouteur d'événement sur le bouton de changement de thème
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    /* =============================================
    SYSTÈME DE PLEIN ÉCRAN
    Permet de basculer en mode plein écran
    ============================================= */
    
    /**
     * Active ou désactive le mode plein écran
     * Utilise l'API Fullscreen du navigateur
     */
    const toggleFullscreen = () => {
        // Vérifie si on est déjà en plein écran
        if (!document.fullscreenElement) {
            // Passe en plein écran
            document.documentElement.requestFullscreen().catch(err => {
                // En cas d'erreur (navigateur non compatible, etc.)
                console.log(`Erreur fullscreen: ${err.message}`);
            });
        } else {
            // Quitte le plein écran
            document.exitFullscreen();
        }
    };
    
    // Écouteur sur le bouton fullscreen
    if (fullscreenToggle) {
        fullscreenToggle.addEventListener('click', toggleFullscreen);
    }
    
    /* =============================================
    BOUTON RETOUR EN HAUT
    Apparaît après avoir scrollé et permet
    de remonter en haut de la page
    ============================================= */
    
    /**
     * Affiche ou cache le bouton selon la position de scroll
     */
    const handleScrollToTopVisibility = () => {
        // Si on a scrollé de plus de 300px, affiche le bouton
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    };
    
    /**
     * Fait défiler la page vers le haut de manière fluide
     */
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Défilement fluide
        });
    };
    
    // Écouteur de scroll pour la visibilité du bouton
    window.addEventListener('scroll', handleScrollToTopVisibility);
    
    // Écouteur de clic sur le bouton
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }
    
    /* =============================================
    MENU HAMBURGER MOBILE
    Gère l'ouverture/fermeture du menu
    sur les petits écrans
    ============================================= */
    
    /**
     * Bascule l'état du menu mobile
     */
    const toggleMobileMenu = () => {
        // Récupère l'état actuel
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        // Inverse l'état
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        // Active/désactive la classe sur le menu
        mainNav.classList.toggle('active');
    };
    
    // Écouteur sur le bouton hamburger
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Ferme le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Ferme le menu mobile si ouvert
            if (mainNav.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
            }
        });
    });
    
    /* =============================================
    CURSEUR PERSONNALISÉ OPTIMISÉ
    Suit les mouvements de la souris avec
    un effet visuel cyberpunk
    ============================================= */
    
    // Position actuelle du curseur (avec lissage)
    let cursorX = 0;
    let cursorY = 0;
    
    // Position cible (position réelle de la souris)
    let targetX = 0;
    let targetY = 0;
    
    /**
     * Met à jour la position cible du curseur optimisée
     * @param {MouseEvent} e - Événement de souris
     */
    const updateCursorPosition = (e) => {
        // Utilise requestAnimationFrame pour synchroniser avec l'affichage
        requestAnimationFrame(() => {
            targetX = e.clientX;
            targetY = e.clientY;
        });
    };
    
    /**
     * Animation du curseur avec effet de lissage OPTIMISÉ
     * Utilise requestAnimationFrame pour fluidité
     */
    const animateCursor = () => {
        // Lissage de la position optimisé (plus rapide)
        // 0.2 au lieu de 0.15 = plus réactif mais garde un peu de lissage
        cursorX += (targetX - cursorX) * 0.2;
        cursorY += (targetY - cursorY) * 0.2;
        
        // Utilise transform3d pour hardware acceleration
        if (customCursor) {
            customCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        }
        
        // Continue l'animation
        requestAnimationFrame(animateCursor);
    };
    
    // Détecte si l'appareil supporte le hover (pas tactile)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    
    // Active le curseur custom uniquement sur desktop
    if (supportsHover && customCursor) {
        // Écoute les mouvements de souris AVEC throttling
        document.addEventListener('mousemove', (e) => {
            updateCursorPosition(e);
        }, { passive: true }); // passive: true pour améliorer les performances
        
        // Lance l'animation du curseur
        animateCursor();
        
        // Optimise la détection des éléments interactifs
        const updateCursorHoverState = () => {
            // Utilise requestAnimationFrame pour éviter les calculs inutiles
            requestAnimationFrame(() => {
                const hoveredElement = document.elementFromPoint(targetX, targetY);
                
                if (hoveredElement && 
                    (hoveredElement.matches('a, button, .contact-card, .competence-card, .tech-badge, .service-item, .hobby-item, .creation-card') ||
                     hoveredElement.closest('a, button, .contact-card, .competence-card, .tech-badge, .service-item, .hobby-item, .creation-card'))) {
                    customCursor.classList.add('cursor-hover');
                } else {
                    customCursor.classList.remove('cursor-hover');
                }
            });
        };
        
        // Écoute les mouvements pour détecter le hover
        document.addEventListener('mousemove', updateCursorHoverState, { passive: true });
    } else {
        // Cache le curseur custom sur tactile
        if (customCursor) {
            customCursor.style.display = 'none';
        }
    }
    
    /* =============================================
    CANVAS BACKGROUND ANIMÉ
    Effet géométrique avec formes, lignes
    et images flottantes
    ============================================= */
    
    /**
     * Redimensionne le canvas pour qu'il couvre
     * toute la fenêtre
     */
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    // Redimensionne au chargement
    resizeCanvas();
    
    // Redimensionne quand la fenêtre change de taille
    window.addEventListener('resize', resizeCanvas);
    
    /* =============================================
    CONFIGURATION DES PARTICULES GÉOMÉTRIQUES
    (Triangles, cercles, lignes)
    ============================================= */
    
    // Couleurs cyberpunk pour les particules
    const colors = [
        'rgba(255, 0, 51, 0.6)',    // Rouge
        'rgba(255, 102, 0, 0.5)',   // Orange
        'rgba(255, 204, 0, 0.4)',   // Jaune
        'rgba(255, 0, 51, 0.3)',    // Rouge transparent
        'rgba(255, 102, 0, 0.3)'    // Orange transparent
    ];
    
    /**
     * Classe Particle
     * Représente une particule géométrique animée
     */
    class Particle {
        constructor() {
            this.reset();
        }
        
        /**
         * Initialise ou réinitialise la particule
         * avec des valeurs aléatoires
         */
        reset() {
            // Position aléatoire
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            
            // Taille aléatoire (entre 2 et 6 pixels)
            this.size = Math.random() * 4 + 2;
            
            // Vitesse de déplacement
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            
            // Couleur aléatoire parmi la palette
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            // Type de forme (0: cercle, 1: triangle, 2: carré)
            this.shape = Math.floor(Math.random() * 3);
            
            // Rotation (pour triangles et carrés)
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        }
        
        /**
         * Met à jour la position et l'état de la particule
         */
        update() {
            // Déplace la particule
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Fait tourner la forme
            this.rotation += this.rotationSpeed;
            
            // Si la particule sort de l'écran, la réinitialise
            if (this.x < -50 || this.x > canvas.width + 50 ||
                this.y < -50 || this.y > canvas.height + 50) {
                this.reset();
            }
        }
        
        /**
         * Dessine la particule sur le canvas
         */
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.color;
            
            switch (this.shape) {
                case 0: // Cercle
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                    
                case 1: // Triangle
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size);
                    ctx.lineTo(-this.size, this.size);
                    ctx.lineTo(this.size, this.size);
                    ctx.closePath();
                    ctx.fill();
                    break;
                    
                case 2: // Carré
                    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                    break;
            }
            
            ctx.restore();
        }
    }
    
    /* =============================================
    CLASSE POUR LES IMAGES FLOTTANTES
    (Les 5 triosphères)
    ============================================= */
    
    /**
     * Classe FloatingImage
     * Représente une image qui flotte en arrière-plan
     */
    class FloatingImage {
        constructor(image, sizeMultiplier) {
            this.image = image;
            // Taille variable selon le multiplicateur
            this.baseSize = 50 + Math.random() * 100;
            this.size = this.baseSize * sizeMultiplier;
            
            // Position initiale aléatoire
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            
            // Vitesse lente pour effet flottant
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            
            // Opacité légère pour ne pas gêner la lecture
            this.opacity = 0.1 + Math.random() * 0.2;
            
            // Animation de flottement sinusoïdale
            this.floatOffset = Math.random() * Math.PI * 2;
            this.floatSpeed = 0.005 + Math.random() * 0.01;
            this.floatAmplitude = 10 + Math.random() * 20;
        }
        
        /**
         * Met à jour la position de l'image
         */
        update() {
            // Déplacement linéaire
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Effet de flottement ondulant
            this.floatOffset += this.floatSpeed;
            
            // Rebondit sur les bords (avec marge)
            if (this.x < -this.size) this.x = canvas.width + this.size;
            if (this.x > canvas.width + this.size) this.x = -this.size;
            if (this.y < -this.size) this.y = canvas.height + this.size;
            if (this.y > canvas.height + this.size) this.y = -this.size;
        }
        
        /**
         * Dessine l'image sur le canvas
         */
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            
            // Applique l'effet de flottement
            const floatY = Math.sin(this.floatOffset) * this.floatAmplitude;
            
            // Dessine l'image centrée sur sa position
            ctx.drawImage(
                this.image,
                this.x - this.size / 2,
                this.y - this.size / 2 + floatY,
                this.size,
                this.size
            );
            
            ctx.restore();
        }
    }
    
    /* =============================================
    LIGNES DE CONNEXION ENTRE PARTICULES
    Effet de réseau neural / constellation
    ============================================= */
    
    /**
     * Dessine des lignes entre les particules proches
     * @param {Array} particles - Tableau de particules
     */
    const drawConnections = (particles) => {
        const maxDistance = 150; // Distance max pour connexion
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                // Calcule la distance entre deux particules
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Si assez proches, trace une ligne
                if (distance < maxDistance) {
                    // Opacité basée sur la distance (plus proche = plus visible)
                    const opacity = 1 - (distance / maxDistance);
                    
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 0, 51, ${opacity * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    };
    
    /* =============================================
    INTERACTION SOURIS AVEC LE CANVAS
    Les particules réagissent à la souris
    ============================================= */
    
    // Position de la souris sur le canvas
    let mouseX = 0;
    let mouseY = 0;
    
    /**
     * Met à jour la position de la souris pour le canvas
     * @param {MouseEvent} e - Événement de souris
     */
    const updateMousePosition = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };
    
    // Écoute les mouvements de souris
    document.addEventListener('mousemove', updateMousePosition);
    
    /**
     * Dessine un effet de halo autour de la souris
     * Taille réduite de moitié (50px au lieu de 100px)
     */
    const drawMouseEffect = () => {
        // Dégradé radial autour de la souris - rayon réduit à 50px
        const gradient = ctx.createRadialGradient(
            mouseX, mouseY, 0,
            mouseX, mouseY, 50
        );
        gradient.addColorStop(0, 'rgba(255, 0, 51, 0.1)');
        gradient.addColorStop(0.5, 'rgba(255, 102, 0, 0.05)');
        gradient.addColorStop(1, 'rgba(255, 204, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        // Rayon du cercle réduit à 50px
        ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2);
        ctx.fill();
    };
    
    /* =============================================
    CRÉATION ET ANIMATION DES PARTICULES
    ============================================= */
    
    // Tableau contenant toutes les particules
    const particles = [];
    
    // Nombre de particules (ajusté selon la taille de l'écran)
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    
    // Crée les particules
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Tableau pour les images flottantes
    const floatingImages = [];
    
    /* =============================================
    CHARGEMENT DES IMAGES
    Charge les 5 images avant de les utiliser
    ============================================= */
    
    // Tailles différentes pour chaque image
    const sizeMultipliers = [0.8, 1.0, 1.2, 0.9, 1.1];
    
    /**
     * Charge une image et l'ajoute au système
     * @param {string} src - Chemin de l'image
     * @param {number} index - Index de l'image
     */
    const loadImage = (src, index) => {
        const img = new Image();
        
        img.onload = () => {
            loadedImages.push(img);
            imagesLoaded++;
            
            // Crée l'objet FloatingImage une fois chargée
            floatingImages.push(new FloatingImage(img, sizeMultipliers[index]));
            
            console.log(`Image ${index + 1}/5 chargée: ${src}`);
        };
        
        img.onerror = () => {
            console.warn(`Impossible de charger l'image: ${src}`);
            imagesLoaded++;
        };
        
        img.src = src;
    };
    
    // Lance le chargement de toutes les images
    imageSources.forEach((src, index) => {
        loadImage(src, index);
    });
    
    /* =============================================
    BOUCLE D'ANIMATION PRINCIPALE
    Anime tout le canvas en continu
    ============================================= */
    
    /**
     * Fonction d'animation appelée à chaque frame
     * (~60 fois par seconde)
     */
    const animate = () => {
        // Efface le canvas avec un fond semi-transparent
        // (crée un effet de traînée)
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dessine les images flottantes en premier (arrière-plan)
        floatingImages.forEach(img => {
            img.update();
            img.draw();
        });
        
        // Dessine les connexions entre particules
        drawConnections(particles);
        
        // Met à jour et dessine chaque particule
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Dessine l'effet autour de la souris
        if (supportsHover) {
            drawMouseEffect();
        }
        
        // Continue l'animation
        requestAnimationFrame(animate);
    };
    
    // Démarre l'animation
    animate();
    
    /* =============================================
    ANIMATION D'APPARITION AU SCROLL
    Les éléments apparaissent quand on scrolle
    ============================================= */
    
    /**
     * Détecte les éléments visibles et les anime
     */
    const handleScrollAnimations = () => {
        // Sélectionne tous les éléments à animer
        const elements = document.querySelectorAll(
            '.competence-card, .contact-card, .service-item, .hobby-item, .creation-card'
        );
        
        elements.forEach(el => {
            // Calcule la position de l'élément
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Si l'élément est visible (à 80% dans la fenêtre)
            if (rect.top < windowHeight * 0.85) {
                el.classList.add('visible');
            }
        });
    };
    
    // Ajoute la classe initiale aux éléments
    const animatedElements = document.querySelectorAll(
        '.competence-card, .contact-card, .service-item, .hobby-item, .creation-card'
    );
    animatedElements.forEach(el => el.classList.add('fade-in-up'));
    
    // Écoute le scroll pour les animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Lance une première vérification au chargement
    handleScrollAnimations();
    
    /* =============================================
    EFFET PARALLAXE LÉGER SUR LE HERO
    Le contenu hero bouge légèrement au scroll
    ============================================= */
    
    const heroContent = document.querySelector('.hero-content');
    
    /**
     * Applique un effet parallaxe au hero
     */
    const handleParallax = () => {
        if (heroContent) {
            const scrolled = window.scrollY;
            // Déplace le hero vers le haut à 30% de la vitesse du scroll
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            // Réduit l'opacité progressivement
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
    };
    
    // Écoute le scroll pour le parallaxe
    window.addEventListener('scroll', handleParallax);
    
    /* =============================================
    GESTION DU HEADER AU SCROLL
    Change le style du header quand on scrolle
    ============================================= */
    
    const mainHeader = document.getElementById('mainHeader');
    
    /**
     * Gère l'apparence du header selon le scroll
     */
    const handleHeaderScroll = () => {
        const currentScrollY = window.scrollY;
        
        // Ajoute une classe si on a scrollé
        if (currentScrollY > 50) {
            mainHeader.style.background = 'rgba(10, 10, 10, 0.98)';
            mainHeader.style.boxShadow = '0 2px 20px rgba(255, 0, 51, 0.3)';
        } else {
            mainHeader.style.background = 'rgba(10, 10, 10, 0.9)';
            mainHeader.style.boxShadow = 'none';
        }
    };
    
    // Écoute le scroll pour le header
    window.addEventListener('scroll', handleHeaderScroll);
    
    /* =============================================
    SMOOTH SCROLL POUR LES LIENS INTERNES
    Navigation fluide vers les sections
    ============================================= */
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcule la position avec offset pour le header fixe
                const headerHeight = mainHeader.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Ferme le menu mobile si ouvert
                if (mainNav && mainNav.classList.contains('active')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    mainNav.classList.remove('active');
                }
            }
        });
    });
    
    /* =============================================
    ZOOM EFFECT - Agrandissement des cartes
    Sections Compétences et Hobby
    ============================================= */
    
    // Création des éléments de zoom s'ils n'existent pas
    if (!document.getElementById('zoomOverlay')) {
        const zoomOverlay = document.createElement('div');
        zoomOverlay.id = 'zoomOverlay';
        zoomOverlay.className = 'zoom-overlay';
        document.body.appendChild(zoomOverlay);
    }
    
    if (!document.getElementById('zoomContainer')) {
        const zoomContainer = document.createElement('div');
        zoomContainer.id = 'zoomContainer';
        zoomContainer.className = 'zoom-container';
        
        const zoomCloseBtn = document.createElement('button');
        zoomCloseBtn.id = 'zoomCloseBtn';
        zoomCloseBtn.className = 'zoom-close';
        zoomCloseBtn.innerHTML = '✕';
        
        const zoomContent = document.createElement('div');
        zoomContent.id = 'zoomContent';
        
        zoomContainer.appendChild(zoomCloseBtn);
        zoomContainer.appendChild(zoomContent);
        document.body.appendChild(zoomContainer);
    }
    
    // Éléments du zoom
    const zoomOverlay = document.getElementById('zoomOverlay');
    const zoomContainer = document.getElementById('zoomContainer');
    const zoomContent = document.getElementById('zoomContent');
    const zoomCloseBtn = document.getElementById('zoomCloseBtn');
    
    /**
     * Fonction pour ouvrir le zoom
     * @param {HTMLElement} element - Élément à zoomer
     */
    const openZoom = (element) => {
        // Clone l'élément pour éviter de modifier l'original
        const clonedElement = element.cloneNode(true);
        
        // Supprime les classes d'animation et hover du clone
        clonedElement.classList.remove('fade-in-up', 'visible');
        clonedElement.style.animation = 'none';
        clonedElement.style.cursor = 'default';
        
        // Supprime les pseudo-éléments et les icônes loupe
        clonedElement.classList.add('zoomed');
        
        // Vide et remplit le contenu zoomé
        zoomContent.innerHTML = '';
        zoomContent.appendChild(clonedElement);
        
        // Active l'overlay et le container
        zoomOverlay.classList.add('active');
        zoomContainer.classList.add('active');
        
        // Empêche le scroll du body
        document.body.style.overflow = 'hidden';
    };
    
    /**
     * Fonction pour fermer le zoom
     */
    const closeZoom = () => {
        zoomOverlay.classList.remove('active');
        zoomContainer.classList.remove('active');
        document.body.style.overflow = '';
        
        // Petite animation de sortie
        zoomContainer.style.animation = 'none';
        setTimeout(() => {
            zoomContainer.style.animation = '';
        }, 10);
    };
    
    // Ajoute l'événement de clic sur les cartes de compétences
    const competenceCards = document.querySelectorAll('.competence-card');
    competenceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            openZoom(card);
        });
    });
    
    // Ajoute l'événement de clic sur les items de hobby
    const hobbyItems = document.querySelectorAll('.hobby-item');
    hobbyItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            openZoom(item);
        });
    });
    
    // Fermeture du zoom
    if (zoomCloseBtn) {
        zoomCloseBtn.addEventListener('click', closeZoom);
    }
    
    // Fermeture en cliquant sur l'overlay
    if (zoomOverlay) {
        zoomOverlay.addEventListener('click', closeZoom);
    }
    
    // Fermeture avec la touche Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && zoomContainer && zoomContainer.classList.contains('active')) {
            closeZoom();
        }
    });
    
    // Empêche la fermeture quand on clique dans le container
    if (zoomContainer) {
        zoomContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    /* =============================================
    MESSAGE DE BIENVENUE DANS LA CONSOLE
    Easter egg pour les développeurs curieux
    ============================================= */
    console.log('%c🔥 CodeWebSept - By Seven 🔥', 
        'background: linear-gradient(90deg, #ff0033, #ff6600); color: white; padding: 10px 20px; font-size: 20px; font-weight: bold; border-radius: 5px;'
    );
    console.log('%c💻 Bienvenue dans l\'inspection !', 
        'color: #ffcc00; font-size: 14px;'
    );
    console.log('%c📧 Contact: codewebsept@gmail.com', 
        'color: #ff6600; font-size: 12px;'
    );
    console.log('%c🔍 Astuce: Cliquez sur les cartes Compétences et Hobby pour les zoomer !', 
        'color: #00ff00; font-size: 12px; font-style: italic;'
    );
    
}); // Fin du DOMContentLoaded