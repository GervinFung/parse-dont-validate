import { ParameterlessLazyLoad } from '../../types';

const freeze = <T>(t: ParameterlessLazyLoad<T>, isImmutable: boolean) =>
    !isImmutable ? t() : Object.freeze(t());

export { freeze };
