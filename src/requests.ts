export function returnOptions(method, payload, token) {
  return {
    method,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
}
