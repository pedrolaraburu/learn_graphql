// import { SchemaDirectiveVisitor } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';
import JwtService from '../../service/JwtService';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { GraphQLError, GraphQLSchema } from "graphql";
export default function authDirectiveTransformer(schema: GraphQLSchema, directiveName: string) {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
    
          if (authDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;
    
            fieldConfig.resolve = async function (source, args, context, info) {
                const bearerToken: string = context.req.headers.authorization || "";
                const token: string = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken;
                const verify = await JwtService.verifyToken(token);
                if (!verify) {
                    throw new GraphQLError("Unauthorized.", {extensions: {code: "UNAUTHORIZED", http: {status: 401}}});
                }
                context.req.user = verify;
                const result = resolve(source, args, context, info);
                return result;
            };
            return fieldConfig;
          }
        },
    });
}
