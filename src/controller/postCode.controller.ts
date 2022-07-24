import { Router, Response, Request } from "express";
import { PostCodeService} from "../service/postCode.service";

export class PostCodeController {
    public router: Router;
    private postCodeService: PostCodeService;
  
    constructor(){
      this.router = Router();
      this.postCodeService = new PostCodeService();
      this.routes();
    }

    public getPostCode = async (req: Request, res: Response) => {
        try {
            const postCodeList = await this.postCodeService.getPostCode()
            res.status(200).send(postCodeList);
        } catch (e) {
            res.status(500).send(e);
        }
      } 

    public getPostCodeId = async (req: Request, res: Response) => {
        try {
            const postCodeId = await this.postCodeService.getPostCodeId(req.params.id)
            res.status(200).send(postCodeId);
        } catch (e) {
            res.status(500).send(e);
        }
    } 

    public routes(){
        this.router.get('/', this.getPostCode);
        this.router.get('/:id', this.getPostCodeId);
      }
}