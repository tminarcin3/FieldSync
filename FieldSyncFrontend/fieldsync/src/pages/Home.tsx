import { useState, useRef } from "react";
import UserList from '../user/UserList';
import { User } from '../user/User';
import { AddUser, GetUsers } from '../services/UserService';
import Button from "../components/Button";
import GetExternalUsers from "../services/ExternalUserService";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState();
  const [home, setHome] = useState(true);
  const [save, setSave] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [newUsers, setNewUsers] = useState<User[]>([]);
  const [newUsersAdded, setNewUsersAdded] = useState(false);
  const [usersFetched, setUsersFetched] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  async function loadUsers() {
    setIsLoading(true);
    try 
    {
      const data = await GetUsers(abortControllerRef) as User[];
      setUsers(data);
      setUsersFetched(true);
    } 
    catch(e: any) 
    { 
      setError(e);
    } finally {
      setIsLoading(false);
      //reset to home page after loading new users
      setHomeActive();
      setNewUsersAdded(false);
    }
  };

  async function handleUserDownload()
  {
    setIsLoading(true);
    try 
    {
      const data = await GetExternalUsers(abortControllerRef) as User[];
      //populate new users table for saving later
      setNewUsers(data);
      setNewUsersAdded(false);
      setUsersFetched(false);
    } 
    catch(e: any) 
    { 
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function addUsers() {
    if(newUsers.length === 0)
    {
      console.log("no users to add");
      //reset to home page after saving
      setHomeActive();
      return;
    }
    
    setIsLoading(true);

    try 
    {
      //save user one at a time since api only takes one user
      newUsers.map(async user => {
        await AddUser(user) as User;
      });
      setNewUsersAdded(true);
      setUsersFetched(false);
      setNewUsers([]);
    } 
    catch(e: any) 
    {
      setError(e);
    } finally {
      setIsLoading(false);
      //reset to home page after saving
      setHomeActive();
    }
  }

  function setHomeActive() {
    setSave(false);
    setFetch(false);
    setHome(true);
  }

  function setSaveActive() {
    setNewUsersAdded(false);
    setUsersFetched(false);
    setHome(false);
    setFetch(false);
    setSave(true);
  }

  function setFetchActive() {
    setNewUsersAdded(false);
    setUsersFetched(false);
    setHome(false);
    setSave(false);
    setFetch(true);
  }


  return (
    <div className="homePage">
      <div className="navButtons">
        <Button className={`navButton one ${home === true && "active"}`} message="" 
          title="Home" handleClick={setHomeActive}/>
        <Button className={`navButton two ${save === true && "active"}`} message="" 
          title="Save" handleClick={setSaveActive}/>
        <Button className={`navButton three ${fetch === true && "active"}`} message="" 
          title="Fetch" handleClick={setFetchActive}/>
      </div>

      {isLoading && (
        <div className="loading">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}

      {save && (
        <div className="savePrompt">
          <Button message="Would you like to save the downloaded users to the current users?" 
            title="Save Users" className="saveButton" handleClick={addUsers}/>
        </div>
      )}

      {fetch && (
        <div className="fetchPrompt">
          <Button message="Would you like to fetch new users?" 
            title="Fetch Users" className="fetchButton" handleClick={loadUsers}/>
        </div>
      )}

      <div className="downloadButtonDiv">    
        <Button className="downloadButton" message="" title="Download" handleClick={handleUserDownload} />
      </div> 

      {newUsersAdded && (
        <div className="addUserFeedback">
          <p>Users were added!</p>
        </div>
      )}

      {usersFetched && (
        <div className="fetchUserFeedback">
          <p>Users were fetched from database!</p>
        </div>
      )}
      
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      

      

      {users && users.length > 0 && (
          <div>
          <h3>Current Users</h3>
          <UserList users={users} />
          </div>
      )}
      
      {newUsers && newUsers.length > 0 && (
        <div>
          <h3>Downloaded Users</h3>
          <UserList users={newUsers} />
          </div>
      )}
      {users && users.length === 0 && (<p>There are no current users to display.</p>)}
    </div>
  );
}