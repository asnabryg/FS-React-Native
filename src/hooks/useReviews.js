
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = ({ id, first }) => {
    const [s, setS] = useState();
    const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: { id, first },
        onCompleted: ({repository}) => {
            setS(repository.reviews);
        }
    });

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data?.repository.reviews.pageInfo.hasNextPage;

        console.log(canFetchMore);

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                id,
                first,
            },
        });
    };

    return {
        reviews: s,
        repository: data?.repository,
        loading,
        fetchMore: handleFetchMore,
        ...result
    };
};

export default useReviews;