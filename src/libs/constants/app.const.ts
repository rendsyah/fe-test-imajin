export class App {
  // NAME
  static SESSION_NAME = '_SID_Project';

  // SECRET
  static SIGN_SECRET = process.env.SIGN_SECRET || '';
  static SESSION_SECRET = process.env.SESSION_SECRET || '';
}
