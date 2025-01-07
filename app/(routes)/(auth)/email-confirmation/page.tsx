// app/confirm-email/page.tsx
export default function ConfirmEmailPage() {
    return (
        <div className="max-w-6xl mx-auto p-4 min-h-[calc(100vh-261px)] flex justify-center items-center">
            <div className="max-w-md text-center">
                <h1 className="font-bold text-2xl mb-4">Confirm your email</h1>
                <p className="mb-4">Thank you for registering! Please check your email to confirm your account.</p>
                <p>If you did not receive the email, please check your spam folder or <a href="#" className="underline">resend the email</a>.</p>
            </div>
        </div>
    );
  }
  