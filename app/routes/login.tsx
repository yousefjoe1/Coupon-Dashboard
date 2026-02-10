import LoginForm from "~/featuers/auth/LoginForm"


const Login = async () => {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4" dir="rtl">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">تسجيل الدخول</h1>
                    <p className="text-sm text-muted-foreground">أدخل بياناتك للوصول إلى لوحة التحكم</p>
                </div>

                <LoginForm />
            </div>
        </div>
    )
}

export default Login