// code snippet for appwrite authentication services just ctrl+c and ctrl+v for other project
import config from "../config/config";
import { Client, Account, ID } from 'appwrite'

// creating class so that services are made like that if we need to change appwrite to any other services then only code of method need to change not whole class
export class AuthServices {
  // thing are change compare to documentatiaon in appwrite

  client = new Client();
  account;

  // use of constructor to creating client and account when the object is being called
  constructor() {
    // setting client things so we can create account base on that otherwise we are not allow to do that
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    // creating account  object so that we can use it to create user
    this.account = new Account(this.client);
  }

  // creating method (method syntax is same for all like appwrite, firefox but we need to change the code inside the method)
  // method response are promise so we are using async and await
  // all the return statements are handle at frontend 
  async createAccount({ email, password, name }) { // sign up
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name); //syntax of create account in app write
      if (userAccount) {
        // if account is created then simply logging in 
        return this.login(email, password);
      }
      else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite services :: createAccount :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite services :: login :: error", error);
      throw error;
    }
  }

  async logout() {
    try {
      // deleteSession() require userId and delete only one session
      // deleteSessions() deleting all the session
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite services :: logout :: error", error);
    }
  }

  // check for direct aacess without login
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite services :: getUser :: error", error);
    }
    // try catch fail then null will be return
    return null;
  }


}
// creating object of class and exporing it
const authServices = new AuthServices();
export default authServices;