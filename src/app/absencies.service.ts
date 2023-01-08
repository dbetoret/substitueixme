import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Absencia, AbsenciaS } from './absencia';
import { DadesMestres, Franja_horaria, Espai, Grup, Materia, Horari } from './dadesmestres';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { format, parseISO, compareAsc } from 'date-fns';
import { Guard, GuardJSON, Absence, AbsenceJSON } from './model/interfaces';
import { HttpOptions } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

// export const USER = new HttpContextToken<string>(() => '');
// export const BASE_URL = 'http://localhost:8000/absencies/';
export const BASE_URL = 'https://substitueixme.herokuapp.com/absencies/'

export class Dates {
  date2str(valor: Date = new Date()): string {
    console.log('vaig a convertir ', valor);
    //return format(valor, 'dd-MM-yyyy');
    if (valor == null){
      valor = new Date();
    }
    return format(valor, 'yyyy-MM-dd');
    console.log('vaig a convertir ', valor);
    return valor.toString();
  }
  str2date(valor: string, hour: string = '00', minutes: string='00'): Date {
    return parseISO(valor+'T'+hour+':'+minutes);
  }
  time2str(valor: Date = new Date()): string {
    if (valor == null){
      valor = new Date();
    }
    console.log('vaig a convertir lhora', valor);
    return format(valor, 'HH:mm');
    return '';
  }
  str2time(valor: string): Date{
    var d = new Date();
    if (valor == 'None') {
      d.setHours(0);
      d.setMinutes(0);
    } else {
      var parts = valor.split(':');
      d.setHours(parseInt(valor[0]));
      d.setMinutes(parseInt(valor[1]));
      console.log('he convertit el temps ', valor, ' en ', d);
    }
    return d;
  }
  str2str(valor: string): string{
    var a = new Date();
    a = parseISO(valor);
    return this.date2str(a);
  }
  dayofweek(data_iso: string): string{
    var dies = ['Diumenge','Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte'];
    var a = new Date();
    a = parseISO (data_iso);
    return dies[a.getDay()];
  }
}


class Absences {

  list: Absence[] = [];
  guardList: Guard[] = [];
  private absencesUrl = BASE_URL+'api/absencies/';
  dates: Dates = new Dates();
  isAbsentIndex: number = -1;
  user_id: string;
  // service: AbsenciesService;

  constructor(
    private http: HttpClient,
    private httpOptions: {headers: HttpHeaders, params: HttpParams},
    private service: AbsenciesService
  ) {}

  // const loadUserData = async () => {
  //   const u = await Preferences.get({key: 'user_id'});
  //   this.user_id = u;
  // }

  get(){
    this.http.get<AbsenceJSON[]>(this.absencesUrl, this.httpOptions)
    .pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    )
    .subscribe(data => {
      console.log('carrega absencies: ', data);
      // console.log(data)
      this.list = [];
      var a: Absence;
      var b: Date;
      for (var i=0;i<data.length; i++){
        a = {
          id: data[i].id,
          data: this.dates.str2date(data[i].data),
          data_fi: this.dates.str2date(data[i].data_fi, '23', '59'),
          hora_ini: this.dates.str2time(data[i].hora_ini),
          hora_fi: this.dates.str2time(data[i].hora_fi),
          dia_complet: data[i].dia_complet,
          extraescolar: data[i].extraescolar,
          justificada: data[i].justificada
        };
        b = new Date();
        console.log('Comprovem si', b, ' entre ', a.data.toString(), ' i ', a.data_fi.toString());
        if (compareAsc(a.data, b) != 1 && compareAsc(a.data_fi, b) != -1){
          console.log('En carregar està absent, entre ', a.data.toString(), ' i ', a.data_fi.toString());
          this.isAbsentIndex = this.list.push(a) -1;
        } else {
          this.list.push (a);
        }    
      }
      // La diferència entre **absències** i **guàrdies** és que 
      // una **absència** és multi-dia, i volem editar-la en bloc.
      // D'un altra banda, **guardies** conté les guàrdies d'una data
      // donada, que està associada a una absència en concret.
      // var data_g ;
      // var d_guardies = {};
      // this.guardList = [];
      // console.log("carregant absencies. Hi han ", this.list.length);
      // for (var i=0; i < this.list.length; i++){
      //   if (this.list[i].guardies.length > 0 )
      //     data_g =  this.list[i].guardies[0].data.toString();  // en format DD-MM-YYYY
      //   console.log ("carregant guardiesl del ", data_g, '. Hi han ', this.list[i].guardies.length);
      //   for (var j=0; j < this.list[i].guardies.length; j++){
      //     data_g =  this.list[i].guardies[j].data.toString();
      //     if (!(data_g in d_guardies))
      //       d_guardies[data_g] = []
      //     d_guardies[data_g].push(this.list[i].guardies[j])
      //   }
      // }  
      // for (var d in d_guardies){
        // carreguem la guardia de cada absència.
        // this.guardList.push({
        //   data:
        //   dia:
        //   hora:
        //   espai:
        //   grup:
        //   materia:
        //   es_guardia:
        //   professor:
        //   substitut:
        //   feina:
        // })
        // console.log("el dia ", d, " té " ,d_guardies[d].length, " guàrdies")
      // } 
    });
    // return this.list;
  }
  
  push(){}

  insert(ab: AbsenceJSON){
    var a: Absence;
    var b: Date;
    var new_index: number;
    a = {
      id: ab.id,
      data: this.dates.str2date(ab.data),
      data_fi: this.dates.str2date(ab.data_fi, '23', '59'),
      hora_ini: this.dates.str2time(ab.hora_ini),
      hora_fi: this.dates.str2time(ab.hora_fi),
      dia_complet: ab.dia_complet,
      extraescolar: ab.extraescolar,
      justificada: ab.justificada
    };
    b = new Date();
    console.log('En insertar està absent, entre ', a.data.toString(), ' i ', a.data_fi.toString());
    if (compareAsc(a.data, b) != 1 && compareAsc(a.data_fi, b) != -1){
      new_index = this.list.push(a) -1
      this.isAbsentIndex = new_index;
    } else {
      new_index = this.list.push (a);
    }
    this.update(ab, new_index);
  }

  update(objecte: AbsenceJSON, index:number){
    // rep una AbsenceJSON, amb les dates en format cadena.
    // Envia la info al servidor, i si és OK, actualitza a la llista local.
    var id_sql = 0;
    // console.log('actualitzar absència de: ', objecte["data"] , " amb id ",objecte["id"]);
    // console.log(JSON.stringify(objecte));
    this.http.post<AbsenceJSON>(this.absencesUrl, JSON.stringify(objecte), this.httpOptions)
      .pipe( catchError( (err) => {
          return throwError(err);
      }) )
      .subscribe( data  => {
        id_sql = data['id'];
        this.list[index].id = id_sql;
        this.service.guards.get();
      });
  }

  delete(index: number){
    let id = this.list[index].id;
    let url_esborrar = this.absencesUrl+id.toString()+'/';
    this.http.delete(url_esborrar, this.httpOptions)
    .subscribe()
    if (index == this.isAbsentIndex){
      this.isAbsentIndex = -1;
    }
    this.list.splice(index);
  }
}

class Guards {
  // Les guàrdies que deixe cada dia,
  // per muntar la llista diària de absències.
  // AbsenceGuards: Map<string, {
  //   data: string,
  //   dia_setmana: string,
  //   guardies: Guard[] 
  // }> = new Map();
  absenceGuards: {
    [key: string]: Guard[]
  } = {}

  // Guàrdies que em toca fer un determinat dia,
  // avui o quan sigui.
  // DailyGuards: Map<string, {
  //   data: string,
  //   dia_setmana: string,
  //   guardies: Guard[]
  // }> = new Map();
  dailyGuards: {
    [key: string]: Guard[]
  } = {}

  // El user_id s'ha d'establir després de fer login.
  // De manera ideal, l'establim amb el get() que fa el servei
  // a l'inici, com a callback del login.
  
  private guardsUrl: string = BASE_URL+'api/guardies/';
  private dates: Dates = new Dates();

  constructor(
    private http: HttpClient,
    private httpOptions: {headers: HttpHeaders, params: HttpParams}
  ) {}

  data: string; 
  dia_setmana: string;
  ndia_setmana: number;
  guardies: Guard[];
  user_id: string;

  get(){
    // Carregarem sempre totes les guàrdies, tot i que les pròpies es
    // podrien evitar, ja que només es modifiquen com a conseqüència
    // d'una absència. Carreguem tot per simplicitat.
    var cds = ['Diumenge', 'Dilluns', 'Dimarts' ,'Dimecres' ,'Dijous' ,'Divendres', 'Dissabte', 'Diumenge']
    var date: Date;
    var parts: string[];
    var dia_setmana: string;
    var guard: Guard;
    //var user_id: string = localStorage.getItem('user_id');
    // Capacitor 'preferences':
    Preferences.get({ key: 'user_id'}).then((result) => {this.user_id = result.value;});
    this.http.get<GuardJSON[]>(this.guardsUrl, this.httpOptions)
    .pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    )
    .subscribe(data => {
      console.log('guàrdies rebudes: ', data);
      this.absenceGuards = {};
      this.dailyGuards = {};
      for (var i in data){
        // preparem la info:
        date = this.dates.str2date(data[i].data);
        // La data està en format iso YYYY-MM-DD, així que
        // extraiem els nombres, componem la data i traiem el
        // nº de dia de la setmana, parsejant-lo a la llista anterior.
 // El mes està indexat a partir de 0, així que febrer ha de ser el mes 1, mentre que el rebem en format cadena, on dóna 2.
        dia_setmana = cds[new Date(
          parseInt(data[i].data.split('-')[0]), 
          parseInt(data[i].data.split('-')[1])-1, 
          parseInt(data[i].data.split('-')[2])
        ).getDay()];
        guard = {
          id: data[i].id,
          id_absencia: data[i].id_absencia,
          data: date,
          hora: data[i].hora,
          id_professor: data[i].id_professor,
          professor: data[i].professor,
          espai: data[i].espai,
          grup: data[i].grup,
          materia: data[i].materia,
          es_guardia: data[i].es_guardia,
          id_substitut: data[i].id_substitut,
          substitut: data[i].substitut,
          feina: data[i].feina 
        }
        // console.log ('tenim nova guard: ', guard, ' amb el guard_profe ', guard.id_professor, ' i el selfprofe ', this.user_id);
        if (guard.id_professor.toString()==this.user_id){
          if (!(data[i].data in this.absenceGuards)){
            this.absenceGuards[data[i].data]=[]
          }
          this.absenceGuards[data[i].data].push(guard)
        }
        else {
          if (!(data[i].data in this.dailyGuards)){
            this.dailyGuards[data[i].data] =  []
          }
          this.dailyGuards[data[i].data].push(guard)
        }
      }
      // console.log ('la carrega de absenceguards és: ', this.absenceGuards, ' i de Daily ', this.dailyGuards);
    })
  }

  setTasks (day: string, i: number, taskText: string) {
    console.log('volem establir feina per al ', day, ' amb index ', i);
    if (this.absenceGuards[day][i].feina != taskText){
      let body = {guard_id: this.absenceGuards[day][i].id, tasks: taskText}
    
      this.http.post<GuardJSON[]>(this.guardsUrl, JSON.stringify(body),  this.httpOptions)
      .pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })).subscribe();
      this.absenceGuards[day][i].feina = taskText;
    }
  }

  deleteAbsencia(id: number) {
    for (var dia in this.absenceGuards) {
      if (this.absenceGuards[dia].length > 0)
        if (this.absenceGuards[dia][0].id_absencia == id.toString()){
          delete this.absenceGuards[dia];
        }

    }
  }
}

class User {
  id: string;
  name: string;
  centre_id: number;
  centre_name: string;
  auth_token: string;
  is_logged_in: number; // 0 undetermined, -1 needs login, 1 OK
  private usersURL: string = BASE_URL+'api/user/';
  private loginURL: string = BASE_URL+'api/login/';
  private logoutURL: string = BASE_URL+'api/logout/';
  
  constructor(
    private http: HttpClient ,
    private httpOptions: {headers: HttpHeaders, params: HttpParams}
  ) {
    //this.httpOptions["observe"] = 'response'
    this.id = '';
    this.is_logged_in = 0;
  }

  async loadUserData(callback){
    const i = await Preferences.get({key: 'user_id'})
    this.id = i.value;
    // console.log('el valor de user_id de preferences es: ', i.value);
    if (i.value == null){
      // is cookie logged
      this.is_logged_in = -1;
    } else {{
      let u = await Preferences.get({key: 'username'})
      let a = await Preferences.get({key: 'auth_token'}) 
      // console.log('el valor del token de preferences es: ', a.value);
      this.name = u.value;
      this.auth_token = a.value;
      this.httpOptions['headers'] = this.httpOptions['headers'].set('Authorization', this.auth_token);
      this.is_logged_in = 1;
      callback(true);
    }}
      
  }

  select(name: string){
    if (name != this.name){
      this.name = name;
      if (this.name == 'david') this.id = '1';
      else this.id = '2';
    }
    // this.httpOptions["params"] = this.httpOptions["params"].set('user', this.name);
    //this.httpOptions["headers"] = this.httpOptions["headers"].set('Authorization', this.id.toString())
    return true;
  }

  create(name: string, pass: string, callback: any){
    // console.log('vaig a insertar usuari ', name);
    this.http.post(this.usersURL, {
          'user':     name, 
          'password': pass,
          'email':    '',
        }, {
          headers: this.httpOptions.headers,
          params: this.httpOptions.params,
          observe: 'response'
        })
      .pipe(catchError(caugth => this.handleError(caugth, callback)))
      .subscribe(response => {
        Preferences.set({key: 'user_id', value: response.body['user_id']});
        Preferences.set({key: 'username', value: response.body['username']});
        Preferences.set({key: 'auth_token', value: response.headers.get('Authorization')});
        // localStorage.setItem('user_id', response.body['user_id']);
        // localStorage.setItem('username', response.body['username']);
        // localStorage.setItem('Authorization', response.headers.get('Authorization'));
        this.httpOptions['headers'] = this.httpOptions['headers'].set('Authorization', response.headers.get('Authorization'))
        this.name = response.body['username'];
        this.is_logged_in = 1;
        callback(true);
      });
  }

  login(name: string, pass: string, callback: any){
    // console.log("a fer el login per a ", name, ' amb la ', pass);
    this.http.post<any>(this.loginURL, {
          'user':     name,
          'password': pass,
        }, {
          headers: this.httpOptions.headers,
          params: this.httpOptions.params,
          observe: 'response'
        })
      .pipe(catchError(caugth => this.handleError(caugth, callback)))
      .subscribe(response => {
        // console.log('response body ', response.body);
        let b = response.body['user_id'];
        // console.log('el id es ', b);
        Preferences.set({key: 'user_id', value: response.body['user_id']});
        Preferences.set({key: 'username', value: response.body['username']});
        Preferences.set({key: 'auth_token', value: response.headers.get('Authorization')});
        // localStorage.setItem('user_id', response.body['user_id']);
        // localStorage.setItem('username', response.body['username']);
        // localStorage.setItem('Authorization', response.headers.get('Authorization'));
        this.httpOptions['headers'] = this.httpOptions['headers'].set('Authorization', response.headers.get('Authorization'))
        this.name = response.body['username'];
        this.is_logged_in = 1;
        callback(true);
        // console.log('el resultado del login es: ',response);
      });
  }

  logout(callback: any){
    this.http.post(
      this.logoutURL, 
      {}, 
      {
        'headers': this.httpOptions.headers, //.set('responseType', 'text'), 
        'params': this.httpOptions.params
      }
    )
    .pipe(catchError(caugth => this.handleError(caugth, callback)))
    .subscribe(data => {
      Preferences.remove({key: 'user_id'});
      Preferences.remove({key: 'username'});
      Preferences.remove({key: 'auth_token'});
      //localStorage.clear();
      this.is_logged_in = -1;
      this.id='';
      this.name='';
      this.auth_token='';
      callback(true);
    })
  }

  logged_in () {
    return (!(localStorage.getItem('username') === null)) ;
  }

  private handleError (error: HttpErrorResponse, callback){
    localStorage.removeItem('username');
    console.log(error.message);
    this.is_logged_in = -1;
    return throwError(() => new Error('Error al fer login'));
  }
}

@Injectable({
  providedIn: 'root'
})
export class AbsenciesService {

  private log (message: string) {
    
  }
  private username = '';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'credentials': 'include' }),
    params: new HttpParams(),
    withCredentials: true,
  };


  user = new User(this.http, this.httpOptions);
  absences = new Absences(this.http, this.httpOptions, this);
  guards = new Guards(this.http, this.httpOptions);
  
  // times = new Times();
  // subjects = new Subjects();
  // groups = new Groups();
  // rooms = new Rooms();
  // timetables = new Timetables();


  dadesMestres: DadesMestres;
  private dadesMestresUrl = BASE_URL+'api/login/';
  private dadesMestres_obs: Observable<DadesMestres>;
  // centres: Centre[];
  // usuaris: Usuari[];
  franges_horaries: Map< string, Franja_horaria> = new Map<string, Franja_horaria>;
  espais: Map< string, Espai>  = new Map< string, Espai> ;
  grups: Map< string, Grup>  = new Map< string, Grup>;
  materies: Map< string, Materia> = new Map< string, Materia> ;
  horari: Map< string, Horari>  = new Map< string, Horari> ;
  t3_horari: Map< string, string>  = new Map< string, string> ;
  t3_callback: any;
  
  absencies: Absencia[];
  private absenciesUrl = BASE_URL+'api/absencies/';
  private absencies_obs: Observable<Absencia[]> ;

  
  guardies: Guards;
  private guardiesUrl = BASE_URL+'api/guardies/';
  private guardies_obs: Observable<Guards[]>;
  
  llista_dies: string[] = [];
  llista_hores: string[] = [];
  llista_horesdies: Map<string, Map<string,number>> ;
  
  private dates: any[];
  
  private linkUser = new BehaviorSubject(this.user.id);
  currentUserId = this.linkUser.asObservable();

  setUserId(new_id: string){
    this.linkUser.next(new_id);
  }
  
  constructor(
    private http: HttpClient) 
  { 
    this.llista_horesdies = new Map<string, Map<string,number>>();
    this.user.loadUserData(this.loadData.bind(this));
  }


  
  select_user(data) {
    // si el login és correcte, recarreguem info.
    if (this.user.select(data)){
      // this.time.get();
      // this.subjects.get();
      // this.groups.get();
      // this.rooms.get();
      // this.timetable.get();
      this.loadDadesMestres();
      this.loadAbsencies();
      this.absences.get();
      //this.loadGuardies();
      this.guards.get(); // Les meves absències.
      //this.httpOptions['headers'] = this.httpOptions['headers'].set('Authorization', this.user.id.toString())
    }
    
  }

  creaUsuari(usuari: string, contrasenya: string): boolean {
    //console.log("crear l'usuari ", usuari, " amb pwd ", contrasenya);
    var peticio = {
      user: usuari,
      password: contrasenya
    };
    this.http.post<DadesMestres>(
        this.dadesMestresUrl, 
        JSON.stringify(peticio), 
        this.httpOptions
      ).pipe(
        catchError(this.handleError<DadesMestres>('Crear Usuari'))
      ).subscribe(usuari => this.dadesMestres = usuari);
    return true
  }

  loadDadesMestres(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.linkUser.next(this.user.id);
    var fh: any;
    this.franges_horaries.clear();
    this.espais.clear();
    this.grups.clear();
    this.materies.clear();
    this.horari.clear();
    this.llista_hores = [];
    this.llista_dies = [];
    this.llista_horesdies.clear();
    this.t3_horari.clear();
    this.http.get<DadesMestres>(this.dadesMestresUrl, this.httpOptions)
    .pipe(
      catchError(this.handleError<DadesMestres>('getLogin'))
    ).subscribe(dm => { 
                    // console.log("incoming dm: ", dm);
                    this.dadesMestres = dm;
                    // console.log ("dadesMestres carregue amb: ", this.dadesMestres);
                    //this.centres = dm.centres;
                    //this.usuaris = dm.usuaris;
                    // DEFINIM LA INTERFÍCIE D'ESPAIS I GRUPS, PERÒ NO SON ARRAYS!!!!
                    for ( var i in this.dadesMestres.franges_horaries) {
                      this.franges_horaries.set(i, this.dadesMestres.franges_horaries[i]);}
                    for ( var i in this.dadesMestres.espais){
                      this.espais.set(i, this.dadesMestres.espais[i]);}
                    for ( var i in this.dadesMestres.grups){
                      this.grups.set(i, this.dadesMestres.grups[i]);}
                    for ( var i in this.dadesMestres.materies){
                      this.materies.set(i, this.dadesMestres.materies[i]);}
                    for ( var i in this.dadesMestres.horari){
                      this.horari.set(this.dadesMestres.horari[i].id_franja.toString(), this.dadesMestres.horari[i]);}
                    for (var fhi in this.dadesMestres.franges_horaries) {
                      fh = this.dadesMestres.franges_horaries[fhi];
                       //console.log("franja: ", fh);

                      if ( this.llista_hores.indexOf(fh.hinici) == -1){
                        this.llista_hores.push(fh.hinici);
                        this.llista_horesdies.set(fh.hinici, new Map<string, number>());
                        //console.log("llista hores: ", this.llista_hores);
                        //console.log("llista horesdies: ", this.llista_horesdies);
                      }
                      if ( this.llista_dies.indexOf(fh.dia_setmana) == -1){
                        this.llista_dies.push(fh.dia_setmana);
                      }
                      this.llista_horesdies.get(fh.hinici).set(fh.dia_setmana, parseInt(fhi));
                      this.t3_horari.set(fhi.toString(),  this.carrega_text(fhi));
                    }
                    // console.log("t3_horari és: ", this.t3_horari);
                });
    this.absences.get();
    this.guards.get();          
  }

  loadAbsencies(){
    // this.http.get<Absencia[]>(this.absenciesUrl)
    //   .pipe(
    //     catchError(this.handleError<Absencia[]>('getAbsencies', [])))
    //   .subscribe( data => {
    //     console.log('processem les ', data.length, ' absenciesS');
    //     for (var i=0;i<data.length; i++){
    //       this.absencies.push ({
    //         id: data[i].id,
    //         data: this.str2date(data[i].data),
    //         data_fi: this.str2date(data[i].data_fi),
    //         hora_ini: this.str2time(data[i].hora_ini),
    //         hora_fi: this.str2time(data[i].hora_fi),
    //         dia_complet: data[i].dia_complet,
    //         extraescolar: data[i].extraescolar,
    //         justificada: data[i].justificada,
    //         guardies: data[i].guardies
    //       })    
    //     }
    //   })
  }



  loadGuardies(){

  }

  carrega_text (idh: string): string {
    //console.log("llista hores dies vull carregar ", this.aS.llista_hores[h], " ", this.aS.llista_dies[d]);
    var text = '';
    //console.log("carrega text de l'index ", idh, " a l'horari que té ", this.horari[idh]);
    if (this.horari.has(idh)){
      //console.log("està a l'horari")
      if (this.horari.get(idh).es_guardia){
        text = 'Guardia';
      } else {
        //console.log("grup id: ", this.aS.horari[idh]);
        //console.log(this.aS.grups, this.aS.espais, this.aS.materies);
        text = this.grups.get(this.horari.get(idh).grup_id.toString())+ ' ' +
              this.espais.get(this.horari.get(idh).espai_id.toString()) + ' \n' +
              this.materies.get(this.horari.get(idh).materia_id.toString());

      }
    }
    //console.log("carrega text de idh: ", idh, " retorne ", text);
    
    return text;

  }

  actualitza_horari(idh: string): void {
    // actualitza l'horari amb id_horari idh a la base de dades, segons la info de this.horari que està actualitzada.
    var url: string = BASE_URL + 'api/horari/'+idh+'/';
    var cos: string = JSON.stringify(this.horari.get(idh));
    // console.log('horari stringify: ', cos)
    this.http.post<Horari>(url, cos, this.httpOptions)
      .pipe(
        catchError(this.handleError<Horari>('Actualitzar horari'))
      ).subscribe();
  }

  actualitza(tipus: string): void {
    // tipus pot ser grup, espai, matèria
    var url: string;
    var cos: string;
    if (tipus == 'grup') {
      url = BASE_URL + 'api/grups/';
      cos = JSON.stringify(Array.from(this.grups));
      // console.log ('grups JSON: ', cos, this.grups); 
      this.http.post<Grup>(url, cos, this.httpOptions)
      .pipe(
        catchError(this.handleError<Grup>('Actualitzar '+tipus))
      ).subscribe();
    }
    if (tipus == 'espai') {
      url = BASE_URL + 'api/espais/';
      cos = JSON.stringify(Array.from(this.espais));
      // console.log ('espais JSON: ', cos, this.espais); 
      this.http.post<Espai>(url, cos, this.httpOptions)
      .pipe(
        catchError(this.handleError<Espai>('Actualitzar '+tipus))
      ).subscribe();
    }
    if (tipus == 'matèria') {
      url = BASE_URL + 'api/materies/';
      cos = JSON.stringify(Array.from(this.materies));
      // console.log ('materies JSON: ', cos, this.materies); 
      this.http.post<Materia>(url, cos, this.httpOptions)
      .pipe(
        catchError(this.handleError<Materia>('Actualitzar '+tipus))
      ).subscribe();
    }

  }

  getLogin(): Observable<DadesMestres> {
    this.dadesMestres_obs = this.http.get<DadesMestres>(this.dadesMestresUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<DadesMestres>('getLogin'))
      );
    return this.dadesMestres_obs;
  }

  getAbsencies(): Observable<Absencia[]> {
    this.absencies_obs = this.http.get<Absencia[]>(this.absenciesUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Absencia[]>('getAbsencies', []))
      );
    // console.log(this.absencies.length);
    //this.dates[this.absencies[0].guardies[0].data.toString()] = {};
    return this.absencies_obs;
  }

  // getGuardies(): Observable<Guardia[]> {
  //   this.guardies_obs = this.http.get<Guardia[]>(this.guardiesUrl, this.httpOptions)
  //     .pipe(
  //       catchError((this.handleError<Guardia[]>('getGuardies', [])))
  //     );
  //   return this.guardies_obs;
  // }

  updateAbsencia(id: number, objecte: AbsenciaS): Observable<any> {
    // console.log('actualitzar absència de: ', objecte["data"] , " amb id ", id);
    // console.log(JSON.stringify(objecte));
    return this.http.post<Absencia>(this.absenciesUrl, JSON.stringify(objecte), this.httpOptions)
      .pipe(
        catchError(this.handleError<Absencia>('Actualitzar usuari'))
      );
    
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of (result as T);
    };
  }

  date2str(valor: Date = null): string {
    // console.log('vaig a convertir ', valor);
    //return format(valor, 'dd-MM-yyyy');
    if (valor == null){
      valor = new Date();
    }
    return format(valor, 'yyyy-MM-dd');
    // console.log('vaig a convertir ', valor);
    // return valor.toString();
  }
  str2date(valor: string): Date {
    return parseISO(valor);
  }
  time2str(valor: Date = new Date()): string {
    return '';
  }
  str2time(valor: string): Date{
    return new Date();
  }
  str2str(valor: string): string {
    var a = new Date();
    a = parseISO(valor);
    //return '';
    return this.date2str(a);
  }

}
