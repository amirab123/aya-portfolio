/* =========================================================
   AYA BELGHARAT — INTERACTIVE 3D PORTFOLIO
   app.js
   ========================================================= */
import * as THREE from "three";

console.log("Three.js fonctionne :", THREE);
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

/* =========================================================
   1. CUSTOM CURSOR
   ========================================================= */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let cursorX = mouseX;
let cursorY = mouseY;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;

  if (cursor) {
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
  }

  requestAnimationFrame(animateCursor);
}

animateCursor();

/* =========================================================
   2. CURSOR HOVER
   ========================================================= */

const interactiveElements = document.querySelectorAll(
  "a, button, .research-box, .project-card, .publication-card, .person-card"
);

interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-hover");
  });

  element.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-hover");
  });
});

/* =========================================================
   3. THREE.JS SCENE
   ========================================================= */

const canvas = document.querySelector("#three-canvas");

if (canvas) {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0xf8f8f5);

  /* -------------------------------------------------------
     CAMERA
     ------------------------------------------------------- */

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.set(0, 0, 7);

  /* -------------------------------------------------------
     RENDERER
     ------------------------------------------------------- */

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  /* -------------------------------------------------------
     LIGHTS
     ------------------------------------------------------- */

  const ambientLight = new THREE.AmbientLight(
    0xffffff,
    2
  );

  scene.add(ambientLight);

  const redLight = new THREE.PointLight(
    0xe10600,
    30,
    20
  );

  redLight.position.set(3, 3, 5);

  scene.add(redLight);

  const whiteLight = new THREE.PointLight(
    0xffffff,
    20,
    15
  );

  whiteLight.position.set(-4, 1, 4);

  scene.add(whiteLight);

  /* =======================================================
     4. FLOATING PARTICLES
     ======================================================= */

  const particleCount = 900;

  const positions = new Float32Array(
    particleCount * 3
  );

  const sizes = new Float32Array(
    particleCount
  );

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    positions[i3] =
      (Math.random() - 0.5) * 14;

    positions[i3 + 1] =
      (Math.random() - 0.5) * 9;

    positions[i3 + 2] =
      (Math.random() - 0.5) * 10;

    sizes[i] =
      Math.random() * 0.035 + 0.01;
  }

  const particleGeometry =
    new THREE.BufferGeometry();

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      positions,
      3
    )
  );

  particleGeometry.setAttribute(
    "size",
    new THREE.BufferAttribute(
      sizes,
      1
    )
  );

  const particleMaterial =
    new THREE.PointsMaterial({
      color: 0xe10600,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });

  const particles =
    new THREE.Points(
      particleGeometry,
      particleMaterial
    );

  scene.add(particles);

  /* =======================================================
     5. 3D RINGS
     ======================================================= */

  const ringGroup =
    new THREE.Group();

  scene.add(ringGroup);

  const ringMaterial =
    new THREE.MeshBasicMaterial({
      color: 0xe10600,
      transparent: true,
      opacity: 0.28,
      wireframe: true,
    });

  const ring1 =
    new THREE.Mesh(
      new THREE.TorusGeometry(
        2.3,
        0.015,
        16,
        120
      ),
      ringMaterial
    );

  ring1.rotation.x =
    Math.PI / 2.5;

  ringGroup.add(ring1);

  const ring2 =
    new THREE.Mesh(
      new THREE.TorusGeometry(
        1.8,
        0.01,
        16,
        100
      ),
      ringMaterial
    );

  ring2.rotation.y =
    Math.PI / 2;

  ringGroup.add(ring2);

  const ring3 =
    new THREE.Mesh(
      new THREE.TorusGeometry(
        2.8,
        0.008,
        16,
        120
      ),
      ringMaterial
    );

  ring3.rotation.x =
    Math.PI / 3;

  ringGroup.add(ring3);

  /* =======================================================
     6. 3D WIREFRAME SPHERE
     ======================================================= */

  const sphereGeometry =
    new THREE.IcosahedronGeometry(
      1.65,
      2
    );

  const sphereMaterial =
    new THREE.MeshBasicMaterial({
      color: 0xe10600,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });

  const sphere =
    new THREE.Mesh(
      sphereGeometry,
      sphereMaterial
    );

  sphere.position.set(
    0,
    0,
    -0.5
  );

  scene.add(sphere);

  /* =======================================================
     7. CENTRAL CORE
     ======================================================= */

  const coreGeometry =
    new THREE.SphereGeometry(
      0.55,
      32,
      32
    );

  const coreMaterial =
    new THREE.MeshBasicMaterial({
      color: 0xe10600,
      transparent: true,
      opacity: 0.8,
    });

  const core =
    new THREE.Mesh(
      coreGeometry,
      coreMaterial
    );

  core.position.z = 0;

  scene.add(core);

  /* =======================================================
     8. MOUSE PARALLAX
     ======================================================= */

  let targetRotationX = 0;
  let targetRotationY = 0;

  window.addEventListener(
    "mousemove",
    (event) => {
      const x =
        event.clientX /
          window.innerWidth -
        0.5;

      const y =
        event.clientY /
          window.innerHeight -
        0.5;

      targetRotationY = x * 0.5;
      targetRotationX = y * 0.3;
    }
  );

  /* =======================================================
     9. ANIMATION LOOP
     ======================================================= */

  const clock =
    new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsed =
      clock.getElapsedTime();

    /* particles */

    particles.rotation.y =
      elapsed * 0.015;

    particles.rotation.x =
      Math.sin(elapsed * 0.1) *
      0.05;

    /* rings */

    ring1.rotation.z =
      elapsed * 0.25;

    ring2.rotation.x =
      elapsed * 0.18;

    ring3.rotation.y =
      elapsed * 0.12;

    /* sphere */

    sphere.rotation.x =
      elapsed * 0.12;

    sphere.rotation.y =
      elapsed * 0.18;

    sphere.rotation.y +=
      targetRotationY * 0.002;

    /* core */

    const scale =
      1 +
      Math.sin(elapsed * 2) *
        0.08;

    core.scale.set(
      scale,
      scale,
      scale
    );

    /* group parallax */

    ringGroup.rotation.x +=
      (targetRotationX -
        ringGroup.rotation.x) *
      0.03;

    ringGroup.rotation.y +=
      (targetRotationY -
        ringGroup.rotation.y) *
      0.03;

    /* lights */

    redLight.position.x =
      Math.sin(elapsed) * 4;

    redLight.position.y =
      Math.cos(elapsed * 0.7) * 3;

    renderer.render(
      scene,
      camera
    );
  }

  animate();

  /* =======================================================
     10. RESIZE
     ======================================================= */

  window.addEventListener(
    "resize",
    () => {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          2
        )
      );
    }
  );
}

/* =========================================================
   11. PHOTO PARALLAX
   ========================================================= */

const personCard =
  document.querySelector(
    ".person-card"
  );

const ayaPhoto =
  document.querySelector(
    "#aya-photo"
  );

if (personCard && ayaPhoto) {
  personCard.addEventListener(
    "mousemove",
    (event) => {
      const rect =
        personCard.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left;

      const y =
        event.clientY -
        rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        ((y - centerY) /
          centerY) *
        -8;

      const rotateY =
        ((x - centerX) /
          centerX) *
        8;

      ayaPhoto.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
      `;
    }
  );

  personCard.addEventListener(
    "mouseleave",
    () => {
      ayaPhoto.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    }
  );
}

/* =========================================================
   12. FLOATING CHIPS
   ========================================================= */

const chips =
  document.querySelectorAll(
    ".floating-chip"
  );

chips.forEach((chip, index) => {
  const delay =
    index * 0.7;

  chip.style.animationDelay =
    `${delay}s`;
});

/* =========================================================
   13. SCROLL REVEAL
   ========================================================= */

const revealElements =
  document.querySelectorAll(
    ".section, .research-box, .project-card, .publication-card, .experience-card"
  );

const revealObserver =
  new IntersectionObserver(
    (entries) => {
      entries.forEach(
        (entry) => {
          if (
            entry.isIntersecting
          ) {
            entry.target.classList.add(
              "is-visible"
            );

            revealObserver.unobserve(
              entry.target
            );
          }
        }
      );
    },
    {
      threshold: 0.12,
    }
  );

revealElements.forEach(
  (element) => {
    revealObserver.observe(
      element
    );
  }
);

/* =========================================================
   14. SMOOTH SCROLL
   ========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const targetId =
          link.getAttribute(
            "href"
          );

        const target =
          document.querySelector(
            targetId
          );

        if (target) {
          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    );
  });

/* =========================================================
   15. ACTIVE NAVIGATION
   ========================================================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    'nav a[href^="#"]'
  );

const navObserver =
  new IntersectionObserver(
    (entries) => {
      entries.forEach(
        (entry) => {
          if (
            entry.isIntersecting
          ) {
            navLinks.forEach(
              (link) => {
                link.classList.remove(
                  "active"
                );

                if (
                  link.getAttribute(
                    "href"
                  ) ===
                  `#${entry.target.id}`
                ) {
                  link.classList.add(
                    "active"
                  );
                }
              }
            );
          }
        }
      );
    },
    {
      threshold: 0.4,
    }
  );

sections.forEach(
  (section) => {
    navObserver.observe(
      section
    );
  }
);

/* =========================================================
   16. HERO TEXT MOUSE EFFECT
   ========================================================= */

const heroTitle =
  document.querySelector(
    ".hero-title"
  );

if (heroTitle) {
  window.addEventListener(
    "mousemove",
    (event) => {
      const x =
        (event.clientX /
          window.innerWidth -
          0.5) *
        8;

      const y =
        (event.clientY /
          window.innerHeight -
          0.5) *
        5;

      heroTitle.style.transform = `
        translate(${x * 0.2}px, ${y * 0.2}px)
      `;
    }
  );
}

/* =========================================================
   17. RED GLOW FOLLOW MOUSE
   ========================================================= */

const glow =
  document.querySelector(
    ".person-glow"
  );

if (glow) {
  window.addEventListener(
    "mousemove",
    (event) => {
      const x =
        event.clientX;

      const y =
        event.clientY;

      glow.style.left =
        `${x}px`;

      glow.style.top =
        `${y}px`;
    }
  );
}

/* =========================================================
   18. MAGNETIC BUTTONS
   ========================================================= */

const magneticButtons =
  document.querySelectorAll(
    ".magnetic"
  );

magneticButtons.forEach(
  (button) => {
    button.addEventListener(
      "mousemove",
      (event) => {
        const rect =
          button.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        button.style.transform = `
          translate(${x * 0.18}px, ${y * 0.18}px)
        `;
      }
    );

    button.addEventListener(
      "mouseleave",
      () => {
        button.style.transform =
          "translate(0, 0)";
      }
    );
  }
);

/* =========================================================
   19. TYPING EFFECT
   ========================================================= */

const typingElement =
  document.querySelector(
    ".typing-text"
  );

if (typingElement) {
  const words = [
    "COMPUTER VISION",
    "SEMICONDUCTORS",
    "DEEP LEARNING",
    "EXPLAINABLE AI",
    "MACHINE LEARNING",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord =
      words[wordIndex];

    if (!deleting) {
      typingElement.textContent =
        currentWord.substring(
          0,
          charIndex + 1
        );

      charIndex++;

      if (
        charIndex ===
        currentWord.length
      ) {
        deleting = true;

        setTimeout(
          typeEffect,
          1800
        );

        return;
      }
    } else {
      typingElement.textContent =
        currentWord.substring(
          0,
          charIndex - 1
        );

      charIndex--;

      if (charIndex === 0) {
        deleting = false;

        wordIndex =
          (wordIndex + 1) %
          words.length;
      }
    }

    setTimeout(
      typeEffect,
      deleting ? 45 : 85
    );
  }

  typeEffect();
}

/* =========================================================
   20. PAGE LOADING
   ========================================================= */

window.addEventListener(
  "load",
  () => {
    document.body.classList.add(
      "page-loaded"
    );
  }
);
/* =========================================================
   AI FLOATING EMOJIS
========================================================= */

const aiEmojis = [
  "🤖",
  "🧠",
  "💻",
  "🔬",
  "⚡",
  "🧬",
  "📊",
  "👁️",
  "💡",
  "🌐"
];

const emojiContainer =
  document.getElementById("ai-emojis");

if (emojiContainer) {

  aiEmojis.forEach((emoji, index) => {

    const element =
      document.createElement("div");

    element.classList.add("ai-emoji");

    element.textContent = emoji;

    element.style.left =
      `${5 + Math.random() * 90}%`;

    element.style.top =
      `${10 + Math.random() * 80}%`;

    element.style.fontSize =
      `${25 + Math.random() * 25}px`;

    element.style.animationDelay =
      `${index * 0.4}s`;

    emojiContainer.appendChild(element);

  });

}