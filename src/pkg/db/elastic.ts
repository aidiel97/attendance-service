import { Client } from '@elastic/elasticsearch';

export const getElasticsearchClient = () => {
    const client = new Client({
        node: 'http://localhost:9200',
        // auth: {
        //     username: 'your-username',
        //     password: 'your-password'
        // },
        // ssl: {
        //     rejectUnauthorized: false
        // }
    });

    return client;
};