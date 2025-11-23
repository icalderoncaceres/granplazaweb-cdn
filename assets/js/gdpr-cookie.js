const GranPlazaCookies = {
    consentName: "granplaza_cookies_consent",
    prefsName: "granplaza_cookies_preferences",
    analyticsName: "granplaza_analytics_storage",
    adsName: "granplaza_ads_storage",
    config: {
        theme: {
            mainColor: "#8605c2",
            textColor: "#1b1b1bff",
            backgroundColor: "#ffffff",
            btnTextColor: "#ffffff",
        },
        options: {
            position: "bottom",
            showFloatingBtn: !1,
            floatingBtnPosition: "bottom-left",
            showCloseIcon: !1,
            showRejectBtn: !0,
            fullWidth: !0,
            allPrefsChecked: !0,
            delay: 1e3,
            expiryDays: 365,
        },
        content: {
            title: window.AIZ.translate
                ? window.AIZ.translate("Política de Cookies")
                : "Política de Cookies",
            description: window.AIZ.translate
                ? window.AIZ.translate(
                      "Este sitio web utiliza cookies para mejorar su experiencia, proporcionar funciones de redes sociales y analizar el tráfico. Al continuar navegando, acepta el uso de cookies de acuerdo con nuestra"
                  )
                : "Este sitio web utiliza cookies para mejorar su experiencia, proporcionar funciones de redes sociales y analizar el tráfico. Al continuar navegando, acepta el uso de cookies de acuerdo con nuestra",
            privacyPolicyText: window.AIZ.translate
                ? window.AIZ.translate("Política de Privacidad")
                : "Política de Privacidad",
            privacyPolicyLink: "/privacy-policy",
            termsText: window.AIZ.translate
                ? window.AIZ.translate("Términos y Condiciones")
                : "Términos y Condiciones",
            termsLink: "/terms",
            cookiePolicyText: window.AIZ.translate
                ? window.AIZ.translate("Política de Cookies")
                : "Política de Cookies",
            cookiePolicyLink: "/cookie-policy",
            acceptBtnText: window.AIZ.translate
                ? window.AIZ.translate("Aceptar")
                : "Aceptar",
            rejectBtnText: window.AIZ.translate
                ? window.AIZ.translate("Rechazar")
                : "Rechazar",
            settingsBtnText: window.AIZ.translate
                ? window.AIZ.translate("Personalizar")
                : "Personalizar",
            floatingBtnTooltip: window.AIZ.translate
                ? window.AIZ.translate("Configurar cookies")
                : "Configurar cookies",
            prefsTitle: window.AIZ.translate
                ? window.AIZ.translate(
                      "Seleccione las cookies que desea aceptar"
                  )
                : "Seleccione las cookies que desea aceptar",
            closeText: window.AIZ.translate
                ? window.AIZ.translate("Cerrar")
                : "Cerrar",
        },
        cookieTypes: [
            {
                type: window.AIZ.translate
                    ? window.AIZ.translate("Necesarias")
                    : "Necesarias",
                value: "necessary",
                description: window.AIZ.translate
                    ? window.AIZ.translate(
                          "Estas cookies son esenciales para que el sitio web funcione correctamente y no se pueden desactivar."
                      )
                    : "Estas cookies son esenciales para que el sitio web funcione correctamente y no se pueden desactivar.",
                required: !0,
            },
            {
                type: window.AIZ.translate
                    ? window.AIZ.translate("Preferencias")
                    : "Preferencias",
                value: "preferences",
                description: window.AIZ.translate
                    ? window.AIZ.translate(
                          "Estas cookies permiten al sitio web recordar información que cambia la forma en que se comporta o se ve, como su idioma preferido o la región en la que se encuentra."
                      )
                    : "Estas cookies permiten al sitio web recordar información que cambia la forma en que se comporta o se ve, como su idioma preferido o la región en la que se encuentra.",
                required: !1,
            },
            {
                type: window.AIZ.translate
                    ? window.AIZ.translate("Analíticas")
                    : "Analíticas",
                value: "analytics",
                description: window.AIZ.translate
                    ? window.AIZ.translate(
                          "Estas cookies nos permiten contar las visitas y fuentes de tráfico para medir y mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más populares y cómo se mueven los visitantes por el sitio."
                      )
                    : "Estas cookies nos permiten contar las visitas y fuentes de tráfico para medir y mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más populares y cómo se mueven los visitantes por el sitio.",
                required: !1,
            },
            {
                type: window.AIZ.translate
                    ? window.AIZ.translate("Marketing")
                    : "Marketing",
                value: "marketing",
                description: window.AIZ.translate
                    ? window.AIZ.translate(
                          "Estas cookies se utilizan para rastrear a los visitantes en los sitios web. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual."
                      )
                    : "Estas cookies se utilizan para rastrear a los visitantes en los sitios web. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual.",
                required: !1,
            },
        ],
    },
    init: function () {
        this.hasConsent()
            ? this.config.options.showFloatingBtn && this.showFloatingButton()
            : this.showBanner(),
            this.initGoogleConsentMode();
    },
    hasConsent: function () {
        return "true" === this.getCookie(this.consentName);
    },
    showBanner: function () {
        setTimeout(() => {
            const e = this.createBanner();
            document.body.appendChild(e);
            const n = e.querySelector("#gdpr-accept-btn"),
                t = e.querySelector("#gdpr-reject-btn"),
                o = e.querySelector("#gdpr-settings-btn"),
                i = e.querySelector("#gdpr-close-icon");
            n &&
                n.addEventListener("click", () => {
                    this.acceptAll(), this.hideBanner();
                }),
                t &&
                    t.addEventListener("click", () => {
                        this.rejectAll(),
                            this.hideBanner(),
                            this.config.options.showFloatingBtn &&
                                this.showFloatingButton();
                    }),
                o &&
                    o.addEventListener("click", () => {
                        this.showPreferences();
                    }),
                i &&
                    i.addEventListener("click", () => {
                        this.hideBanner(),
                            this.config.options.showFloatingBtn &&
                                this.showFloatingButton();
                    });
        }, this.config.options.delay);
    },
    createBanner: function () {
        const e = document.createElement("div");
        (e.id = "gdpr-cookie-banner"),
            (e.className = `gdpr-banner ${
                this.config.options.fullWidth ? "gdpr-full-width" : ""
            } ${this.config.options.position}`),
            (e.style.backgroundColor = this.config.theme.backgroundColor),
            (e.style.color = this.config.theme.textColor);
        let n = `\n      <div class="gdpr-banner-content">\n        ${
            this.config.options.showCloseIcon
                ? '<div id="gdpr-close-icon" class="gdpr-close-icon">&times;</div>'
                : ""
        }\n        <div class="gdpr-main-content">\n          <div class="gdpr-cookie-icon">\n            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40">\n              <g fill="none" fill-rule="evenodd">\n                <circle cx="20" cy="20" r="19" fill="#F7B239"/>\n                <circle cx="20" cy="20" r="17" fill="#E09B2D"/>\n                <circle cx="12" cy="14" r="2" fill="#8E572C"/>\n                <circle cx="24" cy="12" r="2" fill="#8E572C"/>\n                <circle cx="16" cy="24" r="2" fill="#8E572C"/>\n                <circle cx="28" cy="22" r="2" fill="#8E572C"/>\n                <circle cx="20" cy="18" r="2" fill="#8E572C"/>\n                <path fill="#C17A3F" d="M20,40C9,40,0,31,0,20S9,0,20,0s20,9,20,20S31,40,20,40z M20,2C10.1,2,2,10.1,2,20s8.1,18,18,18 s18-8.1,18-18S29.9,2,20,2z"/>\n              </g>\n            </svg>\n          </div>\n          <p>\n            ${
            this.config.content.description
        }\n            <a href="${
            this.config.content.privacyPolicyLink
        }" target="_blank" rel="noopener noreferrer">${
            this.config.content.privacyPolicyText
        }</a>.\n            <br>\n            <span style="font-size: 0.85rem; opacity: 0.9;">\n              Enlaces útiles: \n              <a href="${
            this.config.content.termsLink
        }" target="_blank" rel="noopener noreferrer" style="margin: 0 5px;">${
            this.config.content.termsText
        }</a> |\n              <a href="${
            this.config.content.cookiePolicyLink
        }" target="_blank" rel="noopener noreferrer" style="margin: 0 5px;">${
            this.config.content.cookiePolicyText
        }</a> |\n              <a href="${
            this.config.content.privacyPolicyLink
        }" target="_blank" rel="noopener noreferrer" style="margin: 0 5px;">${
            this.config.content.privacyPolicyText
        }</a>\n            </span>\n          </p>\n        </div>\n        <div class="gdpr-buttons">\n          ${
            this.config.options.showRejectBtn
                ? `<button id="gdpr-reject-btn" class="gdpr-btn gdpr-btn-reject">${this.config.content.rejectBtnText}</button>`
                : ""
        }\n          <button id="gdpr-settings-btn" class="gdpr-btn gdpr-btn-settings">${
            this.config.content.settingsBtnText
        }</button>\n          <button id="gdpr-accept-btn" class="gdpr-btn gdpr-btn-accept">${
            this.config.content.acceptBtnText
        }</button>\n        </div>\n      </div>\n    `;
        return (e.innerHTML = n), e;
    },
    hideBanner: function () {
        const e = document.getElementById("gdpr-cookie-banner");
        e &&
            (e.classList.add("gdpr-banner-hide"),
            setTimeout(() => {
                e.remove();
            }, 300));
        const n = document.getElementById("gdpr-preferences-panel");
        n && n.remove();
    },
    showFloatingButton: function () {
        if (document.getElementById("gdpr-floating-button")) return;
        const e = document.createElement("button");
        (e.id = "gdpr-floating-button"),
            (e.className = `gdpr-floating-btn ${this.config.options.floatingBtnPosition}`),
            (e.title = this.config.content.floatingBtnTooltip),
            (e.innerHTML =
                '\n      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40">\n        <g fill="none" fill-rule="evenodd">\n          <circle cx="20" cy="20" r="20" fill="#D5A150"></circle>\n          <path fill="#AD712C" d="M32.44 4.34a19.914 19.914 0 0 1 4.34 12.44c0 11.046-8.954 20-20 20a19.914 19.914 0 0 1-12.44-4.34C8.004 37.046 13.657 40 20 40c11.046 0 20-8.954 20-20 0-6.343-2.954-11.996-7.56-15.66z"></path>\n          <path fill="#C98A2E" d="M10.903 11.35c-.412 0-.824-.157-1.139-.471a4.432 4.432 0 0 1 0-6.26 4.397 4.397 0 0 1 3.13-1.297c1.183 0 2.294.46 3.13 1.296a1.61 1.61 0 0 1-2.276 2.277 1.2 1.2 0 0 0-.854-.354a1.208 1.208 0 0 0-.854 2.06 1.61 1.61 0 0 1-1.137 2.749z"></path>\n          <circle cx="12.894" cy="7.749" r="2.817" fill="#674230"></circle>\n        </g>\n      </svg>\n    '),
            document.body.appendChild(e),
            e.addEventListener("click", () => {
                this.showPreferences(), e.remove();
            });
    },
    showPreferences: function () {
        const e = document.getElementById("gdpr-cookie-banner");
        e && e.remove();
        const n = document.getElementById("gdpr-floating-button");
        n && n.remove();
        const t = document.createElement("div");
        (t.id = "gdpr-preferences-panel"),
            (t.style.backgroundColor = this.config.theme.backgroundColor),
            (t.style.color = this.config.theme.textColor);
        const o = this.getPreferences();
        let i = `\n      <div class="gdpr-prefs-header">\n        <h3>${this.config.content.prefsTitle}</h3>\n        <button id="gdpr-prefs-close" class="gdpr-prefs-close">&times;</button>\n      </div>\n      <div class="gdpr-prefs-content">\n    `;
        this.config.cookieTypes.forEach((e) => {
            const n =
                e.required ||
                !o ||
                o.includes(e.value) ||
                this.config.options.allPrefsChecked;
            i += `\n        <div class="gdpr-cookie-type">\n          <div class="gdpr-cookie-type-header">\n            <label class="gdpr-switch">\n              <input type="checkbox" data-cookie-type="${
                e.value
            }" \n                ${
                e.required ? "disabled checked" : ""
            } \n                ${
                n ? "checked" : ""
            }>\n              <span class="gdpr-slider"></span>\n            </label>\n            <h4>${
                e.type
            }</h4>\n          </div>\n          <p class="gdpr-cookie-type-desc">${
                e.description
            }</p>\n        </div>\n      `;
        }),
            (i += `\n      </div>\n      <div class="gdpr-prefs-footer">\n        <button id="gdpr-save-prefs" class="gdpr-btn gdpr-btn-save" style="background-color: ${this.config.theme.mainColor}; color: ${this.config.theme.btnTextColor};">\n          ${this.config.content.acceptBtnText}\n        </button>\n      </div>\n    `),
            (t.innerHTML = i),
            document.body.appendChild(t);
        const s = t.querySelector("#gdpr-prefs-close"),
            a = t.querySelector("#gdpr-save-prefs");
        s.addEventListener("click", () => {
            t.remove(),
                this.config.options.showFloatingBtn &&
                    this.showFloatingButton();
        }),
            a.addEventListener("click", () => {
                this.savePreferences(),
                    t.remove(),
                    this.config.options.showFloatingBtn &&
                        this.showFloatingButton();
            });
    },
    savePreferences: function () {
        const e = document.querySelectorAll(
                '#gdpr-preferences-panel input[type="checkbox"]'
            ),
            n = [];
        e.forEach((e) => {
            e.checked && n.push(e.dataset.cookieType);
        }),
            this.setCookie(
                this.prefsName,
                JSON.stringify(n),
                this.config.options.expiryDays
            ),
            this.setCookie(
                this.consentName,
                "true",
                this.config.options.expiryDays
            ),
            this.updateGoogleConsent(n),
            this.executeScriptsBasedOnPreferences(n);
    },
    acceptAll: function () {
        const e = this.config.cookieTypes.map((e) => e.value);
        this.setCookie(
            this.prefsName,
            JSON.stringify(e),
            this.config.options.expiryDays
        ),
            this.setCookie(
                this.consentName,
                "true",
                this.config.options.expiryDays
            ),
            this.updateGoogleConsent(e),
            this.executeScriptsBasedOnPreferences(e);
    },
    rejectAll: function () {
        const e = this.config.cookieTypes
            .filter((e) => e.required)
            .map((e) => e.value);
        this.setCookie(
            this.prefsName,
            JSON.stringify(e),
            this.config.options.expiryDays
        ),
            this.setCookie(
                this.consentName,
                "true",
                this.config.options.expiryDays
            ),
            this.updateGoogleConsent(e);
    },
    getPreferences: function () {
        const e = this.getCookie(this.prefsName);
        return e ? JSON.parse(e) : null;
    },
    isPreferenceAccepted: function (e) {
        const n = this.getPreferences();
        return n && n.includes(e);
    },
    setCookie: function (e, n, t) {
        const o = new Date();
        o.setTime(o.getTime() + 24 * t * 60 * 60 * 1e3);
        const i = "expires=" + o.toUTCString();
        document.cookie = e + "=" + n + ";" + i + ";path=/;SameSite=Lax";
    },
    getCookie: function (e) {
        const n = e + "=",
            t = document.cookie.split(";");
        for (let o = 0; o < t.length; o++) {
            let e = t[o];
            for (; " " === e.charAt(0); ) e = e.substring(1, e.length);
            if (0 === e.indexOf(n)) return e.substring(n.length, e.length);
        }
        return null;
    },
    initGoogleConsentMode: function () {
        if ("function" != typeof gtag) return;
        const e = this.getPreferences();
        if (e) {
            const n = e.includes("analytics"),
                t = e.includes("marketing");
            gtag("consent", "update", {
                ad_storage: t ? "granted" : "denied",
                ad_user_data: t ? "granted" : "denied",
                ad_personalization: t ? "granted" : "denied",
                analytics_storage: n ? "granted" : "denied",
            });
        }
    },
    updateGoogleConsent: function (e) {
        if ("function" != typeof gtag) return;
        const n = e.includes("analytics"),
            t = e.includes("marketing");
        gtag("consent", "update", {
            ad_storage: t ? "granted" : "denied",
            ad_user_data: t ? "granted" : "denied",
            ad_personalization: t ? "granted" : "denied",
            analytics_storage: n ? "granted" : "denied",
        });
    },
    executeScriptsBasedOnPreferences: function (e) {
        const n = e.includes("analytics"),
            t = e.includes("marketing"),
            o = e.includes("preferences");
        if (
            (this.setCookie(
                "cookie_consent_given",
                "1",
                this.config.options.expiryDays
            ),
            this.setCookie(
                "cookie_consent_analytics",
                n ? "1" : "0",
                this.config.options.expiryDays
            ),
            this.setCookie(
                "cookie_consent_marketing",
                t ? "1" : "0",
                this.config.options.expiryDays
            ),
            this.setCookie(
                "cookie_consent_preferences",
                o ? "1" : "0",
                this.config.options.expiryDays
            ),
            window.updateConsentMode &&
                window.updateConsentMode({
                    analytics: n,
                    marketing: t,
                    preferences: o,
                }),
            n)
        ) {
            const e = document.createElement("script");
            (e.defer = !0),
                (e.src = "https://static.cloudflareinsights.com/beacon.min.js"),
                document.head.appendChild(e);
                // console.log("Cargando scripts de analítica incluyendo Cloudflare Insights..."); // DEBUG: Descomentar solo en local
        }
        // t && console.log("Cargando scripts de marketing..."); // DEBUG: Descomentar solo en local
        // o && console.log("Cargando scripts de preferencias..."); // DEBUG: Descomentar solo en local
    },
    showConfiguredCookies: function () {
        const e = this.getPreferences();
        let n = `\n      <div class="gdpr-configured-cookies" style="background: ${
            this.config.theme.backgroundColor
        }; color: ${
            this.config.theme.textColor
        }; padding: 20px; border-radius: 5px; max-width: 600px; margin: 20px auto;">\n        <h3 style="margin-bottom: 15px;">${
            window.AIZ.translate
                ? window.AIZ.translate("Cookies Configuradas")
                : "Cookies Configuradas"
        }</h3>\n        <ul style="list-style: none; padding: 0;">\n    `;
        this.config.cookieTypes.forEach((t) => {
            const o = e.includes(t.value);
            n += `\n        <li style="margin-bottom: 10px; display: flex; align-items: center;">\n          <span style="margin-right: 10px;">\n            ${
                o ? "✓" : "✗"
            }\n          </span>\n          <div>\n            <strong>${
                t.type
            }</strong>\n            <p style="margin: 5px 0; font-size: 0.9em;">${
                t.description
            }</p>\n          </div>\n        </li>\n      `;
        }),
            (n += `\n        </ul>\n        <button onclick="this.parentElement.remove()" style="background-color: ${this.config.theme.mainColor}; color: ${this.config.theme.btnTextColor}; border: none; padding: 8px 15px; border-radius: 4px; margin-top: 10px; cursor: pointer;">\n          ${this.config.content.closeText}\n        </button>\n      </div>\n    `);
        const t = document.createElement("div");
        (t.style.position = "fixed"),
            (t.style.top = "50%"),
            (t.style.left = "50%"),
            (t.style.transform = "translate(-50%, -50%)"),
            (t.style.zIndex = "9999"),
            (t.innerHTML = n),
            document.body.appendChild(t);
    },
    showActiveCookies: function () {
        const e = this.getPreferences(),
            n = [];
        n.push({
            type:
                this.config.cookieTypes.find((e) => "necessary" === e.value)
                    ?.type || "Necesarias",
            status: "Activas",
            description:
                "Estas cookies son esenciales para el funcionamiento del sitio.",
        }),
            this.config.cookieTypes.forEach((t) => {
                "necessary" !== t.value &&
                    e &&
                    e.includes(t.value) &&
                    n.push({
                        type: t.type,
                        status: "Activas",
                        description: t.description,
                    });
            }),
            !e &&
                this.hasConsent() &&
                this.config.cookieTypes.forEach((e) => {
                    "necessary" !== e.value &&
                        n.push({
                            type: e.type,
                            status: "Activas",
                            description: e.description,
                        });
                });
        let t = `\n      <div data-active-cookies-modal style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 9998; display: flex; align-items: center; justify-content: center;">\n        <div style="background-color: ${this.config.theme.backgroundColor}; color: ${this.config.theme.textColor}; padding: 30px; border-radius: 8px; max-width: 600px; width: 90%; max-height: 80%; overflow-y: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">\n          <h3 style="margin-top: 0; margin-bottom: 20px; color: ${this.config.theme.mainColor};">Cookies Activas</h3>\n          <p style="margin-bottom: 20px;">Estas son las cookies que están actualmente activas en tu navegador:</p>\n    `;
        n.forEach((e) => {
            t += `\n        <div style="border: 1px solid #e0e0e0; border-radius: 6px; padding: 15px; margin-bottom: 15px;">\n          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">\n            <strong style="color: ${this.config.theme.mainColor};">${e.type}</strong>\n            <span style="background-color: #4CAF50; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">\n              ${e.status}\n            </span>\n          </div>\n          <p style="margin: 0; font-size: 14px; color: #666;">${e.description}</p>\n        </div>\n      `;
        }),
            (t += `\n          <div style="text-align: center; margin-top: 20px;">\n            <button onclick="document.querySelector('[data-active-cookies-modal]').remove()" \n              style="background-color: ${this.config.theme.mainColor}; color: ${this.config.theme.btnTextColor}; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; font-weight: 500;">\n              Cerrar\n            </button>\n          </div>\n        </div>\n      </div>\n    `),
            document.body.insertAdjacentHTML("beforeend", t);
    },
};
document.addEventListener("DOMContentLoaded", function () {
    GranPlazaCookies.init();
});
