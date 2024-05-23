import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { EntityNotFoundError, QueryFailedError } from "typeorm";

@Catch(QueryFailedError, EntityNotFoundError)
export class DatabaseExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError | EntityNotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
    
        const exceptionMessage = exception.message;

        if (exception instanceof QueryFailedError) {
            if (exceptionMessage.includes('duplicate key value violates unique constraint')) {
                response.status(HttpStatus.CONFLICT).json({
                    statusCode: HttpStatus.CONFLICT,
                    message: `Duplicate entry`,
                });
            } else {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Internal database error`,
                });
            }
        }

        if (exception instanceof EntityNotFoundError) {
            const matchID = exceptionMessage.match(/"id":\s*(\d+|\[\s*([\d\s,]+)\s*\])/);
            const matchEntity = exceptionMessage.match(/of type "(.*?)"/);

            let entityID: string;
            let entityName: string;

            if (matchID && matchEntity) {
                entityID = matchID[1].replace(/\s+/g, '');
                entityName = matchEntity[1];
            }

            if (entityID && entityName) {
                response.status(HttpStatus.NOT_FOUND).json({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Can't find item with ID ${entityID} from ${entityName}`,
                });
            }
        }
    }
}