document.addEventListener("DOMContentLoaded", function () {
    const e = document.getElementById("category-menu-bar"),
        n = document.getElementById("click-category-menu");
    if (e && n) {
        e.addEventListener("mouseenter", function () {
            n.classList.remove("d-none");
        }),
            n.addEventListener("mouseenter", function () {
                this.classList.remove("d-none");
            }),
            n.addEventListener("mouseleave", function () {
                this.classList.add("d-none");
            }),
            e.addEventListener("mouseleave", function (e) {
                const t = e.relatedTarget;
                n.contains(t) ||
                    t === n ||
                    setTimeout(function () {
                        n.matches(":hover") || n.classList.add("d-none");
                    }, 50);
            });
        
        // Solo aplicar delay en home page - en otras páginas permitir clicks inmediatos
        const isHomePage = window.location.pathname === '/' || window.location.pathname === '/home';
        const delayTime = isHomePage ? 400 : 100;
        
        let t = null;
        document
            .querySelectorAll(".category-nav-element")
            .forEach(function (e) {
                const n = e.querySelector(".sub-cat-menu");
                n &&
                    (e.addEventListener("mouseenter", function () {
                        clearTimeout(t),
                            (n.style.display = "block"),
                            setTimeout(function () {
                                n.classList.add("loaded");
                            }, 10);
                    }),
                    e.addEventListener("mouseleave", function () {
                        t = setTimeout(function () {
                            (n.style.display = "none"),
                                n.classList.remove("loaded");
                        }, delayTime);
                    }),
                    // Cancelar cierre si el mouse entra al submenú
                    n.addEventListener("mouseenter", function () {
                        clearTimeout(t);
                    }),
                    n.addEventListener("mouseleave", function () {
                        t = setTimeout(function () {
                            (n.style.display = "none"),
                                n.classList.remove("loaded");
                        }, delayTime);
                    }));
            });
    }
});
