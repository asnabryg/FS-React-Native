
import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { SIGN_IN } from "../graphql/mutations";
import AuthStorage from "../utils/authStorage";

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
    const authStorage = useContext(AuthStorage);

    const signIn = async ({ username, password }) => {
        const data = await mutate({ variables: { username, password } });
        
        await authStorage.setAccesstoken(data.data.authorize.accessToken);

        return data;
    };

    return [signIn, result];
};

export default useSignIn;