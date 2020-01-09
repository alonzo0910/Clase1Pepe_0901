import * as express from 'express'
import { Request, Response } from 'express'
import sessionFalseMiddleware from '../middlewares/session-false'
import IControllerBase from '../interfaces/controller-base'
import { loadCss, loadJs } from '../helpers/view'
import { constants } from '../../configs/constants'

class LoginController implements IControllerBase {
  public path = '/login'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/', sessionFalseMiddleware ,this.index)
    this.router.post('/access', sessionFalseMiddleware ,this.access)
    this.router.get('/reset_password', sessionFalseMiddleware ,this.resetPassword)
    this.router.get('/signac_in', sessionFalseMiddleware ,this.registrarUser)
    this.router.get('/reset', sessionFalseMiddleware ,this.reset)
  }

  index = (req: Request, res: Response) => {
    let locals = {
      title: 'Bienvenido',
      constants: constants,
      message_color: '',
      message: '',
      csss: loadCss([
        'assets/css/styles',
        'assets/css/login',
      ]), 
      jss: loadJs([]), 
    }
    res.status(200).render('login/index', locals)
  }

  resetPassword = (req: Request, res: Response) => {
    let locals = {
      title: 'Olvidó su contraseña?',
      constants: constants,
      message_color: '',
      message: '',
      csss: loadCss([
        'assets/css/styles',
        'assets/css/login',
      ]), 
      jss: loadJs([]), 
    }
    res.status(200).render('login/reset', locals)
  }

  registrarUser = (req: Request, res: Response) => {
    let locals = {
      title: 'Olvidó su contraseña?',
      constants: constants,
      message_color: '',
      message: '',
      csss: loadCss([
        'assets/css/styles',
        'assets/css/login',
      ]), 
      jss: loadJs([]), 
    }
    res.status(200).render('login/registrar', locals)
  }

  access = (req: Request, res: Response) => {
    let user = req.body.user
    let password = req.body.password
    if(user == 'admin' && password == 'ulima'){
      res.redirect('/')
    }else{
      let locals = {
        title: 'Bienvenido',
        constants: constants,
        message_color: 'text-danger',
        message: 'Usuario y/o contraseña no válidos',
        csss: loadCss([
          'assets/css/styles',
          'assets/css/login',
        ]), 
        jss: loadJs([]), 
      }
      res.status(200).render('login/index', locals)
    }
  }
  reset = (req: Request, res: Response) => {
    let mail = req.body.user
    //ver si existe el correo en una lista de correos
    let mails = [
      'juan@aloe.ulima.edu.pe',
      'pepe@aloe.ulima.edu.pe',
      'pool@aloe.ulima.edu.pe'
    ]
    let exist = false
    mail.array.forEach(function(temp) {
      if(temp==mail){
        exist=true
      }      
    });

    if(exist){
      let locals = {
        title: 'Bienvenido',
        constants: constants,
        message_color: 'text-success',
        message: 'Se envió al correo su contraseña',
        csss: loadCss([
          'assets/css/styles',
          'assets/css/login',
        ]), 
        jss: loadJs([]), 
      }
      res.status(200).render('login/index', locals)
    

    }else{
      let locals = {
        title: 'Bienvenido',
        constants: constants,
        message_color: 'text-danger',
        message: 'Correo no registrado',
        csss: loadCss([
          'assets/css/styles',
          'assets/css/login',
        ]), 
        jss: loadJs([]), 
      }
      res.status(200).render('login/reset', locals)
    }
  }
}

export default LoginController