import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
    return (
        <div className="App">
            <SignUp 
                signInForceRedirectUrl={'/'}
            />
        </div>
    );
}

export default SignUpPage