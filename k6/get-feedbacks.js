import http from 'k6/http';
import { check, sleep } from 'k6';

// Load environment variables from .env
const api = __ENV.API || process.env.API || "http://localhost:3000";

export let options = {
  vus: 10, // virtual users
  duration: '30s',
};

export default function () {
  let res = http.get(`${api}/feedback?page=1`);

  // Check if request was successful
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
