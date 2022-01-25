import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PaginationArgs } from './pagination.args';
import { PrismaService } from 'src/prisma.service';

export interface IPaginatedType<T> {
  nodes: T[];
  pageInfo: PageInfo;
}

export interface IPageInfo {
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
}

@ObjectType({ isAbstract: true })
abstract class PageInfo implements IPageInfo {
  @Field(() => Int)
  totalPages: number;
  @Field(() => Int)
  currentPage: number;
  @Field(() => Int)
  totalCount: number;
  @Field(() => Boolean)
  hasNextPage: boolean;
  @Field(() => Boolean)
  hasPreviousPage: boolean;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    nodes: Array<T>;
    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}

export async function Paginate<T>(
  paginationArgs: PaginationArgs,
  prismaClient: PrismaService,
  entity: string,
  args: any,
): Promise<IPaginatedType<T> | null> {
  const take = paginationArgs.limit || 10;
  const skip = (paginationArgs.page - 1) * take;

  const results: T[] = await prismaClient[entity].findMany({
    skip,
    take,
    ...args,
  });

  const totalCount: number = await prismaClient[entity].count();
  const totalPages = Math.ceil(totalCount / take);
  const hasNextPage = paginationArgs.page < totalPages;
  const hasPreviousPage = paginationArgs.page > 1;

  return {
    nodes: results,
    pageInfo: {
      totalPages,
      totalCount,
      currentPage: paginationArgs.page,
      hasNextPage,
      hasPreviousPage,
    },
  };
}
