import axios from 'axios';

// إنشاء نسخة مخصصة من axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // حط رابط السيرفر بتاعك هنا
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- Interceptor للطلبات (Requests) ---
api.interceptors.request.use(
    (config) => {
        // جلب التوكن من اللوكال ستورج
        const token = localStorage.getItem('token');

        if (token) {
            // إضافة التوكن في الـ Headers
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- Interceptor للاستجابة (Responses) ---
api.interceptors.response.use(
    (response) => response, // لو الطلب نجح عديه عادي
    (error) => {
        // لو السيرفر رجع 401 (التوكن منتهي أو غير صالح)
        if (error.response && error.response.status === 401) {
            console.warn('Token expired or invalid. Logging out...');

            // تنظيف اللوكال ستورج وتوجيه المستخدم لصفحة اللوجين
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;