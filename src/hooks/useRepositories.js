/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, direction, filterValue, first }) => {
    // const [repositories, setRepositories] = useState();

    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: "cache-and-network",
        variables: {
            orderBy,
            direction,
            searchKeyword: filterValue,
            first
        }
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
        if (!canFetchMore) {
            return;
        }

        fetchMore({
            // query: GET_REPOSITORIES,
            variables: {
                after: data.repositories.pageInfo.endCursor,
                // eslint-disable-next-line no-undef
                variable: { orderBy, direction, filterValue, first },
            },
        });
    };

    // const fetchRepositories = async () => {
    //     if (data) {
    //         setRepositories(data.repositories);
    //     }
    // };

    // useEffect(() => {
    //     if (data) {
    //         fetchRepositories();
    //     }
    // }, [data]);

    // return { repositories, loading, refetch: fetchRepositories };

    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        ...result
    };
};

export default useRepositories;