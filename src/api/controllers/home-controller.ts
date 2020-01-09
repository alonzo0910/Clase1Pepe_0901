import * as express from 'express'
import { Request, Response } from 'express'
import sessionTrueMiddleware from '../middlewares/session-true'
import IControllerBase from '../interfaces/controller-base'
import { loadCss, loadJs } from '../helpers/view'
import { constants } from '../../configs/constants'

class HomeController implements IControllerBase {
  public path = '/'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/', sessionTrueMiddleware, this.index)
    this.router.get('/demo', sessionTrueMiddleware, this.demo)
  }

  index = (req: Request, res: Response) => {
    let locals = {
      title: 'Inicio',
      constants: constants,
      csss: loadCss([
        'assets/css/styles',
 
      ]), 
      jss: loadJs([
        'assets/js/app',
      ]), 
    }
    res.status(200).render('home/index', locals)
  }

  demo = (req: Request, res: Response) => {
    let locals = {
      title: 'Estamos en demo',
      constants: constants,
      csss: loadCss([
        'assets/css/styles',   
        'assets/css/demo',  
       ]), 
      jss: loadJs([
        'assets/js/app',
      ]), 
    }
    res.status(200).render('home/demo', locals)
  }

}

export default HomeController