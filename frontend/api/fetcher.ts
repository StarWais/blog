import { GraphQLClient, gql } from 'graphql-request';
import { xor } from 'lodash';

const endpoint = (process.env.NEXT_PUBLIC_SERVER_URL as string) + 'graphql';

function NativeRequestAdapter(ctx: GQLContext) {
  return Array.of(ctx.req.type, ctx.req.variables, ctx.req.headers);
}
class GQLContext {
  private client: GraphQLClient;
  //@ts-ignore
  private snapshot: RequestSnapshot;
  private readonly requestInterceptor = new RequestStrategy();
  private readonly responseInterceptor = new ResponseStrategy();
  //@ts-ignore
  public req: GQLRequest;
  //@ts-ignore
  public res: GQLResponse;
  public isRepeated = false;

  constructor(client: GraphQLClient) {
    this.client = client;
  }

  async setRequest(req: GQLRequest) {
    this.req = req;
    await this.requestInterceptor.handle(this);
  }

  async setResponse(res: GQLResponse) {
    this.res = res;
    await this.responseInterceptor.handle(this);
  }

  async sendRequest(): Promise<GQLResponse> {
    if (!this.snapshot) {
      this.createSnapshot();
    }
    // @ts-ignore
    const res = (await this.client.rawRequest.apply(
      this.client,
      //@ts-ignore
      new NativeRequestAdapter(this)
    )) as GQLResponse;
    await this.setResponse(res);

    return this.res;
  }

  async redo(): Promise<GQLResponse> {
    await this.snapshot.restore();
    this.isRepeated = true;
    return await this.sendRequest();
  }

  createSnapshot() {
    this.snapshot = new RequestSnapshot(this);
  }
}
class RequestSnapshot {
  instance: GQLContext;
  init: GQLRequest;

  constructor(ctx: GQLContext) {
    this.instance = ctx;
    this.init = ctx.req;
  }

  async restore() {
    await this.instance.setRequest(this.init);
  }
}
type GQLRequest = {
  type: string;
  variables?: any;
  headers?: Record<string, string>;
};
type GQLResponse = {
  data: any;
  extensions?: any;
  headers: Headers;
  status: number;
  errors?: any[];
};

interface Interceptor {
  setNext(interceptor: Interceptor): Interceptor;

  intercept(type: GQLContext): Promise<GQLContext>;
}

abstract class AbstractInterceptor implements Interceptor {
  //@ts-ignore
  private nextHandler: Interceptor;

  public setNext(interceptor: Interceptor): Interceptor {
    this.nextHandler = interceptor;
    return interceptor;
  }

  public async intercept(ctx: GQLContext) {
    if (this.nextHandler) return await this.nextHandler.intercept(ctx);

    return ctx;
  }
}
class AuthInterceptor extends AbstractInterceptor {
  intercept(ctx: GQLContext): Promise<GQLContext> {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('accessToken');

      if (!!token && token !== 'undefined') {
        ctx.req.headers = {
          ...ctx.req.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
    return super.intercept(ctx);
  }
}

const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshTokenDetails: RefreshTokenInput!) {
    refreshToken(refreshTokenDetails: $refreshTokenDetails) {
      accessToken
      refreshToken
    }
  }
`;

class HandleRefreshToken extends AbstractInterceptor {
  async intercept(ctx: GQLContext): Promise<GQLContext> {
    if (!ctx.res) {
      throw 'Network error';
    }
    if (!('errors' in ctx.res)) return await super.intercept(ctx);
    //@ts-ignore
    const exception = ctx.res.errors[0]?.extensions?.response;
    if (!exception) return await super.intercept(ctx);
    const Error = new GraphQLError(exception.message, exception.statusCode);
    if (
      Error.code === 401 &&
      !ctx.isRepeated &&
      typeof window !== 'undefined'
    ) {
      try {
        await ctx.setRequest({
          type: REFRESH_TOKEN,
          variables: {
            refreshTokenDetails: {
              token: localStorage.getItem('refreshToken'),
            },
          },
        });
        const res = await ctx.sendRequest();
        //@ts-ignore
        localStorage.setItem('accessToken', res.refreshToken.accessToken);
        //@ts-ignore
        localStorage.setItem('refreshToken', res.refreshToken.refreshToken);
        await ctx.redo();

        return await super.intercept(ctx);
      } catch (e) {
        throw Error;
      }
    }
    throw Error;
  }
}
class RetrieveDataInterceptor extends AbstractInterceptor {
  intercept(ctx: GQLContext): GQLResponse['data'] {
    ctx.res = ctx.res.status === 200 ? ctx.res.data : ctx.res;
    return ctx;
  }
}
abstract class InterceptStrategy {
  protected makeChain(collection: AbstractInterceptor[]) {
    collection.forEach(
      (handler, index) =>
        collection[index + 1] && handler.setNext(collection[index + 1])
    );
  }

  abstract handle(ctx: GQLContext): any;
}
class RequestStrategy extends InterceptStrategy {
  async handle(ctx: GQLContext): Promise<GQLContext> {
    const handlersOrder: AbstractInterceptor[] = [new AuthInterceptor()];
    this.makeChain(handlersOrder);

    return await handlersOrder[0].intercept(ctx);
  }
}
class ResponseStrategy extends InterceptStrategy {
  async handle(ctx: GQLContext): Promise<GQLResponse['data']> {
    const handlersOrder: AbstractInterceptor[] = [
      new HandleRefreshToken(),
      new RetrieveDataInterceptor(),
    ];
    this.makeChain(handlersOrder);

    return await handlersOrder[0].intercept(ctx);
  }
}
class GraphQLError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}
const request = async function (
  this: GraphQLClient,
  type: string,
  variables: any,
  headers = {}
): Promise<any> {
  const ctx = new GQLContext(this);
  await ctx.setRequest({ type, variables, headers });
  try {
    await ctx.sendRequest();
  } catch (e) {
    //@ts-ignore
    await ctx.setResponse(e.response);
  }

  return ctx.res;
};

GraphQLClient.prototype.request = request;

const client = new GraphQLClient(endpoint, {
  credentials: 'include',
});

export default client;
