import axios from 'axios';

const apiUrl = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97&limit=150';

function getData(data) {
  return axios.post(apiUrl, { data })
    .then(res => res.data).catch((error) => {
      console.log(error);
    });
}
export default getData;
