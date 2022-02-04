import { Paginated } from '../../common/pagination/pagination';

import { ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.model';

@ObjectType()
export class PaginatedComment extends Paginated(Comment) {}
