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
                        }, 400);
                    }));
            });
    }
});
