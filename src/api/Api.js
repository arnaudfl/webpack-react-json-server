const getListUrl = () => 'api/users';
const getUserIdUpdateStatusUrl = userId => `api/users/${userId}/status`;

const fetchGetOptions = () => {
  return {
    credentials: 'same-origin',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    }
  };
};

const fetchPostOptions = data => ({
  credentials: 'same-origin',
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
  },
});

const Api = {
  list: () => {
    return fetch(
        getListUrl(),
        fetchGetOptions())
        .then(response => response.json())
        .then(responseJson => {
          return { isLoading: false, list: responseJson, error: '' };
        })
        .catch(error => {
          console.error(error);
          return { isLoading: false, list: [], error };
        });
  },
  updateStatus: (userId, status) => {
    return fetch(
        getUserIdUpdateStatusUrl(userId),
        fetchPostOptions({ newStatus: status }))
        .then(response => response.json())
        .then(responseJson => {
          return { message: responseJson.message, error: null };
        })
        .catch(error => {
          console.error(error);
          return { message: '',  error };
        });
  }
};

export default Api;