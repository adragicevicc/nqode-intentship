export default interface TokenData {
  sub: string;
  aud: string;
  iss: string;
  exp: number;
  userId: number;
  email: string;
  userRole: string;
}
