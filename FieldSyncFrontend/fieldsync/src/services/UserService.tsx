import { User } from '../user/User';

const BASE_URL = "http://localhost:3001/v1";

async function GetUsers(abortControllerRef: React.MutableRefObject<AbortController | null>) {
  abortControllerRef.current?.abort();
  abortControllerRef.current = new AbortController();
  
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      signal: abortControllerRef.current?.signal
    });
    const userResponse = await response.json() as User[];
  
    return userResponse;
  } catch(error: any) {

    if(error.name === 'AbortError')
    {
      return;
    }
    console.log("Error fetching users. " + error);

    throw error;
  }
}

async function AddUser(user:User) {
  
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(response.status === 422)
    {
      console.log(`duplicate user found for ${user.name}`);
      return;
    }

    const addedUser = await response.json() as User;
    return addedUser;
  } catch(error: any) {
    console.log("Error adding user");

    if(error.name === 'AbortError')
    {
      console.log("Aborted");
      return;
    }

    throw error;
  }
}

export {GetUsers, AddUser}