/**
 * Fetch Helpers - Reemplazo moderno de jQuery Ajax
 * Más ligero y sin dependencia de jQuery para peticiones HTTP
 */
(function(window) {
    'use strict';

    const FetchHelper = {
        // Obtener CSRF token
        getCSRF: function() {
            const meta = document.querySelector('meta[name="csrf-token"]');
            return meta ? meta.getAttribute('content') : '';
        },

        // Headers por defecto
        defaultHeaders: function(isFormData = false) {
            const headers = {
                'X-CSRF-TOKEN': this.getCSRF(),
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            };
            if (!isFormData) {
                headers['Content-Type'] = 'application/json';
            }
            return headers;
        },

        // GET request
        get: async function(url, options = {}) {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: this.defaultHeaders(),
                    ...options
                });
                return await this.handleResponse(response);
            } catch (error) {
                console.error('Fetch GET error:', error);
                throw error;
            }
        },

        // POST request con JSON
        post: async function(url, data = {}, options = {}) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: this.defaultHeaders(),
                    body: JSON.stringify(data),
                    ...options
                });
                return await this.handleResponse(response);
            } catch (error) {
                console.error('Fetch POST error:', error);
                throw error;
            }
        },

        // POST request con FormData
        postForm: async function(url, formData, options = {}) {
            try {
                // Para FormData, no establecer Content-Type (el navegador lo hace)
                const headers = {
                    'X-CSRF-TOKEN': this.getCSRF(),
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                };
                
                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: formData,
                    ...options
                });
                return await this.handleResponse(response);
            } catch (error) {
                console.error('Fetch POST Form error:', error);
                throw error;
            }
        },

        // Manejar respuesta
        handleResponse: async function(response) {
            const contentType = response.headers.get('content-type');
            
            if (!response.ok) {
                const error = new Error(`HTTP ${response.status}`);
                error.status = response.status;
                error.response = response;
                throw error;
            }

            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        },

        // Wrapper compatible con jQuery Ajax (para migración gradual)
        ajax: function(options) {
            const url = options.url;
            const method = (options.method || options.type || 'GET').toUpperCase();
            const data = options.data;
            
            let fetchPromise;

            if (method === 'GET') {
                fetchPromise = this.get(url);
            } else if (data instanceof FormData) {
                fetchPromise = this.postForm(url, data);
            } else if (typeof data === 'object' && !(data instanceof FormData)) {
                fetchPromise = this.post(url, data);
            } else {
                fetchPromise = this.post(url, data);
            }

            return fetchPromise
                .then(responseData => {
                    if (options.success) {
                        options.success(responseData);
                    }
                    return responseData;
                })
                .catch(error => {
                    if (options.error) {
                        options.error(error);
                    }
                    throw error;
                });
        }
    };

    // Exponer globalmente
    window.FetchHelper = FetchHelper;

    // Alias cortos
    window.fetchGet = FetchHelper.get.bind(FetchHelper);
    window.fetchPost = FetchHelper.post.bind(FetchHelper);
    window.fetchForm = FetchHelper.postForm.bind(FetchHelper);

})(window);
