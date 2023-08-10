export default interface JwtPayload {
  nim: string;
  id: string;
  role?: string;
  iat: number;
  exp: number;
}