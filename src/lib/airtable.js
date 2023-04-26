import axios from "axios";

const airtableClient = axios.create({
  baseURL: `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/${process.env.REACT_APP_AIRTABLE_TABLE}/`,
  headers: {
    post: { "Content-Type": "application/json" },
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
  },
});
// airtableClient.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers['Authorization'] = 'Bearer API_KEY';

export default airtableClient;
