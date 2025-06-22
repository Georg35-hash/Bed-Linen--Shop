const API_URL = 'http://localhost:3000/api/user';

export async function userData(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Error ${res.status}`);
  }
  return data;
}

export async function updateUser(id, updatedData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to update user');
  }

  return res.json();
}
