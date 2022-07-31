import { ParameterlessLazyLoad } from '../../types/index.ts';

const freeze = <T>(t: ParameterlessLazyLoad<T>, isImmutable: boolean) =>
    !isImmutable ? t() : Object.freeze(t());

export { freeze };
