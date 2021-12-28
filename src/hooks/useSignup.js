import { SIGN_UP } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useSignUp = () => {
    const [mutate, result] = useMutation(SIGN_UP);

    const signUp = async ({ username, password }) => {
        const data = await mutate({
            variables: { username, password }
        });
        return data;
    };
    return [signUp, result];
};

export default useSignUp;