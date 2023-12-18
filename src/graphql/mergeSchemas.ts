import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

import { fileLoader } from 'merge-graphql-schemas';

import path from 'path';

const typesArray = fileLoader(path.join(__dirname, './**/*.gql'));
const typeDefs = mergeTypeDefs(typesArray);

const resolverArray = fileLoader(path.join(__dirname, './resolvers/**/*.ts'));
const resolvers = mergeResolvers(resolverArray);

export {typeDefs, resolvers};