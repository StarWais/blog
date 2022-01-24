import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PaginationArgs } from './pagination.args';
import { PrismaService } from 'src/prisma.service';

export interface IPaginatedType<T> {
  nodes: T[];
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    nodes: Array<T>;
    @Field(() => Int)
    totalPages: number;
    @Field()
    hasPreviousPage: boolean;
    @Field(() => Int)
    totalCount: number;
    @Field()
    hasNextPage: boolean;
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
    totalPages,
    totalCount,
    hasNextPage,
    hasPreviousPage,
  };
}
