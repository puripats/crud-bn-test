import { Router, Response, Request } from "express";
import { HomeService } from "../service/home.service";

export class HomeController {
  public router: Router;
  private homeService: HomeService;

  constructor(){
    this.router = Router();
    this.homeService = new HomeService();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    try {
      const homeList = await this.homeService.index(req['query'])
      res.status(200).send(homeList);
    } catch (e){

    }
  } 

  public create = async (req: Request, res: Response) => {
    try {
      const body = req['body'];
      const sendBody =  await this.homeService.create(body)
      res.status(200).send({Success:"success"});
    } catch (e){
      res.status(500).send(e);
    }
  }

  public update = async (req: Request, res: Response) => {
    try{
      const id = req.params.id;
      const body = req['body'];
      res.status(200).send(this.homeService.update(body,id));
    } catch(e){
      res.status(500).send(e);
    }

  }

  public delete = async (req: Request, res: Response) => {
    try{
      const id = req.params.id
      res.status(200).send(this.homeService.delete(id));
    } catch(e) {
      res.status(500).send(e);
    }

  } 

  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('/', this.index);
    this.router.post('/', this.create);
    this.router.patch('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}