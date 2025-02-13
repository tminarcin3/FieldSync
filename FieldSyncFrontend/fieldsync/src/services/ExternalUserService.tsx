const BASE_URL = "https://jsonplaceholder.typicode.com";

async function GetExternalUsers(abortControllerRef: React.MutableRefObject<AbortController | null>) {
  abortControllerRef.current?.abort();
  abortControllerRef.current = new AbortController();
  
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      signal: abortControllerRef.current?.signal
    });
    const externalUserResponse = await response.json();
  
    return externalUserResponse;
  } catch(error: any) {

    if(error.name === 'AbortError')
    {
      return;
    }
    console.log("Error fetching external users. " + error);

    throw error;
  }
}



export default GetExternalUsers;