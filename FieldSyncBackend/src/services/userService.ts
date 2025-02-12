import axios from 'axios';
import { Request, Response } from 'express';

const externalUserUrl = 'https://jsonplaceholder.typicode.com';

class UserService {
  public async downloadUsers(req: Request, res: Response): Promise<void> {
    const http = axios.create({
      baseURL: externalUserUrl
    });

    try {
      let users = await http.get('/users');      

      res.status(200).json(users.data);
    } catch (error: any) {

      console.log(error);
      res.status(500).json({ message: 'Failed to get users' });
    }  
  }
}
export default new UserService();