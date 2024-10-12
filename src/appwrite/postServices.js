// instruction are same as auth.js and extra info  is added in this file
import config from "../config/config";
import { Client, Databases, Storage, Query, ID } from 'appwrite'
export class PostServices {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // create post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      // databases.createDocument('<DATABASE_ID>', '<COLLECTION_ID>', '<DOCUMENT_ID>', { content });
      console.log("Post data:", { title, content, featuredImage, status, userId });

      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,  // document id
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      )
    } catch (error) {
      console.log("Appwrite services :: createPost :: error", error)
    }
  }

  // update post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      )
    } catch (error) {
      console.log("Appwrite services :: updatePost :: error", error)
    }
  }

  // delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
      )
      return true;
    } catch (error) {
      console.log("Appwrite services :: deletePost :: error", error)
      return false;
    }
  }

  // get single post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
      )
    } catch (error) {
      console.log("Appwrite services :: getPost :: error", error)
      return false;
    }
  }

  // defining query to fetch only record which are active in collection syntax follows appwrite
  // get all postes
  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      )
    } catch (error) {
      console.log("Appwrite services :: getPosts :: error", error)
      return false;
    }
  }

  // upload file (we can create seprate file also for bucket services) //TODO: task:seperate files for database and bucket
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file,
      )
    } catch (error) {
      console.log("Appwrite services :: uploadFile :: error", error);
      return false
    }
  }

  // delete file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId
      )
      return true
    } catch (error) {
      console.log("Appwrite services :: deleteFile :: error", error);
      return false
    }
  }

  // file preview (not return promise so no need to do async and try catch block)
  // returns URL of image
  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      config.appwriteBucketId,
      fileId
    )
  }

}
const postServices = new PostServices();
export default postServices