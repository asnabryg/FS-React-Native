
import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const reviewRepository = async ({ repositoryName, ownerName, rating, text }) => {
        const data = await mutate({ variables: { repositoryName, ownerName, rating, text } });

        return data;
    };

    return [reviewRepository, result];
};

export default useReview;