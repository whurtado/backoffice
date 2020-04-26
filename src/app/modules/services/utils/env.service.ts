export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public apiGatewayBackOffice = '';
  public urlPath = '';
  public clientName = '';
  
  // Whether or not to enable debug mode
  public enableDebug = true;

  constructor() {
  }

  returnCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var hr = today.getHours();
    var type = hr < 12 ? 'am' : 'pm';
    var min = today.getMinutes();
    var scs = today.getSeconds();

    var ampm = hr >= 12 ? 'pm' : 'am';
    var hours = hr % 12;
    hours = hours ? hours : 12; 
    var minutes = min < 10 ? '0' + min : min;
    var strTime = hours + ':' + minutes + ':' + scs + ' ' + ampm;
    return dd + '/' + mm + '/' + yyyy + ' ' + strTime;
}

}