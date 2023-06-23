import {useEffect, useState} from 'react';
import axios from 'axios';

import {apiUrls} from "../../SystemConfig";

const useDocuments = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        axios.get(apiUrls.document())
            .then(response => {
                setDocuments(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []); // empty array means this effect runs once on mount

    return {
        documents,
    };
}

export default useDocuments;
