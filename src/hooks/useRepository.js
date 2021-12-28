/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
    const [repository, setRepository] = useState();

    console.log('ID', id);

    const { data, error, loading } = useQuery(GET_REPOSITORY, {
        fetchPolicy: "cache-and-network",
        variables: { id: id },
    });

    const fetchRepository = async () => {
        if (data) {
            setRepository(data.repository);
        }
    };

    useEffect(() => {
        if (data) {
            fetchRepository();
        }
    }, [data]);

    return { repository, loading, refetch: fetchRepository };
};

export default useRepository;