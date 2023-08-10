export type ICheckOptions = Partial<ICheck>

export const DefaultOption: ICheckOptions = {
  isSelf: false,
  isFound: true,
}
export interface ICheck {
  isFound?: boolean | null,
  isSelf?: boolean | null,
}