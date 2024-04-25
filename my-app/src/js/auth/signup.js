import { supabase } from "../name";

const form_signup = document.getElementById("form_signup");

form_signup.onsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(form_signup);
    const password = formData.get("password");
    const email = formData.get("email");
    const firstName = formData.get("first_name");
    const lastName = formData.get("last_name");
    const contactNumber = formData.get("contact_number");
    const fbLink = formData.get("fb_link");
    const collegeName = formData.get("college_name");
    const programName = formData.get("program_name");
    
    if (password == formData.get("password_confirmation")) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        let userId = signUpData?.user?.id;

        if (userId != null) {
            const { data: userInfoData, error: userInfoError } = await supabase
                .from('userinformation')
                .insert([
                    {
                        first_name: firstName,
                        last_name: lastName,
                        contact_number: contactNumber,
                        fb_link: fbLink,
                        user_id: userId,
                    },
                ]);

            const { data: collegeData, error: collegeError } = await supabase
                .from('college')
                .insert([
                    {
                        college_name: collegeName,
                        user_id: userId,
                    },
                ]);

            let college_id = collegeData?.id;

            const { data: programData, error: programError } = await supabase
                .from('program')
                .insert([
                    {
                        program_name: programName,
                        college_id: college_id,
                    },
                ]);

            console.log(userInfoData);
            console.log(userInfoError);
            console.log(collegeData);
            console.log(collegeError);
            console.log(programData);
            console.log(programError);
            alert("Sign Up Successful");
            
        } else {
            alert(`Error: ${signUpError.message}`);
            console.log(signUpError);
        }
    } else {
        alert("Password doesn't match");
    }
};
