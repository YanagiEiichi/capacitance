import { Transform } from "stream";

export default class Capacitance
  extends Transform
  implements PromiseLike<Buffer>
{
  then<T = Buffer, G = never>(
    onfulfilled?: ((value: Buffer) => T | PromiseLike<T>) | null,
    onrejected?: ((reason: unknown) => G | PromiseLike<G>) | null
  ): PromiseLike<T | G>;
}
