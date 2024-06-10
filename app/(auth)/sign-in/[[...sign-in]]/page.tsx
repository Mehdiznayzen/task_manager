import { SignIn } from "@clerk/nextjs";

function SignUpPage() {
    return (
        <div className="App">
            <SignIn
                signUpForceRedirectUrl={'/'}
            />
        </div>
    );
}

export default SignUpPage