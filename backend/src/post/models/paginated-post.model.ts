import { Paginated } from '../../common/pagination/pagination';

import { ObjectType } from '@nestjs/graphql';
import { Post } from './post.model';

@ObjectType()
export class PaginatedPost extends Paginated(Post) {}
