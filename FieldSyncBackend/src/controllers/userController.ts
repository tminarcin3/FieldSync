import { Request, Response } from 'express';
import { User } from '../entity/User';
import { AppDataSource } from "../data-source";
import { UserResponse } from '../dto/UserResponse';
import * as cache from 'memory-cache';

class UserController {

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const data = cache.get("userData");
      if(data) 
      {
        console.log('serving from cache');
        res.status(200).json(data);

      }
      else
      {
        const repository = AppDataSource.getRepository(User);
        const users = await repository.find();
        cache.put("userData", users, 6000);
        res.status(200).json(users);
      }
      
    } catch (error: any) {

      console.log(error);
      res.status(500).json({ message: 'Failed to get users' });
    }  
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const repository = AppDataSource.getRepository(User);
      const { name, company, email, phone } = req.body;
      const user = new User();
      user.name = name;
      user.company = company;
      user.email = email;
      user.phone = phone;

      const found = await repository.findOneBy({
        name: name,
        email: email 
      });

      if(!found)
      {
        await repository.save(user);

        // Use the UserResponse DTO to structure the data being sent in the response
        const userDataSent = new UserResponse()
        userDataSent.name = user.name;
        userDataSent.company = user.company;
        userDataSent.email= user.email;
        userDataSent.phone = user.phone;

        res.status(200).json({ message: "User created successfully", userDataSent });
      } else {
        res.status(422).json({ message: "User already exists"});
      }


    } catch (error: any) {

      console.log(error);
      res.status(500).json({ message: 'Failed to save user' });
    }
  }
}

export default new UserController();