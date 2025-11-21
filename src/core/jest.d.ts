// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldsErrors } from './shared/domain/validators/validation.error';

declare global {
  namespace jest {
    interface Matchers<R> {
      notificationContainsErrorMessages: (expected: Array<string | { [key: string]: string[] }>) => R;
    }
  }
}
