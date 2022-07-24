import express, {Request, Response} from 'express';
import { HomeController } from './controller/home.controller';
import { PostCodeController } from './controller/postCode.controller';
import cors from 'cors'

const options: cors.CorsOptions = {
  origin:'*', 
  credentials:true,
};


class Server {
//  private postController: PostController;
  private app: express.Application;
  private homeController: HomeController;
  private postCodeController: PostCodeController;
  

  constructor(){
    this.app = express(); // init the application
    this.configuration();
    this.homeController = new HomeController;
    this.postCodeController = new PostCodeController;
    this.routes();
  }


  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment 
   * variables it takes the default port 3000
   */
  public configuration() {
    this.app.set('port', process.env.PORT || 8000);
    this.app.use(cors(options));
    this.app.use(express.json());
 
  }

  
public async routes(){


    this.app.use('/home', this.homeController.router)
    this.app.use('/postCode', this.postCodeController.router)
    this.app.get( "/", (req: Request, res: Response ) => {
        res.send( "Hello world!" );
      });
}


//    this.app.use(`/api/posts/`,this.postController.router); // Configure the new routes of the controller post


  /**
   * Used to start the server
   */
  
  public start(){
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
  
}

const server = new Server(); // Create server instance
server.start(); // Execute the server