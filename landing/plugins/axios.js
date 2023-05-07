export default function ({$axios, $cookies, app, redirect}) {
  $axios.onRequest(config => {
    $axios.setHeader('Authorization', $cookies.get('token'));
  });
}
